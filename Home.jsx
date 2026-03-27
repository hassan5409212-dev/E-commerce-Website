import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import productsData from '../data/products.json';

const CATEGORIES = ['All', ...new Set(productsData.map(p => p.category))];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' }
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const query = searchParams.get('q') || '';
  const activeCategory = searchParams.get('category') || 'All';
  const activeSort = searchParams.get('sort') || 'featured';

  // Simulate network request for skeletons
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query, activeCategory, activeSort]);

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsData];

    // Search filter
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    switch (activeSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - keep original order
        break;
    }

    return result;
  }, [query, activeCategory, activeSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-screen">
      
      {!query && activeCategory === 'All' && <Hero />}

      <div id="products-grid" className="flex flex-col md:flex-row gap-12">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center glass p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm mb-6">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {filteredAndSortedProducts.length} Results
          </span>
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-bold"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Sidebar Filters */}
        <div className={`
          fixed inset-0 z-60 glass p-8 overscroll-y-auto transform transition-transform duration-500 ease-in-out shadow-2xl
          md:relative md:inset-auto md:z-0 md:bg-transparent md:backdrop-blur-none md:p-0 md:w-72 md:shrink-0 md:transform-none md:block md:shadow-none md:border-none
          ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex justify-between items-center md:hidden mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center font-heading">
              <SlidersHorizontal className="mr-3 h-6 w-6 text-primary-500" /> Filters
            </h2>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-slate-900 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-12 sticky top-28">
            {/* Categories */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Categories</h3>
              <ul className="space-y-4">
                {CATEGORIES.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => {
                        updateParams('category', category);
                        setIsMobileFiltersOpen(false);
                      }}
                      className={`text-left w-full transition-all duration-300 flex items-center group font-body ${
                        activeCategory === category 
                          ? 'text-primary-600 dark:text-primary-400 font-bold scale-105 transform origin-left' 
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${
                        activeCategory === category ? 'bg-primary-500 scale-100' : 'bg-transparent scale-0 group-hover:scale-100 group-hover:bg-slate-300'
                      }`} />
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Sort By</h3>
              <div className="space-y-5">
                {SORT_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center space-x-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-6 h-6">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={activeSort === option.value}
                        onChange={(e) => {
                          updateParams('sort', e.target.value);
                          setIsMobileFiltersOpen(false);
                        }}
                        className="peer appearance-none w-6 h-6 border-2 border-slate-200 dark:border-slate-700 rounded-lg checked:border-primary-500 checked:bg-primary-500/10 transition-all cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-primary-500 scale-0 peer-checked:scale-100 transition-transform pointer-events-none shadow-lg shadow-primary-500/50" />
                    </div>
                    <span className={`transition-colors font-body ${
                      activeSort === option.value 
                        ? 'text-slate-900 dark:text-white font-bold' 
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                    }`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Aesthetic Sidebar card */}
            <div className="hidden md:block p-6 glass rounded-3xl border border-primary-500/10 bg-primary-500/5 mt-12">
              <h4 className="font-heading font-black text-primary-600 dark:text-primary-400 mb-2">Need help?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Our concierge team is available 24/7 to help you find the perfect product.</p>
              <button className="mt-4 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">Contact Support →</button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {query && (
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 font-heading">
              Results for <span className="text-primary-600">"{query}"</span>
            </h2>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-4xl border border-slate-200 dark:border-slate-700 overflow-hidden h-96 shadow-sm">
                  <div className="w-full aspect-4/5 bg-slate-100 dark:bg-slate-700" />
                  <div className="p-6 space-y-4">
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full w-1/4" />
                    <div className="h-5 bg-slate-100 dark:bg-slate-700 rounded-full w-3/4" />
                    <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded-2xl w-1/3 mt-6" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
              <div className="w-32 h-32 glass rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-slate-200 dark:shadow-none">
                <Search className="h-12 w-12 text-primary-500" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 font-heading">No matches found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-body font-light opacity-80 leading-relaxed">
                We couldn't find any products matching your current filters or search query. 
              </p>
              <button 
                onClick={() => {
                  setSearchParams({});
                  setIsMobileFiltersOpen(false);
                }}
                className="mt-10 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10 dark:shadow-none"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
