import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, Play, ExternalLink } from 'lucide-react';
import { Article } from '@/types/article';
import { Button } from '@/components/ui/button';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {
  if (!article) return null;

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-category-tech text-white',
      business: 'bg-category-business text-white',
      sports: 'bg-category-sports text-white',
      entertainment: 'bg-category-entertainment text-white',
    };
    return colors[category as keyof typeof colors] || 'bg-primary text-primary-foreground';
  };

  const formatVideoUrl = (url: string) => {
    // Convert YouTube URLs to embed format
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={getCategoryColor(article.category)}>
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} min read
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold leading-tight">
              {article.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article Meta */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Video */}
          {article.videoUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Featured Video
                </h4>
                <Button variant="outline" size="sm" asChild>
                  <a href={article.videoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Original
                  </a>
                </Button>
              </div>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  src={formatVideoUrl(article.videoUrl)}
                  title="Article Video"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="space-y-2 border-t pt-4">
              <h4 className="font-medium">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Article Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": article.title,
                "description": article.excerpt,
                "author": {
                  "@type": "Person",
                  "name": article.author
                },
                "datePublished": article.publishedAt.toISOString(),
                "dateModified": article.publishedAt.toISOString(),
                "publisher": {
                  "@type": "Organization",
                  "name": "NewsHub",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://newshub.lovable.app/logo.png"
                  }
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://newshub.lovable.app/article/${article.id}`
                },
                "image": article.imageUrl || "https://newshub.lovable.app/og-image.jpg",
                "keywords": article.tags.join(", ")
              })
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};