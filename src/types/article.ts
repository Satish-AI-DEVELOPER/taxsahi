export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: 'technology' | 'business' | 'sports' | 'entertainment';
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  publishedAt: Date;
  readTime: number;
  featured?: boolean;
}

export interface ArticleFormData {
  title: string;
  content: string;
  author: string;
  category: Article['category'];
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  featured?: boolean;
}