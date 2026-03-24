import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const deliveryCharge = items.length > 0 ? 60 : 0; // Flat 60 tk delivery inside Dhaka
  const finalTotal = totalPrice + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-6 rounded-full shadow-sm">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
        </div>
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any traditional delicacies to your cart yet.</p>
        <Link 
          to="/shop" 
          className="inline-flex bg-[var(--color-maroon)] text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-colors shadow-md"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold text-[var(--color-maroon)] mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.productId}-${item.flavour}`} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              
              <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{item.name}</h3>
                  {item.flavour && (
                    <p className="text-sm text-gray-500 mb-2">Flavour: {item.flavour}</p>
                  )}
                  <p className="text-[var(--color-maroon)] font-bold text-lg">৳{item.price}</p>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.flavour)}
                      className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.flavour)}
                      className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.productId, item.flavour)}
                    className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-100 sticky top-24">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">৳{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-medium text-gray-900">৳{deliveryCharge}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">Total</span>
                <span className="font-bold text-2xl text-[var(--color-maroon)]">৳{finalTotal}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-[var(--color-maroon)] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors shadow-md"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>
            
            <div className="mt-6 text-center">
              <Link to="/shop" className="text-sm text-[var(--color-maroon)] font-medium hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
