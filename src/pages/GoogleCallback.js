import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('access_token');
        
        if (token) {
          localStorage.setItem('google_access_token', token);
          
          // Clear any stale data
          localStorage.removeItem('pending_upload');
          
          navigate('/PropertyForm', { 
            state: { 
              authSuccess: true,
              message: 'Google অনুমোদন সফল হয়েছে' 
            },
            replace: true
          });
        } else {
          throw new Error('No access token received');
        }
      } catch (error) {
        console.error('Callback error:', error);
        toast.error('Google অনুমোদন ব্যর্থ হয়েছে');
        navigate('/PropertyForm', { 
          state: { 
            authError: true,
            message: 'অনুমোদন ব্যর্থ হয়েছে' 
          },
          replace: true
        });
      }
    };

    handleCallback();

    // Cleanup function
    return () => {
      // Clear any temporary storage if needed
    };
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Processing Google Authentication</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default GoogleCallback; 