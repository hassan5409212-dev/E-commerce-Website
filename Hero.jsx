import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, RefreshCcw, Headphones, Star, TrendingUp, Package } from 'lucide-react';
import heroImage from '../assets/hero2.png';

const STATS = [
  { icon: Package, value: '2,400+', label: 'Products' },
  { icon: Star, value: '4.9', label: 'Avg Rating' },
  { icon: TrendingUp, value: '98%', label: 'Satisfaction' },
];

const PERKS = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Same-day dispatch on all orders' },
  { icon: Shield, title: 'Secure Payments', desc: '256-bit SSL encrypted checkout' },
  { icon: RefreshCcw, title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: Headphones, title: '24/7 Support', desc: 'Real humans ready to help' },
];

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const frames = 60;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / frames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount((eased * num).toFixed(num % 1 !== 0 ? 1 : 0));
      if (frame >= frames) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{target.replace(/[\d.]+/, count)}</span>;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="mb-16">
      {/* ── Main Hero ── */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0a1a] min-h-[580px] flex items-center">

        {/* Background image — right side */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium lifestyle products"
            className="w-full h-full object-cover object-center opacity-60 md:opacity-80"
          />
          {/* gradient scrim — stronger on left, fades right */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a1a] via-[#0a0a1a]/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a1a]/60 via-transparent to-transparent" />
        </div>

        {/* Floating decorative orbs */}
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20 md:py-28">
          <div className={`max-w-lg transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">New Arrivals — Spring 2026</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Premium Tech,{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-primary-400 to-cyan-300">
                Elevated.
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light max-w-md">
              Curated electronics and lifestyle essentials chosen for people who demand more from every purchase.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProducts}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold text-base transition-all duration-300 shadow-2xl shadow-primary-900/40 hover:-translate-y-0.5 active:scale-95"
              >
                Shop Now
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                to="/?category=Electronics"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                View Electronics
              </Link>
            </div>
          </div>

          {/* Stats strip — positioned bottom-right on md+ */}
          <div className={`mt-16 md:mt-0 md:absolute md:bottom-12 md:right-12 flex gap-6 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4 min-w-[90px]">
                <Icon className="h-4 w-4 text-primary-400 mb-1" />
                <span className="text-white font-black text-xl leading-none">
                  <CountUp target={value} />
                </span>
                <span className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trust / Perks Bar ── */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {PERKS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group flex items-center gap-4 p-5 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 hover:border-primary-400/40 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 cursor-default"
          >
            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
              <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
