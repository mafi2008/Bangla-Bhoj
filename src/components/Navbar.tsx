import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[var(--color-maroon)] text-[var(--color-cream)] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-wider text-[var(--color-gold)]">
              Bangla Bhoj
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[var(--color-gold)] transition-colors font-medium">Home</Link>
            <Link to="/shop" className="hover:text-[var(--color-gold)] transition-colors font-medium">Shop</Link>
            <Link to="/about" className="hover:text-[var(--color-gold)] transition-colors font-medium">About</Link>
            <Link to="/contact" className="hover:text-[var(--color-gold)] transition-colors font-medium">Contact</Link>
          </div>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 hover:text-[var(--color-gold)] transition-colors">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[var(--color-gold)] text-[var(--color-maroon)] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button 
              className="md:hidden p-2 hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[var(--color-maroon)] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium hover:bg-white/10 hover:text-[var(--color-gold)]">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium hover:bg-white/10 hover:text-[var(--color-gold)]">Shop</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium hover:bg-white/10 hover:text-[var(--color-gold)]">About</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium hover:bg-white/10 hover:text-[var(--color-gold)]">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
