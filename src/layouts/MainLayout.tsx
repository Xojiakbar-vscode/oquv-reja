import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useStore } from '../store/useStore';
import { BookOpen } from 'lucide-react';

export const MainLayout = () => {
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-card border-t py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-2 text-primary font-bold text-xl justify-center md:justify-start">
            <BookOpen />
            <span>O'quv reja</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  );
};
