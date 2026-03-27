import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import productsData from '../data/products.json';
import { twMerge } from 'tailwind-merge';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsLoading(true);
    // Simulate network delay
    const timer = setTimeout(() => {
      const found = productsData.find(p => p.id === parseInt(id));
      setProduct(found || null);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="animate-pulse flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="w-full md:w-1/2 space-y-6 pt-8">
            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-24 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-14 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Product Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
        </Link>
      </div>
    );
  }

  const isWished = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Product Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-bold rounded-full mb-4 tracking-wider uppercase">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1.5" />
                <span className="font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
                <span className="text-slate-500 dark:text-slate-400 ml-1 text-sm">(128 reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-end space-x-4 mb-8">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
            <span className="text-lg text-slate-500 dark:text-slate-400 line-through pb-1">${(product.price * 1.25).toFixed(2)}</span>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <ShoppingCart className="mr-2 h-6 w-6" /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="px-6 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 bg-white dark:bg-slate-800 transition-all active:scale-95 group"
              aria-label="Add to wishlist"
            >
              <Heart className={twMerge(
                "h-7 w-7 transition-colors",
                isWished ? "fill-red-500 text-red-500" : "text-slate-400 group-hover:text-red-500"
              )} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <Truck className="h-5 w-5 mr-3 text-primary-500" />
              <span className="text-sm font-medium">Free Shipping Worldwide</span>
            </div>
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <RotateCcw className="h-5 w-5 mr-3 text-primary-500" />
              <span className="text-sm font-medium">30 Days Return Policy</span>
            </div>
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <ShieldCheck className="h-5 w-5 mr-3 text-primary-500" />
              <span className="text-sm font-medium">2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
