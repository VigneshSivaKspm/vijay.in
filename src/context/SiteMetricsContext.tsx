import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { doc, increment, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, getFirebaseAnalytics, logFirebaseEvent } from '../lib/firebase';

interface SiteMetricsContextValue {
  visitsCount: number;
  activitiesCount: number;
  isLive: boolean;
  isLoading: boolean;
  trackActivity: (action: string, meta?: Record<string, string | number | boolean>) => void;
}

const STORAGE_KEY = 'vk_site_metrics_v1';
const SESSION_VISIT_KEY = 'vk_visit_counted_v1';

const readCachedMetrics = (): { visits: number; activities: number } => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { visits: 1, activities: 1 };
    const parsed = JSON.parse(raw) as { visits?: number; activities?: number };
    return {
      visits: typeof parsed.visits === 'number' && parsed.visits > 0 ? parsed.visits : 1,
      activities: typeof parsed.activities === 'number' && parsed.activities > 0 ? parsed.activities : 1,
    };
  } catch {
    return { visits: 1, activities: 1 };
  }
};

const writeCachedMetrics = (visits: number, activities: number): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ visits, activities }));
  } catch {
    // Ignore storage quota errors
  }
};

const SiteMetricsContext = createContext<SiteMetricsContextValue>({
  visitsCount: 1,
  activitiesCount: 1,
  isLive: false,
  isLoading: true,
  trackActivity: () => {},
});

export const SiteMetricsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = readCachedMetrics();
  const [visitsCount, setVisitsCount] = useState<number>(initial.visits);
  const [activitiesCount, setActivitiesCount] = useState<number>(initial.activities);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(() => Boolean(db));

  const visitsRef = useRef(initial.visits);
  const activitiesRef = useRef(initial.activities);
  const firestoreWritableRef = useRef(true);
  const lastClickAtRef = useRef(0);

  const trackActivity = useCallback(
    (action: string, meta?: Record<string, string | number | boolean>) => {
      const next = activitiesRef.current + 1;
      activitiesRef.current = next;
      setActivitiesCount(next);
      writeCachedMetrics(visitsRef.current, next);

      logFirebaseEvent('site_activity', { action, ...meta });

      if (db && firestoreWritableRef.current) {
        const statsRef = doc(db, 'siteStats', 'global');
        void setDoc(
          statsRef,
          {
            totalActivities: increment(1),
            lastActivity: action,
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        ).catch(() => {
          firestoreWritableRef.current = false;
        });
      }
    },
    [],
  );

  // Initialize Firebase Analytics, subscribe to Firestore global counters, and record session visit
  useEffect(() => {
    void getFirebaseAnalytics();

    if (!db) return;

    const statsRef = doc(db, 'siteStats', 'global');

    const unsubscribe = onSnapshot(
      statsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as { totalVisits?: number; totalActivities?: number };
          const nextVisits = typeof data.totalVisits === 'number' ? data.totalVisits : 1;
          const nextActivities = typeof data.totalActivities === 'number' ? data.totalActivities : 1;
          visitsRef.current = nextVisits;
          activitiesRef.current = nextActivities;
          setVisitsCount(nextVisits);
          setActivitiesCount(nextActivities);
          writeCachedMetrics(nextVisits, nextActivities);
        }
        setIsLive(true);
        setIsLoading(false);
      },
      () => {
        // Firestore unavailable or rules not open yet — fall back gracefully to local cache
        firestoreWritableRef.current = false;
        setIsLive(false);
        setIsLoading(false);
      },
    );

    const alreadyCounted = (() => {
      try {
        return sessionStorage.getItem(SESSION_VISIT_KEY) === '1';
      } catch {
        return false;
      }
    })();

    if (!alreadyCounted) {
      try {
        sessionStorage.setItem(SESSION_VISIT_KEY, '1');
      } catch {
        // Ignore sessionStorage errors
      }

      const nextVisits = visitsRef.current + 1;
      const nextActivities = activitiesRef.current + 1;
      visitsRef.current = nextVisits;
      activitiesRef.current = nextActivities;
      setVisitsCount(nextVisits);
      setActivitiesCount(nextActivities);
      writeCachedMetrics(nextVisits, nextActivities);

      void setDoc(
        statsRef,
        {
          totalVisits: increment(1),
          totalActivities: increment(1),
          lastActivity: 'site_visit',
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      ).catch(() => {
        firestoreWritableRef.current = false;
      });

      logFirebaseEvent('site_visit', { page_path: window.location.pathname });
    }

    return () => unsubscribe();
  }, []);

  // Track interactive user clicks globally as live site activities
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const interactive = target?.closest?.('a, button, [role="button"], input[type="submit"]');
      if (!interactive) return;

      const now = Date.now();
      if (now - lastClickAtRef.current < 250) return;
      lastClickAtRef.current = now;

      const label =
        interactive.getAttribute('aria-label') ||
        interactive.textContent?.trim().slice(0, 40) ||
        interactive.tagName.toLowerCase();

      trackActivity('interaction', { label });
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => document.removeEventListener('click', handleDocumentClick, { capture: true });
  }, [trackActivity]);

  return (
    <SiteMetricsContext.Provider
      value={{ visitsCount, activitiesCount, isLive, isLoading, trackActivity }}
    >
      {children}
    </SiteMetricsContext.Provider>
  );
};

export const useSiteMetrics = (): SiteMetricsContextValue => useContext(SiteMetricsContext);
