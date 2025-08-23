import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-financial.jpg";
import { Link } from "react-router-dom";

//const navigate = useNavigate();

const Hero = () => {
  const navigate = useNavigate();
  const stats = [
    { icon: Calculator, label: "Free Calculators", value: "10+" },
    { icon: Users, label: "Happy Users", value: "50K+" },
    { icon: TrendingUp, label: "Money Saved", value: "₹1Cr+" },
    { icon: Shield, label: "Trusted Since", value: "2025" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Smart Financial
            <span className="block text-accent-glow">Calculators</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            Free EMI, GST, and loan calculators with expert financial tips. 
            Make smarter money decisions and save thousands on taxes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-fast text-lg px-8 py-6"
                onClick={() => navigate("/calculators/emi")}
            >
              Try EMI Calculator
            </Button>
              <a href="#calculators">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 transition-fast text-lg px-8 py-6"
            >
              View All Tools
            </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};

export default Hero;