import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, CheckCircle, XCircle, Clock, Search, Package } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if ((userDoc.exists() && userDoc.data().role === 'admin') || user.email === 'fatamajohora493@gmail.com') {
            setIsAdmin(true);
            fetchOrders();
          } else {
            navigate('/admin');
          }
        } catch (err) {
          console.error("Auth check error:", err);
          navigate('/admin');
        }
      } else {
        navigate('/admin');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const fetchOrders = () => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribeOrders = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return unsubscribeOrders;
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update status.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  if (!isAdmin || loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">Loading Dashboard...</div>;
  }

  // Calculate stats
  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const todayOrders = orders.filter(o => {
    if (!o.createdAt) return false;
    const orderDate = o.createdAt.toDate();
    const today = new Date();
    return orderDate.getDate() === today.getDate() &&
           orderDate.getMonth() === today.getMonth() &&
           orderDate.getFullYear() === today.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[var(--color-maroon)] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-serif text-2xl font-bold text-[var(--color-gold)]">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-white/10 text-[var(--color-gold)]' : 'hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-white/10 text-[var(--color-gold)]' : 'hover:bg-white/5'}`}
          >
            <ShoppingBag size={20} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'products' ? 'bg-white/10 text-[var(--color-gold)]' : 'hover:bg-white/5'}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'customers' ? 'bg-white/10 text-[var(--color-gold)]' : 'hover:bg-white/5'}`}
          >
            <Users size={20} /> Customers
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-red-300 hover:text-red-200"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-1">Revenue (Delivered)</p>
              <p className="text-3xl font-bold text-[var(--color-maroon)]">৳{totalRevenue}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-1">Pending Orders</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-1">Today's Orders</p>
              <p className="text-3xl font-bold text-blue-600">{todayOrders}</p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-maroon)]" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm">
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Items</th>
                    <th className="p-4 font-medium">Total</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono text-xs text-gray-500">#{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="p-4">
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-gray-500 text-xs">{order.phone}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-900">{order.items.length} items</p>
                        <p className="text-gray-500 text-xs truncate max-w-[150px]">
                          {order.items.map((i: any) => i.name).join(', ')}
                        </p>
                      </td>
                      <td className="p-4 font-bold text-gray-900">৳{order.totalPrice}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status === 'pending' && <Clock size={12} />}
                          {order.status === 'confirmed' && <CheckCircle size={12} />}
                          {order.status === 'delivered' && <CheckCircle size={12} />}
                          {order.status === 'cancelled' && <XCircle size={12} />}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {order.status === 'pending' && (
                          <button onClick={() => handleStatusChange(order.id, 'confirmed')} className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-lg">Confirm</button>
                        )}
                        {order.status === 'confirmed' && (
                          <button onClick={() => handleStatusChange(order.id, 'delivered')} className="text-green-600 hover:text-green-800 font-medium text-xs bg-green-50 px-3 py-1.5 rounded-lg">Deliver</button>
                        )}
                        {(order.status === 'pending' || order.status === 'confirmed') && (
                          <button onClick={() => handleStatusChange(order.id, 'cancelled')} className="text-red-600 hover:text-red-800 font-medium text-xs bg-red-50 px-3 py-1.5 rounded-lg">Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
