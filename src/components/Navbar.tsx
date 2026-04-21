import React from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useWishlist } from '../context/WishlistContext';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { wishlist } = useWishlist();

  return (
    <nav className="w-full flex items-center justify-between px-10 py-6 border-b border-white/10 bg-luxury-navy z-50">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <div className="text-2xl serif font-bold text-gold tracking-[-0.5px]">
          QistPremium
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 text-sm uppercase tracking-widest text-white/60 font-medium">
          <a href="#" className="hover:text-gold transition-colors">Laptop</a>
          <a href="#" className="hover:text-gold transition-colors">Home Appliances</a>
          <a href="#" className="hover:text-gold transition-colors">Cosmetic</a>
          <a href="#" className="hover:text-gold transition-colors">Furniture</a>
          <a href="#" className="hover:text-gold transition-colors">Art</a>
          <a href="#" className="hover:text-gold transition-colors">Vehicles</a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden md:block relative">
          <input 
            type="text" 
            placeholder="Search collections..." 
            className="bg-white/5 border border-white/10 rounded-full py-2 px-6 text-sm w-64 focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-lg hover:bg-white/5 transition-colors cursor-pointer">
            <User className="w-5 h-5" />
          </div>
          
          {/* Wishlist Icon */}
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-lg hover:bg-white/5 transition-colors">
              <Heart className="w-5 h-5 text-white/60 group-hover:text-red-500 transition-colors" />
            </div>
            {wishlist.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                {wishlist.length}
              </div>
            )}
          </div>

          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-bold cursor-pointer hover:brightness-110 transition-all">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <button 
            className="lg:hidden hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-luxury-navy flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl serif font-bold">
                Qist<span className="text-gold">Premium</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-gold" />
              </button>
            </div>
            <div className="flex flex-col space-y-8 text-2xl serif">
              <a href="#" className="hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>Lifestyle</a>
              <a href="#" className="hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>Tech</a>
              <a href="#" className="hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>Watches</a>
              <a href="#" className="hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>Automotive</a>
              <div className="h-px bg-white/10 my-4" />
              <a href="#" className="text-lg uppercase tracking-widest text-gold">My Account</a>
              <a href="#" className="text-lg uppercase tracking-widest">Support</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
