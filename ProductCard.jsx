import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWished = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group flex flex-col bg-white dark:bg-slate-800 rounded-4xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button 
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 p-3 glass rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-900 transition-all active:scale-90 z-10"
          aria-label="Toggle Wishlist"
        >
          <Heart 
            className={twMerge(
              "h-5 w-5 transition-colors", 
              isWished ? "fill-red-500 text-red-500" : "text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400"
            )} 
          />
        </button>

        <div className="absolute top-4 left-4 glass px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 shadow-sm z-10">
          {product.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center space-x-1 mb-3">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">{product.rating} Rating</span>
        </div>
        
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest mb-0.5">Price</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              <span className="text-primary-500 text-lg mr-0.5">$</span>{product.price.toFixed(2)}
            </span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-slate-900 dark:bg-white hover:bg-primary-600 dark:hover:bg-primary-500 group/btn transition-all duration-300 w-12 h-12 rounded-2xl active:scale-90 shadow-xl shadow-slate-900/10"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5 text-white dark:text-slate-900 group-hover/btn:text-white transition-colors" />
          </button>
        </div>
      </div>
    </Link>
  );
}
