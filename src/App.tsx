import { Suspense } from "react";
import { lazyPage as lazy } from "./lib/lazyPage";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import RouteSeo from "./components/RouteSeo";
import SmoothScroll from "./components/SmoothScroll";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import BackToTop from "./components/BackToTop";

// The homepage loads with the main bundle so first-time visitors never wait on it.
import Index from "./pages/Index";

const Services = lazy(() => import("./pages/Services"));
const ServiceWebsites = lazy(() => import("./pages/services/Websites"));
const ServiceApplications = lazy(() => import("./pages/services/Applications"));
const ServiceSystems = lazy(() => import("./pages/services/Systems"));
const ServiceGraphics = lazy(() => import("./pages/services/Graphics"));
const ServiceSocialMedia = lazy(() => import("./pages/services/SocialMedia"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Pricing = lazy(() => import("./pages/Pricing"));
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// While another page's code loads (usually a split second), keep a quiet blank
// space instead of a spinner so the footer doesn't jump up.
const RouteFallback = () => <div className="min-h-screen" aria-hidden="true" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
        <RouteSeo />
        <SmoothScroll />
        <Navbar />
        <main className="min-h-screen">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/websites" element={<ServiceWebsites />} />
              <Route path="/services/applications" element={<ServiceApplications />} />
              <Route path="/services/systems" element={<ServiceSystems />} />
              <Route path="/services/graphics" element={<ServiceGraphics />} />
              <Route path="/services/social-media" element={<ServiceSocialMedia />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route
                path="/portfolio/elbethel-stationary"
                element={<Navigate to="/portfolio/elbethel-stationery" replace />}
              />
              <Route path="/portfolio/:slug" element={<ProjectCaseStudy />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
