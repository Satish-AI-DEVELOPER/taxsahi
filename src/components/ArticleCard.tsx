import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock, User, Play, Star } from 'lucide-react';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
  featured?: boolean;
}

export const ArticleCard = ({ article, onClick, featured = false }: ArticleCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-category-tech text-white',
      business: 'bg-category-business text-white',
      sports: 'bg-category-sports text-white',
      entertainment: 'bg-category-entertainment text-white',
    };
    return colors[category as keyof typeof colors] || 'bg-primary text-primary-foreground';
  };

  return (
    <Card 
      className={`card-hover cursor-pointer overflow-hidden ${featured ? 'featured-bg border-primary/50' : ''}`}
      onClick={() => onClick(article)}
    >
      {article.imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {article.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Play className="w-12 h-12 text-white" />
            </div>
          )}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>
      )}

      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge className={getCategoryColor(article.category)}>
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime} min read
          </div>
        </div>

        <h3 className={`font-bold leading-tight line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
          {article.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {article.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{article.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="w-4 h-4 mr-1" />
            {article.author}
          </div>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};