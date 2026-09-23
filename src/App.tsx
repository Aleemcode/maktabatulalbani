import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { CatalogueProvider } from './context/CatalogueContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloatingButton } from './components/whatsapp/WhatsAppFloatingButton';
import { CartDrawer } from './components/cart/CartDrawer';
import { ScrollToTop } from './components/common/ScrollToTop';

// Public pages
import { Home } from './pages/Home';
import { Catalogue } from './pages/Catalogue';
import { JumuahDeals } from './pages/JumuahDeals';
import { BookDetail } from './pages/BookDetail';
import { Blog } from './pages/Blog';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { About } from './pages/About';

// Admin pages
import { AdminGuard } from './pages/admin/AdminGuard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminBooks } from './pages/admin/AdminBooks';
import { BookEditor } from './pages/admin/BookEditor';
import { AdminBlog } from './pages/admin/AdminBlog';
import { PostEditor } from './pages/admin/PostEditor';
import { AdminSettings } from './pages/admin/AdminSettings';

/**
 * Public Layout Wrapper with standard navbar, footer, and floating widgets
 */
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <CartDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CatalogueProvider>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Storefront Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/jumuah-deals" element={<JumuahDeals />} />
            <Route path="/book/:slug" element={<BookDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="books" element={<AdminBooks />} />
              <Route path="books/new" element={<BookEditor />} />
              <Route path="books/edit/:id" element={<BookEditor />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="blog/new" element={<PostEditor />} />
              <Route path="blog/edit/:id" element={<PostEditor />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </CatalogueProvider>
  );
};

export default App;
