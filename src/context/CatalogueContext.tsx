import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Category, BlogPost, StoreSettings } from '../types';
import { initialBooks, initialCategories, initialBlogPosts, initialSettings } from '../data/initialData';
import {
  isFirebaseConfigured,
  fetchBooksFromFirestore,
  fetchCategoriesFromFirestore,
  fetchBlogPostsFromFirestore,
  fetchSettingsFromFirestore,
  saveBookToFirestore,
  deleteBookFromFirestore,
  saveBlogPostToFirestore,
  deleteBlogPostFromFirestore,
  saveSettingsToFirestore,
  seedInitialFirestoreData
} from '../lib/firebase';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface CatalogueContextType {
  books: Book[];
  categories: Category[];
  posts: BlogPost[];
  settings: StoreSettings;
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  // Admin mutation methods
  addBook: (book: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  addPost: (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  resetToDefault: () => void;
}

const CatalogueContext = createContext<CatalogueContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BOOKS: 'bothlife_catalogue_books_v3',
  CATEGORIES: 'bothlife_catalogue_categories_v3',
  POSTS: 'bothlife_catalogue_posts_v3',
  SETTINGS: 'bothlife_catalogue_settings_v3'
};

export const CatalogueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
    return saved ? JSON.parse(saved) : initialBooks;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Initial cloud fetch on mount (Firebase priority, Supabase fallback)
  useEffect(() => {
    const initializeCloudData = async () => {
      // 1. Firebase Priority
      if (isFirebaseConfigured) {
        setLoading(true);
        try {
          // Auto-seed if first time running with empty database
          await seedInitialFirestoreData();

          const [cloudBooks, cloudCats, cloudPosts, cloudSettings] = await Promise.all([
            fetchBooksFromFirestore(),
            fetchCategoriesFromFirestore(),
            fetchBlogPostsFromFirestore(),
            fetchSettingsFromFirestore()
          ]);

          if (cloudBooks.length > 0) setBooks(cloudBooks);
          if (cloudCats.length > 0) setCategories(cloudCats);
          if (cloudPosts.length > 0) setPosts(cloudPosts);
          if (cloudSettings) setSettings(cloudSettings);
        } catch (err) {
          console.warn('Firebase initial fetch/seed failed, falling back to local:', err);
        } finally {
          setLoading(false);
        }
        return;
      }

      // 2. Supabase Fallback (if configured)
      if (isSupabaseConfigured && supabase) {
        setLoading(true);
        try {
          const [booksRes, catsRes, postsRes, settingsRes] = await Promise.all([
            supabase.from('books').select('*').order('created_at', { ascending: false }),
            supabase.from('categories').select('*').order('order', { ascending: true }),
            supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
            supabase.from('store_settings').select('*').single()
          ]);

          if (booksRes.data && booksRes.data.length > 0) setBooks(booksRes.data);
          if (catsRes.data && catsRes.data.length > 0) setCategories(catsRes.data);
          if (postsRes.data && postsRes.data.length > 0) setPosts(postsRes.data);
          if (settingsRes.data) setSettings(settingsRes.data);
        } catch (err) {
          console.warn('Supabase fetch failed, continuing with cached/mock store:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    initializeCloudData();
  }, []);

  const addBook = async (newBookData: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => {
    const newBook: Book = {
      ...newBookData,
      id: `book-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setBooks(prev => [newBook, ...prev]);

    if (isFirebaseConfigured) {
      try {
        await saveBookToFirestore(newBook);
      } catch (err) {
        console.error('Failed to sync book to Firebase:', err);
      }
    } else if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('books').insert(newBook);
      } catch (err) {
        console.error('Failed to sync book to Supabase:', err);
      }
    }
  };

  const updateBook = async (id: string, updates: Partial<Book>) => {
    const updatedBook = books.find(b => b.id === id);
    const fullUpdated = updatedBook ? { ...updatedBook, ...updates, updated_at: new Date().toISOString() } : null;

    setBooks(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updates, updated_at: new Date().toISOString() } : b))
    );

    if (isFirebaseConfigured && fullUpdated) {
      try {
        await saveBookToFirestore(fullUpdated);
      } catch (err) {
        console.error('Failed to update book on Firebase:', err);
      }
    } else if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('books').update(updates).eq('id', id);
      } catch (err) {
        console.error('Failed to update book on Supabase:', err);
      }
    }
  };

  const deleteBook = async (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));

    if (isFirebaseConfigured) {
      try {
        await deleteBookFromFirestore(id);
      } catch (err) {
        console.error('Failed to delete book on Firebase:', err);
      }
    } else if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('books').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete book on Supabase:', err);
      }
    }
  };

  const addPost = async (newPostData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    const newPost: BlogPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setPosts(prev => [newPost, ...prev]);

    if (isFirebaseConfigured) {
      try {
        await saveBlogPostToFirestore(newPost);
      } catch (err) {
        console.error('Failed to sync post to Firebase:', err);
      }
    } else if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('blog_posts').insert(newPost);
      } catch (err) {
        console.error('Failed to sync post to Supabase:', err);
      }
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    const targetPost = posts.find(p => p.id === id);
    const fullUpdated = targetPost ? { ...targetPost, ...updates, updated_at: new Date().toISOString() } : null;

    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p))
    );

    if (isFirebaseConfigured && fullUpdated) {
      try {
        await saveBlogPostToFirestore(fullUpdated);
      } catch (err) {
        console.error('Failed to update post on Firebase:', err);
      }
    } else if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('blog_posts').update(updates).eq('id', id);
      } catch (err) {
        console.error('Failed to update post on Supabase:', err);
      }
    }
  };

  const deletePost = async (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));

    if (isFirebaseConfigured) {
      try {
        await deleteBlogPostFromFirestore(id);
      } catch (err) {
        console.error('Failed to delete post on Firebase:', err);
      }
    } else if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('blog_posts').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete post on Supabase:', err);
      }
    }
  };

  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);

    if (isFirebaseConfigured) {
      try {
        await saveSettingsToFirestore(updated);
      } catch (err) {
        console.error('Failed to update settings on Firebase:', err);
      }
    } else if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('store_settings').upsert({ id: 1, ...updated });
      } catch (err) {
        console.error('Failed to update settings on Supabase:', err);
      }
    }
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEYS.BOOKS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    setBooks(initialBooks);
    setCategories(initialCategories);
    setPosts(initialBlogPosts);
    setSettings(initialSettings);
  };

  return (
    <CatalogueContext.Provider
      value={{
        books,
        categories,
        posts,
        settings,
        loading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        addBook,
        updateBook,
        deleteBook,
        addPost,
        updatePost,
        deletePost,
        updateSettings,
        resetToDefault
      }}
    >
      {children}
    </CatalogueContext.Provider>
  );
};

export const useCatalogue = () => {
  const context = useContext(CatalogueContext);
  if (!context) {
    throw new Error('useCatalogue must be used within a CatalogueProvider');
  }
  return context;
};
