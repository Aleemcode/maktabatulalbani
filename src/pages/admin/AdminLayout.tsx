import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Settings, ExternalLink, LogOut } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';

export const AdminLayout: React.FC = () => {
  const { settings } = useCatalogue();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('maktabah_admin_authenticated');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Catalogue & Books', path: '/admin/books', icon: BookOpen },
    { name: 'Reader Blog', path: '/admin/blog', icon: FileText },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#18181B] text-white flex flex-col justify-between shrink-0 p-6 space-y-6">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#27272A]">
            <img src="/logo.svg" alt="Admin Logo" className="w-10 h-10 object-contain invert" />
            <div>
              <span className="block font-bold text-sm leading-tight text-white">Admin Console</span>
              <span className="block text-[11px] text-[#A1A1AA] truncate">{settings.store_name}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-white text-[#18181B]'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-[#27272A]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-[#27272A] space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-colors"
          >
            <span>View Public Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
};
