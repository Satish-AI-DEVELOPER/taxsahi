import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Image, Video } from 'lucide-react';
import { ArticleFormData } from '@/types/article';

interface ArticleFormProps {
  onSubmit: (article: ArticleFormData) => void;
}

export const ArticleForm = ({ onSubmit }: ArticleFormProps) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    author: '',
    category: 'technology',
    imageUrl: '',
    videoUrl: '',
    tags: [],
    featured: false,
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author) return;
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      content: '',
      author: '',
      category: 'technology',
      imageUrl: '',
      videoUrl: '',
      tags: [],
      featured: false,
    });
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gradient">Create New Article</h2>
        <p className="text-muted-foreground">Share your news and insights with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Article Title *</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter a compelling headline..."
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        {/* Author */}
        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            type="text"
            placeholder="Your name"
            value={formData.author}
            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Article Content *</Label>
          <Textarea
            id="content"
            placeholder="Write your article content here..."
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            required
            rows={8}
          />
        </div>

        {/* Media URLs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Image URL
            </Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video URL
            </Label>
            <Input
              id="videoUrl"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.videoUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              id="tags"
              type="text"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button type="button" onClick={addTag} variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
          />
          <Label htmlFor="featured">Mark as featured article</Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full hero-gradient text-primary-foreground hover:opacity-90">
          Publish Article
        </Button>
      </form>
    </div>
  );
};