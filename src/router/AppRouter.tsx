// AppRouter.tsx - Fixed Routing Setup for Hotel/Resort Website
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layout/MainLayout"; // Fixed import
import LoadingSpinner from "../components/loadingspinner/LoadingSpinner";
import NotFound from "../components/error/NotFound";
import AdminRedirect from "../components/redirect/AdminRedirect";

// Lazy load all pages for better performance
const Home = lazy(() => import("../components/pages/Home"));
const About = lazy(() => import("../components/pages/About"));
const Contact = lazy(() => import("../components/pages/Contact"));
const AccommodationPage = lazy(
  () => import("../components/pages/AccommodationPage")
);
const Dining = lazy(() => import("../components/pages/Dining"));
const Events = lazy(() => import("../components/pages/Events"));
const Gallery = lazy(() => import("../components/pages/Gallery"));
const Facilities = lazy(() => import("../components/pages/Facilities"));
const Booking = lazy(() => import("../components/pages/Booking"));
const Destinations = lazy(() => import("../components/pages/Destinations"));

function AppRouter() {
  // Preload critical pages for faster navigation
  setTimeout(() => {
    import("../components/pages/AccommodationPage"); // Most visited after home
    import("../components/pages/Booking"); // Main conversion page
  }, 2000);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <Home />
              </Suspense>
            }
          />

          {/* About Page */}
          <Route
            path="/about"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <About />
              </Suspense>
            }
          />

          {/* Accommodation Page */}
          <Route
            path="/accommodation"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <AccommodationPage />
              </Suspense>
            }
          />

          {/* Dining Page */}
          <Route
            path="/dining"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <Dining />
              </Suspense>
            }
          />

          {/* Events Page */}
          <Route
            path="/events"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <Events />
              </Suspense>
            }
          />

          {/* Gallery Page */}
          <Route
            path="/gallery"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <Gallery />
              </Suspense>
            }
          />

          {/* Facilities Page */}
          <Route
            path="/facilities"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <Facilities />
              </Suspense>
            }
          />

          {/* Booking Page */}
          <Route
            path="/booking"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <Booking />
              </Suspense>
            }
          />

          {/* Destinations Page */}
          <Route
            path="/destinations"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <Destinations />
              </Suspense>
            }
          />

          {/* Contact Page */}
          <Route
            path="/contact"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner
                    fullScreen={true}
                    size="lg"
                    color="gold"
                    backdrop="blur"
                  />
                }
              >
                <Contact />
              </Suspense>
            }
          />

          {/* Admin Redirect Route */}
          <Route
            path="/admin"
            element={<AdminRedirect />}
          />

          {/* 404 Page - Page Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRouter;
