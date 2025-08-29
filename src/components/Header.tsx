import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle, Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArticleForm } from './ArticleForm';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string | null) => void;
  onArticleAdd: (article: any) => void;
}

export const Header = ({ onSearch, onCategoryFilter, onArticleAdd }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All', color: 'primary' },
    { id: 'technology', label: 'Tech', color: 'category-tech' },
    { id: 'business', label: 'Business', color: 'category-business' },
    { id: 'sports', label: 'Sports', color: 'category-sports' },
    { id: 'entertainment', label: 'Entertainment', color: 'category-entertainment' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleArticleSubmit = (article: any) => {
    onArticleAdd(article);
    setIsDialogOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gradient">TaxSahi</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryFilter(category.id === 'all' ? null : category.id)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {category.label}
              </button>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </form>

            {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="hero-gradient text-primary-foreground hover:opacity-90">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ArticleForm onSubmit={handleArticleSubmit} />
              </DialogContent>
            </Dialog> */}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
            <nav className="flex flex-col space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryFilter(category.id === 'all' ? null : category.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};