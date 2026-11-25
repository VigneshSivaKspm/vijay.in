import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getEnv } from '../config/env';

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY', 'AIzaSyCqE1p6M1gwpDrw1rofy6rD7IFHOWgjhCo'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN', 'vijaykrishnan-aec78.firebaseapp.com'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID', 'vijaykrishnan-aec78'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET', 'vijaykrishnan-aec78.firebasestorage.app'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', '919757221548'),
  appId: getEnv('VITE_FIREBASE_APP_ID', '1:919757221548:web:10f792b82a441aacd03909'),
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID', 'G-S4TZ4BX956'),
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let analyticsPromise: Promise<Analytics | null> | null = null;

if (typeof window !== 'undefined') {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined' || !app) return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => (supported && app ? getAnalytics(app) : null))
      .catch(() => null);
  }
  return analyticsPromise;
}

export function logFirebaseEvent(eventName: string, params?: Record<string, string | number | boolean>): void {
  void getFirebaseAnalytics().then((analytics) => {
    if (!analytics) return;
    try {
      logEvent(analytics, eventName, params);
    } catch {
      // Ignore analytics transport errors
    }
  });
}

export { app, db, firebaseConfig };
