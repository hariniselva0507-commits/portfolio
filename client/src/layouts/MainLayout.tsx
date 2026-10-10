import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../components/Navbar';
import { AppFooter } from '../components/Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 portfolio-app-root">
      <AppNavbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};
