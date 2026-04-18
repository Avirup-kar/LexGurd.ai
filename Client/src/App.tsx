import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Layout from "./pages/Layout.tsx";
import History from "./components/Dashboard/History.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Settings from "./components/Dashboard/Settings.tsx";
import ProjectPreview from "./components/Dashboard/ProjectPreview.tsx";
import { ClerkProvider } from '@clerk/react'
import ProtectedRoute from "./components/Dashboard/ProtectedRoute.tsx";
import Login from "./components/HeropageCom/Login.tsx";

const queryClient = new QueryClient();
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/project/:projectId" element={<ProtectedRoute><ProjectPreview /></ProtectedRoute>} />
          <Route
           path="/dashboard"
           element={
             <ProtectedRoute>
               <Layout />
             </ProtectedRoute>
           }
          >
             <Route index element={<Dashboard/>} />
             <Route path='history' element={<History/>} />
             <Route path='settings' element={<Settings/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ClerkProvider>
  </QueryClientProvider>
);

export default App;
