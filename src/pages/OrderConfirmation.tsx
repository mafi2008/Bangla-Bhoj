import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderConfirmation() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-green-100 p-6 rounded-full shadow-sm">
          <CheckCircle size={80} className="text-green-600" />
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4"
      >
        Order Confirmed!
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-gray-600 mb-8"
      >
        Thank you for choosing Bangla Bhoj. Your traditional delicacies are being prepared with love.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 max-w-md mx-auto mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4 text-[var(--color-maroon)]">
          <Package size={24} />
          <h2 className="font-bold text-xl">Order Details</h2>
        </div>
        <p className="text-gray-500 mb-2">Order ID</p>
        <p className="font-mono font-bold text-lg text-gray-900 bg-gray-50 py-2 px-4 rounded-lg inline-block">
          #{id?.slice(0, 8).toUpperCase()}
        </p>
        <p className="text-sm text-gray-500 mt-6">
          We will contact you shortly to confirm the delivery details.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 bg-[var(--color-maroon)] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-colors shadow-md"
        >
          Continue Shopping
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  );
}
