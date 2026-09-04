import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        //  ប្រើ fetch ជាមួយ credentials
        const res = await fetch("http://localhost/api/check_auth.php", {
          credentials: "include"
        });
        const data = await res.json();
        
        if (data.authenticated && data.user.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, []);
  
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!isAdmin) return <Navigate to="/" />;
  
  return children;
}

export default ProtectedRoute;