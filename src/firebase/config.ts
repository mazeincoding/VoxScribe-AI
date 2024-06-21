import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
  DatabaseReference,
  get,
  getDatabase,
  remove,
  set,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getDatabase(app);

// Helper functions
const writeToDatabase = async <T extends Record<string, unknown>>(
  dbRef: DatabaseReference,
  data: Partial<T>
): Promise<void> => {
  await set(dbRef, data);
};

const readFromDatabase = async <T>(
  dbRef: DatabaseReference
): Promise<T | null> => {
  const snapshot = await get(dbRef);
  return snapshot.val() as T | null;
};

const deleteFromDatabase = async (dbRef: DatabaseReference): Promise<void> => {
  await remove(dbRef);
};

const updateDatabase = async <T extends Record<string, unknown>>(
  dbRef: DatabaseReference,
  data: T
): Promise<void> => {
  await update(dbRef, data);
};

export {
  storage,
  auth,
  db,
  writeToDatabase,
  readFromDatabase,
  deleteFromDatabase,
  updateDatabase,
};
