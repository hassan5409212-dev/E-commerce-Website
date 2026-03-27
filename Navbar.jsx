import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Sun, Moon, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setQuery('');
    } else {
      setQuery(searchParams.get('q') || '');
    }
  }, [location.pathname, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`);
      setIsMobileMenuOpen(false);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass transition-all duration-300 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary-600/20 group-hover:scale-110 transition-transform">
              E
            </div>
            <span className="font-heading font-black text-2xl tracking-tight hidden sm:block text-slate-900 dark:text-white">Elevate</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-12">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                placeholder="Search premium products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-transparent focus:border-primary-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-400 dark:text-white font-body"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            </form>
          </div>

          <div className="flex items-center space-x-5 sm:space-x-7">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:text-slate-400 dark:hover:text-primary-400 dark:hover:bg-primary-900/20 transition-all active:scale-90"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link to="/wishlist" className="relative p-2 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-all active:scale-90">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce-slow">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-xl text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:text-slate-400 dark:hover:text-primary-400 dark:hover:bg-primary-900/20 transition-all active:scale-90">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-primary-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce-slow">
                  {totalItems}
                </span>
              )}
            </Link>

            <button 
              className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 shadow-xl animate-fade-in-down">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
            />
            <Search className="absolute left-4 top-4.5 h-6 w-6 text-slate-400" />
          </form>
        </div>
      )}
    </nav>
  );
}
