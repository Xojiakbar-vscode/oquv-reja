import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar = () => {
  const { theme, toggleTheme } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHome = location.pathname === '/';

  const navLinks = [
    { label: 'Kurslar', href: isHome ? '#courses' : '/#courses' },
    { label: 'O\'quv yo\'li', href: isHome ? '#roadmap' : '/#roadmap' },
    { label: 'Loyihalar', href: isHome ? '#projects' : '/#projects' },
    { label: 'Imtihonlar', href: isHome ? '#exams' : '/#exams' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <BookOpen />
              <span>O'quv reja</span>
            </Link>
            
            <nav className="hidden lg:flex gap-6 text-sm font-medium">
              {navLinks.map((link, i) => (
                <a key={i} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative flex items-center bg-muted px-3 py-1.5 rounded-full">
              <Search size={16} className="text-muted-foreground mr-2" />
              <input 
                type="text"
                placeholder="Qidiruv..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-48 text-foreground placeholder:text-muted-foreground"
              />
            </form>

            <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-foreground">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="px-4 pt-2 pb-4 space-y-1 shadow-lg">
            <form onSubmit={handleSearch} className="flex items-center bg-muted px-3 py-2 rounded-lg mb-4 mt-2">
              <Search size={18} className="text-muted-foreground mr-2" />
              <input 
                type="text"
                placeholder="Darslar va mavzularni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-foreground"
              />
            </form>
            {navLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
