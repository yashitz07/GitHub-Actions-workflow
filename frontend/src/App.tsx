
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SetupWizard from "./pages/SetupWizard";
import Demo from "./pages/Demo";
import Customization from "./pages/Customization";
import FAQ from "./pages/FAQ";
import Contribute from "./pages/Contribute";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/setup" element={<SetupWizard />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/customization" element={<Customization />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
