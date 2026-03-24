import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { LogIn, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user is admin
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            navigate('/admin/dashboard');
          } else if (user.email === 'fatamajohora493@gmail.com') {
            // Default admin fallback
            navigate('/admin/dashboard');
          } else {
            setError('You do not have admin privileges.');
            auth.signOut();
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          setError('Failed to verify admin status.');
          auth.signOut();
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Failed to login with Google.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-[var(--color-maroon)]" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-serif">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage orders and products
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[var(--color-maroon)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-maroon)] transition-colors shadow-md"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-white group-hover:text-gray-200" aria-hidden="true" />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
