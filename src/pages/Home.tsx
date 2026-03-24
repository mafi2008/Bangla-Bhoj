import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Truck, Heart, Play } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Mock data for initial UI
const BEST_SELLERS = [
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
  }
];

const VIDEO_REVIEWS = [
  { id: 1, user: '@foodie_dhaka', views: '124K', title: 'Best Kacchi in town! 🤤', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400&auto=format&fit=crop' },
  { id: 2, user: '@bangla_eats', views: '89K', title: 'Authentic Coconut Naru', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop' },
  { id: 3, user: '@tasty_bd', views: '210K', title: 'Must try Roshmalai!', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400&auto=format&fit=crop' },
  { id: 4, user: '@deshi_cravings', views: '45K', title: 'Perfect Shorshe Ilish', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=400&auto=format&fit=crop' },
  { id: 5, user: '@dhaka_food_blog', views: '156K', title: 'Homemade goodness ❤️', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=400&auto=format&fit=crop' },
];

const MICRO_REVIEWS = [
  { id: 1, name: "Ayesha R.", text: "Authentic taste, just like my grandmother's cooking!", avatar: "https://picsum.photos/seed/ayesha/100/100" },
  { id: 2, name: "Kamal H.", text: "Best traditional food I've ordered online.", avatar: "https://picsum.photos/seed/kamal/100/100" },
  { id: 3, name: "Sadia I.", text: "The packaging was perfect and food was warm.", avatar: "https://picsum.photos/seed/sadia/100/100" },
  { id: 4, name: "Rahim M.", text: "Highly recommend the beef bhuna!", avatar: "https://picsum.photos/seed/rahim/100/100" },
  { id: 5, name: "Farhana T.", text: "Absolutely delicious and fresh.", avatar: "https://picsum.photos/seed/farhana/100/100" },
  { id: 6, name: "Tariq A.", text: "Will definitely order again for family gatherings.", avatar: "https://picsum.photos/seed/tariq/100/100" },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4A0E0E] via-[var(--color-maroon)] to-[#2D0808] text-[var(--color-cream)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000&auto=format&fit=crop" 
            alt="Traditional spices background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight"
          >
            Authentic Bangladeshi<br/>Traditional Food
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl mb-10 max-w-2xl text-[var(--color-gold)] font-medium drop-shadow-md"
          >
            Homemade With Pure Ingredients. Taste the cultural heritage in every bite.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/shop" 
              className="bg-[var(--color-gold)] text-[var(--color-maroon)] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors shadow-lg"
            >
              Order Now
            </Link>
            <Link 
              to="/shop" 
              className="bg-transparent border-2 border-[var(--color-gold)] text-[var(--color-gold)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-gold)] hover:text-[var(--color-maroon)] transition-colors"
            >
              Explore Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-[var(--color-gold)] text-[var(--color-maroon)] py-4 border-y border-[var(--color-maroon)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center gap-2.5">
              <Heart className="w-5 h-5" />
              <h3 className="font-semibold text-sm tracking-wide uppercase">100% Homemade</h3>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Star className="w-5 h-5" />
              <h3 className="font-semibold text-sm tracking-wide uppercase">Traditional Recipe</h3>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-semibold text-sm tracking-wide uppercase">No Preservatives</h3>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Truck className="w-5 h-5" />
              <h3 className="font-semibold text-sm tracking-wide uppercase">Nationwide Delivery</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-20 bg-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--color-maroon)] mb-4" style={{ fontFamily: "'Highborn Vintage', serif" }}>Our Products</h2>
            <div className="w-24 h-1 bg-[var(--color-gold)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BEST_SELLERS.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col"
              >
                <Link to={`/product/${product.id}`} className="block h-48 overflow-hidden relative">
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
          
          <div className="text-center mt-12">
            <Link to="/shop" className="inline-block text-[var(--color-maroon)] font-bold border-b-2 border-[var(--color-maroon)] pb-1 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors">
              View All Menu &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Customer Testimonials */}
      <section className="py-24 bg-[var(--color-cream)] overflow-hidden">
        {/* Heading 1 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            Our customers <span className="font-script text-[var(--color-maroon)] text-4xl md:text-5xl font-normal lowercase" style={{ fontFamily: 'var(--font-script)' }}>love</span> our food
          </h2>
        </div>

        {/* 2. Horizontally Scrolling Micro Reviews */}
        <div className="relative w-full flex overflow-x-hidden mb-20">
          <div className="flex w-max animate-scroll">
            {[1, 2].map((half) => (
              <div key={half} className="flex gap-8 pr-8 shrink-0">
                {[...MICRO_REVIEWS, ...MICRO_REVIEWS].map((review, i) => (
                  <div 
                    key={`${half}-${review.id}-${i}`}
                    className="bg-white rounded-full py-3 px-6 flex items-center gap-4 shadow-sm border border-gray-100 shrink-0"
                  >
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                        ))}
                      </div>
                      <p className="text-[12px] font-medium text-gray-800">"{review.text}"</p>
                      <p className="text-[10px] text-gray-500">— {review.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Heading 2 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-10 text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
            Review
          </h2>
        </div>

        {/* 3. Video Review Carousel */}
        <div className="relative w-full flex overflow-x-hidden py-4">
          <div className="flex w-max animate-scroll" style={{ animationDirection: 'reverse', animationDuration: '150s' }}>
            {[1, 2].map((half) => (
              <div key={half} className="flex gap-8 pr-8 shrink-0">
                {[...VIDEO_REVIEWS, ...VIDEO_REVIEWS, ...VIDEO_REVIEWS].map((review, i) => (
                  <div 
                    key={`${half}-${review.id}-${i}`} 
                    className="w-48 h-80 relative rounded-3xl overflow-hidden shrink-0 group cursor-pointer shadow-lg border border-[var(--color-maroon)]/10"
                  >
                    <video 
                      src="https://cdn.pixabay.com/video/2016/08/22/4762-180632282_tiny.mp4" 
                      poster={review.image}
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
                    
                    {/* Content */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-medium text-[12px] mb-2 line-clamp-2 leading-snug">{review.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[10px] text-[var(--color-gold)]">{review.user}</p>
                        <p className="text-[9px] font-medium opacity-90 bg-black/50 px-2 py-1 rounded-full backdrop-blur-md">{review.views} views</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
