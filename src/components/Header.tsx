import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Calculator, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const navigation = [
  { name: "Home", to: "/" },
  { name: "Calculators", to: "/#calculators" },
  { name: "Tips", to: "/#tips" },
  { name: "News", to: "/#news" },
];
  // const navigation = [
  //   { name: "Home", href: "#home" },
  //   { name: "Calculators", href: "#calculators" },
  //   { name: "Tips", href: "#tips" },
  //   { name: "News", href: "#news" },
  // ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
              <Link to="/"
                onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>
            <div className="financial-icon primary-gradient">
              <Calculator className="w-6 h-6" />
            </div>
            </Link>
            <Link to="/"
             onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    >
            <span className="text-xl font-bold text-foreground">TaxSahi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-foreground hover:text-primary transition-fast"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="primary-gradient text-primary-foreground hover:opacity-90 transition-fast">
              Start Calculating
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-foreground hover:text-primary transition-fast"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="primary-gradient text-primary-foreground w-full mt-4">
                Start Calculating
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;