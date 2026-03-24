import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

// Mock data (replace with Firebase later)
const PRODUCTS = [
  {
    id: '1',
    name: 'Coconut Naru',
    price: 250,
    originalPrice: 300,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    category: 'Pitha'
  },
  {
    id: '2',
    name: 'Kacchi Biryani',
    price: 450,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop',
    category: 'Main Course'
  },
  {
    id: '3',
    name: 'Roshmalai',
    price: 350,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',
    category: 'Dessert'
  },
  {
    id: '4',
    name: 'Shorshe Ilish',
    price: 650,
    originalPrice: 800,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=800&auto=format&fit=crop',
    category: 'Main Course'
  },
  {
    id: '5',
    name: 'Chitoi Pitha',
    price: 120,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    category: 'Pitha'
  },
  {
    id: '6',
    name: 'Beef Kala Bhuna',
    price: 550,
    originalPrice: 650,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop',
    category: 'Main Course'
  }
];

const CATEGORIES = ['All', 'Pitha', 'Main Course', 'Dessert', 'Snacks'];

export default function Shop() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(PRODUCTS);
    } else {
      setFilteredProducts(PRODUCTS.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-[var(--color-maroon)] mb-6 md:mb-0">Our Menu</h1>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-[var(--color-maroon)] text-white' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[var(--color-maroon)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <motion.div 
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
          >
            <Link to={`/product/${product.id}`} className="block h-56 overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-[var(--color-maroon)] text-white text-xs font-bold px-3 py-1 rounded-full">
                {product.category}
              </div>
            </Link>
            <div className="p-5 flex flex-col flex-grow">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-bold text-xl text-gray-900 mb-2 hover:text-[var(--color-maroon)] transition-colors">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-2 mb-4 mt-auto">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">৳{product.originalPrice}</span>
                )}
                <span className="text-[var(--color-maroon)] font-bold text-lg">৳{product.price}</span>
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded ml-auto">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <button 
                onClick={() => addToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.image
                })}
                className="w-full bg-[var(--color-maroon)] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
