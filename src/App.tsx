import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import SmoothScroll from "./components/SmoothScroll";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import BackToTop from "./components/BackToTop";

const Index = lazy(() => import("./pages/Index"));
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

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
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
