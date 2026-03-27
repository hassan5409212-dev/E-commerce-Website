import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import emptyCartImage from '../assets/empty-cart.png';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const SHIPPING_COST = 15.00;
  const TAX_RATE = 0.08;
  
  const tax = totalPrice * TAX_RATE;
  const finalTotal = totalPrice > 0 ? totalPrice + tax + SHIPPING_COST : 0;

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16">
        {/* Decorative top orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center text-center max-w-md mx-auto">
          {/* Illustration */}
          <div className="w-52 h-52 mb-8 relative">
            <img
              src={emptyCartImage}
              alt="Your cart is empty"
              className="w-full h-full object-contain drop-shadow-2xl animate-float"
            />
          </div>

          {/* Text */}
          <h2 className="font-heading text-4xl font-black text-slate-900 dark:text-white mb-4">
            Your cart is{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-500 to-violet-400">
              empty!
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed text-lg">
            Looks like you haven't found your next favourite thing yet. Let's change that!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              to="/"
              className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-primary-500/20 hover:-translate-y-0.5 active:scale-95"
            >
              <ShoppingBag className="h-5 w-5" />
              Start Shopping
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/?sort=rating-desc"
              className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              <Sparkles className="h-5 w-5" />
              Top Rated
            </Link>
          </div>

          {/* Promo pill */}
          <div className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400">
            <Tag className="h-4 w-4" />
            <span className="text-sm font-semibold">Free shipping on orders over $50</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-10">
        <h1 className="font-heading text-4xl font-black text-slate-900 dark:text-white">
          Your Cart
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''} ready to checkout</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-primary-400/30 gap-6 group transition-all duration-300"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              <div className="flex-1 flex flex-col w-full">
                <div className="flex justify-between items-start mb-1">
                  <Link
                    to={`/product/${item.id}`}
                    className="font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 pr-4 font-body text-base md:text-lg"
                  >
                    {item.name}
                  </Link>
                  <p className="font-black text-xl text-slate-900 dark:text-white shrink-0">
                    <span className="text-primary-500 text-sm mr-0.5">$</span>
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-5 uppercase tracking-wider font-medium">{item.category}</p>

                <div className="flex items-center justify-between mt-auto">
                  {/* Qty control */}
                  <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-bold text-slate-900 dark:text-white text-sm border-l border-r border-slate-200 dark:border-slate-700 min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-xl transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-white dark:bg-slate-800 p-7 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
            <h2 className="font-heading text-2xl font-black text-slate-900 dark:text-white mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
              {[
                { label: 'Subtotal', value: `$${totalPrice.toFixed(2)}` },
                { label: 'Shipping', value: `$${SHIPPING_COST.toFixed(2)}` },
                { label: 'Tax (8%)', value: `$${tax.toFixed(2)}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
              <span className="text-3xl font-black text-primary-600 dark:text-primary-400">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <button className="group w-full bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary-500/20 hover:-translate-y-0.5 active:scale-95">
              Proceed to Checkout
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Trust badges */}
            <div className="mt-6 flex items-center justify-center gap-5 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">🔒 SSL Secure</span>
              <span className="flex items-center gap-1">↩ 30-day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
