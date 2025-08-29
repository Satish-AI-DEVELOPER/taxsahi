import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gradient mb-4">TaxSahi</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your daily source for breaking news and expert analysis across technology, 
              business, sports, and entertainment. Stay informed with the latest insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Technology</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Business</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sports</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Entertainment</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              {/* <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li> */}
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for news enthusiasts
          </p>
          <p className="mt-2">© 2025 TaxSahi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};