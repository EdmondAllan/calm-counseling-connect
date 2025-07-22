import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
<<<<<<< HEAD
// Replace direct imports with lazy imports for main pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminBookings = lazy(() => import("./components/AdminBookings"));
=======
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import BookingPage from "./pages/BookingPage";
import Contact from "./pages/Contact";
import AdminBookings from "./components/AdminBookings";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CancellationRefund from "./pages/CancellationRefund";
>>>>>>> decc91de34ee4f5d3559c3be0ddd2088d3e653e1

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
<<<<<<< HEAD
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin/bookings" element={<AdminBookings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
=======
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cancellation-refund" element={<CancellationRefund />} />
          <Route path="admin/bookings" element={<AdminBookings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
>>>>>>> decc91de34ee4f5d3559c3be0ddd2088d3e653e1
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
