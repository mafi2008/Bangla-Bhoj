import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Info, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Mock data
const PRODUCT = {
  id: '1',
  name: 'Coconut Naru',
  price: 250,
  originalPrice: 300,
  image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'
  ],
  category: 'Pitha',
  description: 'Traditional winter delicacy made with freshly ground rice flour, sweet date palm jaggery (khejur gur), and freshly grated coconut. Steamed to perfection for a soft, melt-in-the-mouth experience.',
  ingredients: ['Rice Flour', 'Date Palm Jaggery (Khejur Gur)', 'Fresh Coconut', 'Pinch of Salt'],
  shelfLife: 'Best consumed within 24 hours. Keep refrigerated if storing longer.',
  flavours: ['Classic Gur', 'Extra Coconut', 'Sugar Free']
};

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavour, setSelectedFlavour] = useState(PRODUCT.flavours[0]);
  const [activeImage, setActiveImage] = useState(PRODUCT.images[0]);

  const handleAddToCart = () => {
    addToCart({
      productId: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      quantity,
      image: PRODUCT.image,
      flavour: selectedFlavour
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/shop" className="text-gray-500 hover:text-[var(--color-maroon)] transition-colors">
          &larr; Back to Menu
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <img 
              src={activeImage} 
              alt={PRODUCT.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {PRODUCT.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-24 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 ${activeImage === img ? 'border-[var(--color-maroon)]' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="bg-[var(--color-cream)] text-[var(--color-maroon)] text-xs font-bold px-3 py-1 rounded-full border border-[var(--color-maroon)]/20">
              {PRODUCT.category}
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">{PRODUCT.name}</h1>
          <div className="flex items-center gap-4 mb-8">
            {PRODUCT.originalPrice && (
              <span className="text-gray-400 line-through text-2xl">৳{PRODUCT.originalPrice}</span>
            )}
            <span className="text-3xl font-bold text-[var(--color-maroon)]">৳{PRODUCT.price}</span>
            {PRODUCT.originalPrice && (
              <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">
                {Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {PRODUCT.flavours && PRODUCT.flavours.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Select Flavour</h3>
              <div className="flex flex-wrap gap-3">
                {PRODUCT.flavours.map(flavour => (
                  <button
                    key={flavour}
                    onClick={() => setSelectedFlavour(flavour)}
                    className={`px-5 py-2 rounded-xl border ${
                      selectedFlavour === flavour 
                        ? 'bg-[var(--color-maroon)] text-white border-[var(--color-maroon)]' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[var(--color-maroon)]'
                    } transition-colors`}
                  >
                    {flavour}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[var(--color-maroon)] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors shadow-md"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>
            <Link 
              to="/checkout"
              onClick={handleAddToCart}
              className="flex-1 bg-[var(--color-gold)] text-[var(--color-maroon)] py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-yellow-500 transition-colors shadow-md"
            >
              Buy Now
            </Link>
          </div>

          {/* Accordion/Info Sections */}
          <div className="space-y-6 border-t border-gray-200 pt-8">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 mb-2 text-gray-900">
                <Info size={20} className="text-[var(--color-maroon)]" />
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">{PRODUCT.description}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 mb-2 text-gray-900">
                <ShieldCheck size={20} className="text-[var(--color-maroon)]" />
                Ingredients
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {PRODUCT.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 mb-2 text-gray-900">
                <Truck size={20} className="text-[var(--color-maroon)]" />
                Delivery & Shelf Life
              </h3>
              <p className="text-gray-600 leading-relaxed">{PRODUCT.shelfLife}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
