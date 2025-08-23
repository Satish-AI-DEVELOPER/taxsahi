import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TipDetail from "./pages/tips/TipDetail";
import NotFound from "./pages/NotFound";
import EMICalculator from "./pages/calculators/EMICalculator";
import GSTCalculator from "./pages/calculators/GSTCalculator";
import TaxCalculator from "./pages/calculators/TaxCalculator";
import SIPCalculator from "./pages/calculators/SIPCalculator";
import LoanCalculator from "./pages/calculators/LoanCalculator";
import SalaryCalculator from "./pages/calculators/SalaryCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculators/emi" element={<EMICalculator />} />
          <Route path="/calculators/gst" element={<GSTCalculator />} />
          <Route path="/calculators/tax" element={<TaxCalculator />} />
          <Route path="/calculators/sip" element={<SIPCalculator />} />
          <Route path="/calculators/loan" element={<LoanCalculator />} />
          <Route path="/calculators/salary" element={<SalaryCalculator />} />
          <Route path="/tips/:slug" element={<TipDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
