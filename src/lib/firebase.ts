import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  Firestore
} from 'firebase/firestore';
import { Book, Category, BlogPost, StoreSettings } from '../types';
import { initialBooks, initialCategories, initialBlogPosts, initialSettings } from '../data/initialData';

// Firebase credentials (supports Vite env or direct project config)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDtDniXuKDexEXaM2E5Z4pCTXtqr1hxbKc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "maktabahalbani-c85bc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "maktabahalbani-c85bc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "maktabahalbani-c85bc.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "948342080127",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:948342080127:web:93369815f92261dba9b54a"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY'
);

// Initialize Firebase App
export const app = isFirebaseConfigured
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

// Initialize Firestore
export const db: Firestore | null = app ? getFirestore(app) : null;

// Collection Names
export const COLLECTIONS = {
  BOOKS: 'books',
  CATEGORIES: 'categories',
  BLOG_POSTS: 'blog_posts',
  SETTINGS: 'store_settings'
} as const;

/**
 * Fetch all books from Firestore
 */
export async function fetchBooksFromFirestore(): Promise<Book[]> {
  if (!db) return [];
  const q = query(collection(db, COLLECTIONS.BOOKS), orderBy('created_at', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => docSnap.data() as Book);
}

/**
 * Save or update a book in Firestore
 */
export async function saveBookToFirestore(book: Book): Promise<void> {
  if (!db) return;
  const docRef = doc(db, COLLECTIONS.BOOKS, book.id);
  await setDoc(docRef, book, { merge: true });
}

/**
 * Delete a book from Firestore
 */
export async function deleteBookFromFirestore(bookId: string): Promise<void> {
  if (!db) return;
  const docRef = doc(db, COLLECTIONS.BOOKS, bookId);
  await deleteDoc(docRef);
}

/**
 * Fetch all categories from Firestore
 */
export async function fetchCategoriesFromFirestore(): Promise<Category[]> {
  if (!db) return [];
  const q = query(collection(db, COLLECTIONS.CATEGORIES), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => docSnap.data() as Category);
}

/**
 * Save or update a category in Firestore
 */
export async function saveCategoryToFirestore(category: Category): Promise<void> {
  if (!db) return;
  const docRef = doc(db, COLLECTIONS.CATEGORIES, category.id);
  await setDoc(docRef, category, { merge: true });
}

/**
 * Fetch all blog posts from Firestore
 */
export async function fetchBlogPostsFromFirestore(): Promise<BlogPost[]> {
  if (!db) return [];
  const q = query(collection(db, COLLECTIONS.BLOG_POSTS), orderBy('created_at', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => docSnap.data() as BlogPost);
}

/**
 * Save or update a blog post in Firestore
 */
export async function saveBlogPostToFirestore(post: BlogPost): Promise<void> {
  if (!db) return;
  const docRef = doc(db, COLLECTIONS.BLOG_POSTS, post.id);
  await setDoc(docRef, post, { merge: true });
}

/**
 * Delete a blog post from Firestore
 */
export async function deleteBlogPostFromFirestore(postId: string): Promise<void> {
  if (!db) return;
  const docRef = doc(db, COLLECTIONS.BLOG_POSTS, postId);
  await deleteDoc(docRef);
}

/**
 * Fetch store settings from Firestore
 */
export async function fetchSettingsFromFirestore(): Promise<StoreSettings | null> {
  if (!db) return null;
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'default');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data() as StoreSettings;
  }
  return null;
}

/**
 * Save store settings to Firestore
 */
export async function saveSettingsToFirestore(settings: StoreSettings): Promise<void> {
  if (!db) return;
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'default');
  await setDoc(docRef, settings, { merge: true });
}

/**
 * Seed initial catalogue data into Firestore if collections are empty
 */
export async function seedInitialFirestoreData(): Promise<void> {
  if (!db) return;

  try {
    const existingBooks = await getDocs(collection(db, COLLECTIONS.BOOKS));
    if (existingBooks.empty) {
      for (const book of initialBooks) {
        await saveBookToFirestore(book);
      }
    }

    const existingCategories = await getDocs(collection(db, COLLECTIONS.CATEGORIES));
    if (existingCategories.empty) {
      for (const cat of initialCategories) {
        await saveCategoryToFirestore(cat);
      }
    }

    const existingPosts = await getDocs(collection(db, COLLECTIONS.BLOG_POSTS));
    if (existingPosts.empty) {
      for (const post of initialBlogPosts) {
        await saveBlogPostToFirestore(post);
      }
    }

    const existingSettings = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'default'));
    if (!existingSettings.exists()) {
      await saveSettingsToFirestore(initialSettings);
    }
  } catch (err) {
    console.warn('Could not seed initial Firestore data:', err);
  }
}
