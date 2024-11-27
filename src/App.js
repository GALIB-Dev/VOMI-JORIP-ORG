import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
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
      return import('./components/common/ErrorFallback');
    })
  );
  Component.preload = factory;
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

// Route configuration with metadata
const routes = [
  { 
    path: '/', 
    element: Home,
    preload: true,
    meta: { title: 'Home - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/market', 
    element: Market,
    meta: { title: 'Market - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/about', 
    element: About,
    meta: { title: 'About - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/contact', 
    element: Contact,
    meta: { title: 'Contact - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/office', 
    element: Office,
    meta: { title: 'Office - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/PropertyForm', 
    element: PropertyForm,
    meta: { title: 'Property Form - ভূমি জরিপ উন্নয়ন সংস্থা' }
  },
  { 
    path: '/google-callback', 
    element: GoogleCallback,
    meta: { title: 'Authentication - ভূমি জরিপ উন্নয়ন সংস্থা' },
    skipAnimation: true
  }
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

// Main App component with improved error handling
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
    <ParallaxProvider>
      <GoogleOAuthProvider 
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || "523803568624-4k11ovb16jneppjaclsksjcr52umh7jh.apps.googleusercontent.com"}
      >
        <div className="App">
          <ErrorBoundary 
            FallbackComponent={ErrorFallback}
            onReset={() => {
              sessionStorage.clear();
              window.location.reload();
            }}
            onError={(error) => {
              console.error('App Error:', error);
            }}
          >
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
                              FallbackComponent={ErrorFallback}
                              onReset={() => window.location.reload()}
                              onError={(error) => {
                                console.error('Route Error:', error);
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
          </ErrorBoundary>
        </div>
      </GoogleOAuthProvider>
    </ParallaxProvider>
  );
}

// Root component with error boundary
function AppWithRouter() {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => {
        sessionStorage.clear();
        window.location.reload();
      }}
      onError={(error) => {
        console.error('Root Error:', error);
      }}
    >
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  );
}

export default AppWithRouter;
