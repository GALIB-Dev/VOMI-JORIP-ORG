import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ParallaxProvider } from 'react-scroll-parallax';

// Components
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import Loading from './components/common/Loading';
import ErrorFallback from './components/common/ErrorFallback';
import AuthorBio from './components/AuthorBio';
import Legal from './pages/Legal';
// Styles
import './styles/App.css';

// Enhanced page transitions with reduced motion preference
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { 
    duration: 0.3,
    ease: 'easeInOut'
  }
};

// Improved lazy loading with error handling
const lazyLoadWithRetry = (factory) => {
  const Component = lazy(() => 
    factory().catch(error => {
      console.error('Lazy load error:', error);
      throw error;
    })
  );
  return Component;
};

// Lazy loaded components with retry
const Home = lazyLoadWithRetry(() => import('./pages/Home'));
const Market = lazyLoadWithRetry(() => import('./pages/market'));
const About = lazyLoadWithRetry(() => import('./pages/About'));
const Contact = lazyLoadWithRetry(() => import('./pages/Contact'));
const Office = lazyLoadWithRetry(() => import('./pages/office'));
const PropertyForm = lazyLoadWithRetry(() => import('./pages/PropertyForm'));
const GoogleCallback = lazyLoadWithRetry(() => import('./pages/GoogleCallback'));
const MouzaPrice = lazyLoadWithRetry(() => import('./pages/MouzaPrice'));
const Login = lazyLoadWithRetry(() => import('./pages/Login'));

// Route configuration with metadata
const routes = [
  { 
    path: '/', 
    element: Home,
    preload: true,
    meta: { title: 'ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/mouza-price', 
    element: MouzaPrice,
    meta: { title: 'মৌজা মূল্যমান - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/market', 
    element: Market,
    meta: { title: 'বাজার দর - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/about', 
    element: About,
    meta: { title: 'আমাদের সম্পর্কে - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/contact', 
    element: Contact,
    meta: { title: 'যোগাযোগ - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/office', 
    element: Office,
    meta: { title: 'অফিস সমূহ - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/PropertyForm', 
    element: PropertyForm,
    meta: { title: 'সম্পত্তি বিক্রয় ফরম - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/google-callback', 
    element: GoogleCallback,
    meta: { title: 'প্রমাণীকরণ - ভূমি জরিপ উন্নয়ন সংস্থা' },
    skipAnimation: true
  },
  { 
    path: '/about-author', 
    element: AuthorBio,
    meta: { title: 'আেখক পরিচিতি - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/services/legal', 
    element: Legal,
    meta: { title: 'আইনি সেবা - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },

  {
    path: '/login',
    element: Login,
    meta: { title: 'Login - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  
];

// Enhanced loading component with error handling
const DelayedLoading = () => {
  useEffect(() => {
    const timeout = setTimeout(() => NProgress.start(), 300);
    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, []);

  return <Loading />;
};

// Optimized route preloading
const usePreloadRoutes = (currentPath) => {
  useEffect(() => {
    const preloadTimeout = setTimeout(() => {
      const currentIndex = routes.findIndex(route => route.path === currentPath);
      const adjacentRoutes = routes
        .slice(Math.max(0, currentIndex - 1), currentIndex + 2)
        .filter(route => route.path !== currentPath);

      adjacentRoutes.forEach(route => {
        if (route.element.preload) {
          route.element.preload().catch(console.error);
        }
      });
    }, 1000);

    return () => clearTimeout(preloadTimeout);
  }, [currentPath]);
};

// Enhanced error fallback component
const CustomErrorFallback = ({ error }) => {
  useEffect(() => {
    console.error('Error details:', error);
  }, [error]);

  return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
};

// Main App component with single error boundary
function App() {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll with fallback
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      window.scrollTo(0, 0);
    }

    // Update page title
    const currentRoute = routes.find(route => route.path === location.pathname);
    if (currentRoute?.meta?.title) {
      document.title = currentRoute.meta.title;
    }
  }, [location.pathname]);

  usePreloadRoutes(location.pathname);

  return (
    <ErrorBoundary
      FallbackComponent={CustomErrorFallback}
      onReset={() => {
        sessionStorage.clear();
        window.location.reload();
      }}
      onError={(error, errorInfo) => {
        console.error('Application Error:', error);
        console.error('Error Info:', errorInfo);
      }}
    >
      <ParallaxProvider>
        <GoogleOAuthProvider 
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        >
          <div className="App">
            <NavBar />
            <main className="main-content">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={location.pathname}
                  {...pageTransition}
                  className="page-container"
                >
                  <Suspense fallback={<DelayedLoading />}>
                    <Routes location={location}>
                      {routes.map(({ path, element: Element }) => (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <ErrorBoundary
                              FallbackComponent={CustomErrorFallback}
                              onReset={() => window.location.reload()}
                              onError={(error) => {
                                console.error('Route Error:', path, error);
                              }}
                            >
                              <Element />
                            </ErrorBoundary>
                          }
                        />
                      ))}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </GoogleOAuthProvider>
      </ParallaxProvider>
    </ErrorBoundary>
  );
}

// Root component with single error boundary
function AppWithRouter() {
  return (
    <Router>
      <ErrorBoundary
        FallbackComponent={CustomErrorFallback}
        onReset={() => {
          sessionStorage.clear();
          window.location.reload();
        }}
        onError={(error) => {
          console.error('Root Error:', error);
        }}
      >
        <App />
      </ErrorBoundary>
    </Router>
  );
}

export default AppWithRouter;
