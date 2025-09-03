import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ArticleCard } from '@/components/ArticleCard';

import { AdBanner } from '@/components/AdBanner';
import { Footer } from '@/components/Footer';
import { Article, ArticleFormData } from '@/types/article';
import heroImage from '@/assets/hero-news.jpg';
import { initialArticles as initialArticlesData } from  '@/data/articles';

// initial articles moved to shared data module

const Index = () => {
  const [articles, setArticles] = useState<Article[]>(initialArticlesData);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const handleAddArticle = (formData: ArticleFormData) => {
    const newArticle: Article = {
      id: Date.now().toString(),
      ...formData,
      excerpt: formData.content.substring(0, 150) + '...',
      publishedAt: new Date(),
      readTime: Math.ceil(formData.content.split(' ').length / 200), // Estimate reading time
    };

    setArticles(prev => [newArticle, ...prev]);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === null || article.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, categoryFilter]);

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={setSearchQuery}
        onCategoryFilter={setCategoryFilter}
        onArticleAdd={handleAddArticle}
      />

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img 
              src={heroImage}
              alt="News and insights hero"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 hero-gradient opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="max-w-3xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Latest News & Insights
                </h1>
                <p className="text-xl md:text-2xl opacity-90">
                  Stay informed with breaking news, expert analysis, and trending stories
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Ad Banner */}
        <AdBanner size="large" position="top" />

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gradient">Featured Stories</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Middle Ad Banner */}
        <AdBanner size="medium" position="middle" />

        {/* Regular Articles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} News` : 'Latest Articles'}
          </h2>
          
          {regularArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchQuery || categoryFilter 
                  ? 'No articles found matching your criteria.' 
                  : 'No articles available. Be the first to add one!'}
              </p>
            </div>
          )}
        </section>

        {/* Bottom Ad Banner */}
        <AdBanner size="large" position="bottom" />
      </main>

      <Footer />

    </div>
  );
};

export default Index;