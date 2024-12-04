import React, { Suspense } from 'react';

const HeavyComponent = React.lazy(() => import('./components/HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
} 