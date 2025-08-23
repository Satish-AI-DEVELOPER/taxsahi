import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CalculatorTools from "@/components/CalculatorTools";
import FinancialTips from "@/components/FinancialTips";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
  

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      else {
        window.scrollTo(0, 0); // Fallback if element not found
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CalculatorTools />
        <FinancialTips />
      </main>
      <Footer />
    </div>
  );
};

export default Index;