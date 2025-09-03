import { useParams, Navigate } from "react-router-dom";
import { Clock, User, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { formatDistanceToNow } from "date-fns";
import { initialArticles as initialArticlesData, slugify } from "@/data/articles";

// Articles are now sourced from shared data module

const getCategoryColor = (category: string) => {
  const colors = {
    technology: "bg-blue-100 text-blue-800",
    business: "bg-green-100 text-green-800", 
    sports: "bg-orange-100 text-orange-800",
    entertainment: "bg-purple-100 text-purple-800"
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const formatVideoUrl = (url: string) => {
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find article by slug (in real app, this would be an API call)
  const article = initialArticlesData.find((a) => slugify(a.title) === slug);

  if (!article) {
    return <Navigate to="/404" replace />;
  }


  const currentUrl = `${window.location.origin}/article/${slug}`;

  return (
    <>
      <Header 
        onSearch={() => {}}
        onCategoryFilter={() => {}}
        onArticleAdd={() => {}}
      />
      <main className="min-h-screen bg-background">
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              {article.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-foreground">{article.title}</h1>
            
            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(article.publishedAt)} ago</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image or Video */}
          {(article as any).videoUrl ? (
            <div className="mb-8">
              <iframe
                src={formatVideoUrl((article as any).videoUrl)}
                title={article.title}
                className="w-full aspect-video rounded-lg"
                allowFullScreen
              />
            </div>
          ) : article.imageUrl ? (
            <div className="mb-8">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          ) : null}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Back to Home Button */}
          <div className="pt-8 border-t">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="mr-4"
            >
              ← Back
            </Button>
          </div>
        </article>
      </main>
      <Footer />

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "image": article.imageUrl,
            "author": {
              "@type": "Person",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "NewsHub"
            },
            "datePublished": article.publishedAt.toISOString(),
            "dateModified": article.publishedAt.toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            }
          })
        }}
      />
    </>
  );
};

export default ArticlePage;