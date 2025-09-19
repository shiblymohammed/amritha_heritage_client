import React, { Suspense } from 'react';

// Import shared layout components
import NavBar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Import the loading spinner for Suspense fallback
import LoadingSpinner from '../components/loadingspinner/LoadingSpinner';

// Import cart components
import { CartProvider } from '../contexts/CartContext';
import StickyCart from '../components/cart/StickyCart';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout - A performant and structured layout for the application.
 *
 * This component establishes the primary visual structure (NavBar, content, Footer)
 * and integrates React.Suspense for optimized page loading.
 *
 * Key Optimizations:
 * 1.  **Sticky Footer:** Uses a flexbox strategy (`min-h-screen`, `flex-grow`) to ensure
 * the footer always stays at the bottom of the viewport, even on pages with little content.
 *
 * 2.  **Suspense Integration:** The `children` (which will be your page components from the router)
 * are wrapped in `<Suspense>`. This allows the layout to handle the loading state of
 * lazy-loaded pages automatically.
 *
 * 3.  **Centralized Loading UI:** By providing a `fallback` to `Suspense`, we show a consistent
 * `LoadingSpinner` across the entire application during page transitions, improving
 * the user's perceived performance.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {/* Header section with the Navbar */}
        <header>
          <NavBar />
        </header>

        {/* Main content area that grows to fill available space */}
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </main>

        {/* Footer section */}
        <footer>
          <Footer />
        </footer>

        {/* Sticky Cart Component */}
        <StickyCart />
      </div>
    </CartProvider>
  );
};

export default MainLayout;
