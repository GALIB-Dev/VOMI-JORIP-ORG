import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import Loading from './components/common/Loading';
import ErrorFallback from './components/common/ErrorFallback';

// Styles
import './styles/App.css';

// Enhanced page transitions
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { 
    duration: 0.4, 
    ease: [0.645, 0.045, 0.355, 1.000],
    staggerChildren: 0.1
  }
};

// Lazy loaded pages with enhanced loading strategy
const lazyLoadWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

const Home = lazyLoadWithPreload(() => import('./pages/Home'));
const Market = lazyLoadWithPreload(() => import('./pages/market'));
const About = lazyLoadWithPreload(() => import('./pages/About'));
const Contact = lazyLoadWithPreload(() => import('./pages/Contact'));
const Office = lazyLoadWithPreload(() => import('./pages/office'));
const PropertyForm = lazyLoadWithPreload(() => import('./pages/PropertyForm'));
const GoogleCallback = lazyLoadWithPreload(() => import('./pages/GoogleCallback'));

// Enhanced route configuration with meta data
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

// Enhanced loading component with progress bar
const DelayedLoading = () => {
  useEffect(() => {
    NProgress.start();
    return () => NProgress.done();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Loading />
    </motion.div>
  );
};

// Preload adjacent routes
const usePreloadRoutes = (currentPath) => {
  useEffect(() => {
    const currentIndex = routes.findIndex(route => route.path === currentPath);
    const adjacentRoutes = routes
      .slice(Math.max(0, currentIndex - 1), currentIndex + 2)
      .filter(route => route.path !== currentPath);

    adjacentRoutes.forEach(route => {
      route.element.preload?.();
    });
  }, [currentPath]);
};

function App() {
  const location = useLocation();

  // Enhanced scroll behavior
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Update page title
    const currentRoute = routes.find(route => route.path === location.pathname);
    if (currentRoute?.meta?.title) {
      document.title = currentRoute.meta.title;
    }
  }, [location.pathname]);

  // Preload adjacent routes
  usePreloadRoutes(location.pathname);

  return (
    <GoogleOAuthProvider 
      clientId="523803568624-4k11ovb16jneppjaclsksjcr52umh7jh.apps.googleusercontent.com"
    >
      <div className="App">
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <NavBar />
          <main className="main-content">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                {...(routes.find(r => r.path === location.pathname)?.skipAnimation 
                  ? {} 
                  : pageTransition)}
                className="page-container"
              >
                <Suspense fallback={<DelayedLoading />}>
                  <Routes location={location}>
                    {routes.map(({ path, element: Element, meta }) => (
                      <Route
                        key={path}
                        path={path}
                        element={
                          <ErrorBoundary 
                            FallbackComponent={ErrorFallback}
                            onReset={() => window.location.reload()}
                          >
                            <Element />
                          </ErrorBoundary>
                        }
                      />
                    ))}
                    <Route 
                      path="*" 
                      element={<Navigate to="/" replace />} 
                    />
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
  );
}

// Enhanced error boundary wrapper
function AppWithErrorBoundary() {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  );
}

export default AppWithErrorBoundary;
