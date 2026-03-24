import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CheckCircle2, Loader2 } from 'lucide-react';

const DIVISIONS = ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'];
const PAYMENT_METHODS = ['Cash on Delivery', 'bKash', 'Nagad', 'Rocket'];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    alternativePhone: '',
    division: 'Dhaka',
    district: '',
    address: '',
    orderNotes: '',
    paymentMethod: 'Cash on Delivery'
  });

  const deliveryCharge = items.length > 0 ? (formData.division === 'Dhaka' ? 60 : 120) : 0;
  const finalTotal = totalPrice + deliveryCharge;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const orderData = {
        customerName: formData.fullName,
        phone: formData.phone,
        alternativePhone: formData.alternativePhone,
        division: formData.division,
        district: formData.district,
        address: formData.address,
        orderNotes: formData.orderNotes,
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          flavour: item.flavour || null,
          image: item.image
        })),
        totalPrice: finalTotal,
        deliveryCharge,
        paymentMethod: formData.paymentMethod === 'Cash on Delivery' ? 'COD' : formData.paymentMethod,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      navigate(`/order-confirmation/${docRef.id}`);
    } catch (err) {
      console.error("Error creating order: ", err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold text-[var(--color-maroon)] mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-[var(--color-maroon)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-maroon)] focus:border-transparent outline-none transition-shadow" placeholder="e.g. Nusrat Jahan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-maroon)] focus:border-transparent outline-none transition-shadow" placeholder="01XXXXXXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Phone</label>
                  <input type="tel" name="alternativePhone" value={formData.alternativePhone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-maroon)] focus:border-transparent outline-none transition-shadow" placeholder="Optional" />
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-[var(--color-maroon)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Delivery Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Division *</label>
                  <select required name="division" value={formData.division} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-maroon)] focus:border-transparent outline-none transition-shadow bg-white">
                    {DIVISIONS.map(div => <option key={div} value={div}>{div}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                  <input required type="text" name="district" value={formData.district} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-maroon)] focus:border-transparent outline-none transition-shadow" placeholder="e.g. Dhaka" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
                  <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-maroon)] focus:border-transparent outline-none transition-shadow resize-none" placeholder="House, Road, Area..."></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes</label>
                  <textarea name="orderNotes" value={formData.orderNotes} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-maroon)] focus:border-transparent outline-none transition-shadow resize-none" placeholder="Any special instructions for delivery or food preparation?"></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-[var(--color-maroon)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map(method => (
                  <label 
                    key={method} 
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      formData.paymentMethod === method 
                        ? 'border-[var(--color-maroon)] bg-[var(--color-cream)]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={method} 
                      checked={formData.paymentMethod === method} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-[var(--color-maroon)] border-gray-300 focus:ring-[var(--color-maroon)]"
                    />
                    <span className="ml-3 font-medium text-gray-900">{method}</span>
                    {formData.paymentMethod === method && <CheckCircle2 className="ml-auto text-[var(--color-maroon)]" size={20} />}
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[var(--color-maroon)] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-8"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={24} /> Processing...</>
              ) : (
                `Place Order - ৳${finalTotal}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-100 sticky top-24">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={`${item.productId}-${item.flavour}`} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-gray-900">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-gray-600 border-t border-gray-200 pt-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}
