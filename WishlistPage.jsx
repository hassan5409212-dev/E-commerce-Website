import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
          <Heart className="h-8 w-8 mr-3 text-red-500 fill-red-500" /> My Wishlist
        </h1>
        <span className="text-slate-500 dark:text-slate-400 font-medium">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
          <div className="w-24 h-24 bg-red-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
            <Heart className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Your wishlist is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Save items you love here to easily find them later. Start exploring our collection!
          </p>
          <Link 
            to="/" 
            className="px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}
