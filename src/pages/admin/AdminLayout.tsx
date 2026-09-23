import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SquaresFour, BookOpen, FileText, Gear, ArrowSquareOut, SignOut, List, X } from '@phosphor-icons/react';
import { useCatalogue } from '../../context/CatalogueContext';

export const AdminLayout: React.FC = () => {
  const { settings } = useCatalogue();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('maktabah_admin_authenticated');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: SquaresFour },
    { name: 'Catalogue & Books', path: '/admin/books', icon: BookOpen },
    { name: 'Reader Blog', path: '/admin/blog', icon: FileText },
    { name: 'Store Settings', path: '/admin/settings', icon: Gear },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col md:flex-row relative overflow-hidden">
      {/* Subtle BothLife Watermark on Main Canvas Background */}
      <div 
        className="fixed -right-16 -bottom-16 pointer-events-none opacity-[0.035] select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/logo.svg"
          alt=""
          className="w-[500px] lg:w-[650px] h-auto object-contain"
        />
      </div>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#0C3934] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#0C5149] sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1 shrink-0">
            <img src="/logo.svg" alt="Admin Logo" className="w-full h-full object-contain filter invert" />
          </div>
          <div className="min-w-0">
            <span className="block font-bold text-xs leading-tight text-white font-serif-display truncate">
              {settings.store_name}
            </span>
            <span className="block text-[9px] text-[#C59E42] font-semibold uppercase tracking-wider whitespace-nowrap">
              Admin Portal
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-[#0C5149] transition-colors"
          aria-label="Toggle admin navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </header>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C3934] text-white px-4 py-4 space-y-4 border-b border-[#0C5149] relative z-30 shadow-xl">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#0C5149] text-white border-l-3 border-[#C59E42]'
                      : 'text-emerald-100/70 hover:text-white hover:bg-[#0C5149]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#C59E42]' : 'text-emerald-300/80'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#0C5149] flex items-center justify-between text-xs">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-emerald-200/80 hover:text-white transition-colors"
            >
              <span>View Public Store</span>
              <ArrowSquareOut className="w-3.5 h-3.5 text-[#C59E42]" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-red-300 hover:text-red-200 cursor-pointer"
            >
              <SignOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-72 lg:w-80 bg-[#0C3934] text-white flex-col justify-between shrink-0 p-6 lg:p-7 space-y-7 border-r border-[#0C5149] relative z-10 overflow-hidden shadow-md min-h-screen">
        {/* Subtle Watermark Inside Sidebar */}
        <div 
          className="absolute -right-8 -bottom-8 pointer-events-none opacity-[0.05] select-none mix-blend-screen"
          aria-hidden="true"
        >
          <img
            src="/logo.svg"
            alt=""
            className="w-56 h-auto object-contain filter invert"
          />
        </div>

        <div className="space-y-7 relative z-10">
          {/* Brand */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-[#0C5149]/80">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shrink-0">
              <img src="/logo.svg" alt="Admin Logo" className="w-full h-full object-contain filter invert" />
            </div>
            <div className="min-w-0 pr-1">
              <span className="block font-bold text-base leading-snug text-white font-serif-display tracking-tight truncate">
                {settings.store_name}
              </span>
              <span className="block text-[10.5px] text-[#C59E42] font-semibold uppercase tracking-wider mt-0.5 whitespace-nowrap">
                by BothLife Centre & Library
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#0C5149] text-white border-l-3 border-[#C59E42] shadow-xs'
                      : 'text-emerald-100/70 hover:text-white hover:bg-[#0C5149]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#C59E42]' : 'text-emerald-300/80'}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-[#0C5149] space-y-2 relative z-10">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-emerald-200/80 hover:text-white hover:bg-[#0C5149]/60 transition-colors"
          >
            <span>View Public Store</span>
            <ArrowSquareOut className="w-3.5 h-3.5 text-[#C59E42]" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-300 hover:text-red-200 hover:bg-red-900/30 transition-colors cursor-pointer"
          >
            <SignOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto max-w-6xl relative z-10">
        <Outlet />
      </main>
    </div>
  );
};
