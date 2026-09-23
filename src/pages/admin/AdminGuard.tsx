import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminGuard: React.FC = () => {
  const isAdminAuthenticated = localStorage.getItem('maktabah_admin_authenticated') === 'true';

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
