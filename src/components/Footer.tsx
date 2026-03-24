import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-maroon)] text-[var(--color-cream)] py-12 border-t-4 border-[var(--color-gold)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[var(--color-gold)] mb-4">Bangla Bhoj</h3>
          <p className="text-sm opacity-90 max-w-xs">
            Authentic Bangladeshi traditional food, homemade with pure ingredients and cultural heritage.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-[var(--color-gold)] transition-colors">Shop</Link></li>
            <li><Link to="/about" className="hover:text-[var(--color-gold)] transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-gold)] transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Dhaka, Bangladesh</li>
            <li>Phone: +880 1234 567890</li>
            <li>Email: hello@banglabhoj.com</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-75">
        &copy; {new Date().getFullYear()} Bangla Bhoj. All rights reserved.
      </div>
    </footer>
  );
}
