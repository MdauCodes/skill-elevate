/**
 * Mwanzo Skills Campus - Main Application Router
 * 
 * This file configures all routes for the application.
 * 
 * @backend Integration Notes:
 * - All API calls should be made to the base URL configured in environment variables
 * - Authentication tokens should be included in Authorization header
 * - Use the AuthContext for managing user session state
 * 
 * @see /docs/API.md for complete API documentation
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Page imports - Core pages
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Learn from "./pages/Learn";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Page imports - Business pages
import BusinessRegister from "./pages/BusinessRegister";
import BusinessDashboard from "./pages/BusinessDashboard";
import PostJob from "./pages/PostJob";
import ViewApplicants from "./pages/ViewApplicants";

// Page imports - Tutor pages
import TutorDetail from "./pages/TutorDetail";
import BecomeTutor from "./pages/BecomeTutor";
import TutorResources from "./pages/TutorResources";

// Page imports - Company pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";

// Page imports - Support pages
import Help from "./pages/Help";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";

// Page imports - Legal pages
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Page imports - Business solutions
import Enterprise from "./pages/Enterprise";

// Page imports - Error pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Main App Component
 * 
 * Provides global context providers and routing configuration.
 * 
 * @backend Integration:
 * - QueryClient handles API request caching and state management
 * - AuthProvider manages user authentication state
 * - All routes can access auth state via useAuth() hook
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            
            {/* Course Routes */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/learn/:courseId" element={<Learn />} />
            
            {/* Job Routes */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            
            {/* Business Routes */}
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/business/register" element={<BusinessRegister />} />
            <Route path="/business/post-job" element={<PostJob />} />
            <Route path="/business/jobs/:jobId/applicants" element={<ViewApplicants />} />
            
            {/* Tutor Routes */}
            <Route path="/tutors" element={<Courses />} />
            <Route path="/tutors/:id" element={<TutorDetail />} />
            <Route path="/become-tutor" element={<BecomeTutor />} />
            <Route path="/tutor-resources" element={<TutorResources />} />
            <Route path="/tutor-earnings" element={<Dashboard />} />
            
            {/* Company Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            
            {/* Support Pages */}
            <Route path="/help" element={<Help />} />
            <Route path="/help/*" element={<Help />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            
            {/* Legal Pages */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Business Solutions */}
            <Route path="/enterprise" element={<Enterprise />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
