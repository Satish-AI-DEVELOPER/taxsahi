import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calculator, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const calculatorLinks = [
    "EMI Calculator",
    //"GST Calculator", 
    "Tax Calculator",
   // "Loan Calculator",
    //"SIP Calculator",
    //"Salary Calculator"
  ];

 const resourceLinks = [
  { name: "Financial Tips", slug: "save-tax-2024" },
  { name: "Tax Saving Guide", slug: "save-tax-2024" },
  { name: "Investment Guide", slug: "investing-101" },
  { name: "Budget Planning", slug: "budgeting-basics" },
  { name: "Credit Score Tips", slug: "loan-management" },
  { name: "Loan Guide", slug: "loan-management" }
];

  const companyLinks = [
    "About Us",
    "Contact",
    "Privacy Policy", 
    "Terms of Service",
    "Blog",
    "Help Center"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Stay Updated with Financial Tips
            </h3>
            <p className="text-primary-foreground/80 mb-8">
              Get weekly insights on tax savings, investment tips, and calculator updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Email Subscription Coming soon.
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="financial-icon success-gradient">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">TaxSahi</span>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Your trusted partner for smart financial decisions. Free calculators, 
              expert tips, and latest finance news to help you save money.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 cursor-pointer transition-fast">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 cursor-pointer transition-fast">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 cursor-pointer transition-fast">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 cursor-pointer transition-fast">
                <Linkedin className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Calculators</h4>
            <ul className="space-y-3">
              {calculatorLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
        <div>
  <h4 className="text-lg font-semibold mb-6">Resources</h4>
  <ul className="space-y-3">
    {resourceLinks.map((link, index) => (
      <li key={index}>
        <Link 
          to={`/tips/${link.slug}`} 
          className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
</div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 mb-6">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                hello@taxsahi.com
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +91 XXXXX X3210
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Delhi, India
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm">
              © 2025 TaxSahi. All rights reserved. Made with ❤️ for better financial decisions.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-fast"
              >
                Privacy
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-fast"
              >
                Terms
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-fast"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;