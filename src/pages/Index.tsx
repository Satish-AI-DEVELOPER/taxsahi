import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ArticleCard } from '@/components/ArticleCard';
import { ArticleModal } from '@/components/ArticleModal';
import { AdBanner } from '@/components/AdBanner';
import { Footer } from '@/components/Footer';
import { Article, ArticleFormData } from '@/types/article';
import heroImage from '@/assets/hero-news.jpg';
import usaind from '@/assets/India-USA-Tariff.png';
import thunder from '@/assets/thunderbolts-marvel-poster.jpg';
import balKarve from '@/assets/veteran-marathi-actor-bal-karve-passes-away.jpg';
import war2 from '@/assets/war-2.jpg';
import yash_Nayanthara from '@/assets/Yash_Nayanthara.jpg';
import AI_Enabled from '@/assets/AI-Enabled-Search.jpg';
import India_Shines from '@/assets/India-Shines.jpg';

<head>
  <meta name="google-adsense-account" content="ca-pub-4172536925110639"></meta>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4172536925110639"
     crossOrigin="anonymous"></script>
</head>
// Sample initial articles for demonstration
const initialArticles: Article[] = [
  {
    id: '1',
    title: "Tariff Tensions 2025: How India–US Trade Is Shifting",
    content: `In 2025, the economic relationship between India and the United States is entering a crucial phase, marked by both cooperation and contention. The two nations, long seen as strategic partners in global trade, are experiencing renewed tensions due to evolving tariff policies. Washington has expressed concerns over India’s protective measures in key sectors such as electronics, pharmaceuticals, and agriculture, arguing that these restrictions create trade imbalances. On the other hand, New Delhi contends that such measures are necessary to safeguard domestic industries, support “Make in India” initiatives, and reduce dependency on foreign imports.

The introduction of higher tariffs on steel, aluminum, and select IT products has triggered diplomatic negotiations,
 with both sides seeking common ground while safeguarding national interests. 
 The U.S. business lobby continues to press for greater market access in India, while Indian exporters demand fair treatment 
 in American markets. Despite these challenges, trade volumes between the two countries remain robust,
  reflecting their mutual dependence in technology, services, and energy. Analysts predict that while short-term frictions may persist,
   long-term cooperation is likely to strengthen as both nations recognize the strategic value of their partnership.

Ultimately, the tariff tensions of 2025 highlight the delicate balance between protectionism and globalization.
 India and the U.S. must navigate these challenges carefully, ensuring that policy decisions foster growth without undermining trust. 
 The trajectory of their trade relations will not only shape bilateral ties but also influence global economic dynamics in an era of 
 shifting alliances and emerging trade blocs.`,
  excerpt: "Explore the latest 50% U.S. tariffs on Indian exports, sectoral impacts, ripple effects on both economies, and strategic responses from India.",
    author: 'TaxSahi Editor',
    category: 'business',
    imageUrl: usaind,
    tags: ["Tariffs", "India", "USA", "Trade", "Economy", "Exports", "Inflation","Trade Policy","Trump","Modi","50% Tariffs"],
    publishedAt: new Date('2025-08-27'),
    readTime: 5,
    featured: true,
  },
  {
    id: '2',
    title: 'Global Markets React to New Economic Policies',
    content: `Financial markets worldwide have shown significant movement following the announcement of new economic policies by major central banks. The coordinated approach aims to address inflation concerns while maintaining economic growth.

Investors are closely monitoring the situation as these policy changes could have far-reaching implications for global trade and investment strategies. Market analysts predict continued volatility in the coming weeks.

The new policies focus on:
- Interest rate adjustments
- Quantitative easing measures
- Currency stabilization efforts
- Trade regulation reforms

Economic experts suggest that these measures, while necessary, will require careful implementation to avoid unintended consequences in emerging markets.`,
    excerpt: 'Markets respond to new economic policies as central banks coordinate efforts to balance inflation control with sustained growth.',
    author: 'TaxSahi Editor',
    category: 'business',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    tags: ['Economics', 'Markets', 'Policy', 'Finance'],
    publishedAt: new Date('2025-08-14'),
    readTime: 4,
  },
  {
    id: '3',
    title: 'Championship Finals Set Record Viewership',
    content: `The highly anticipated championship finals broke all previous viewership records, attracting millions of viewers worldwide. The thrilling match showcased exceptional athletic performance and sportsmanship.

Both teams demonstrated remarkable skill and determination throughout the competition, making it one of the most memorable finals in recent history. The event's success highlights the growing global interest in professional sports.

Fan engagement reached unprecedented levels across social media platforms, with real-time discussions and analysis trending worldwide. This level of audience participation reflects the evolving nature of sports entertainment in the digital age.`,
    excerpt: 'Record-breaking viewership for championship finals as global audiences witness exceptional athletic performance and competition.',
    author: 'Emma Thompson',
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    tags: ['Sports', 'Championship', 'Records', 'Entertainment'],
    publishedAt: new Date('2024-01-13'),
    readTime: 3,
  },
  {
  id: '4',
  title: "Marvel’s Thunderbolts Blasts Onto Disney+ as Most Watched US Movie in a Day",
  content: `Just one day into its streaming debut, Disney+’s new film “Thunderbolts” has raced to the top, earning the title of the platform’s most-watched movie in the United States—and it’s now the third most popular film globally.`,
  excerpt: 'Disney+’s “Thunderbolts” debuts as the platform’s most-watched movie in the U.S. and lands third globally after just one day.',
  author: 'TaxSahi Editor',
  category: 'entertainment',
  imageUrl: thunder,
  tags: ['DisneyPlus', 'Streaming', 'Movies', 'Trending'],
  publishedAt: new Date(),
  readTime: 2,
},
{
  id: '5',
  title: "Bollywood Releases This August: 'Dhadak 2', 'War 2' and More",
  content: `August 2025 promises a thrilling lineup of Bollywood releases. Fans are eagerly awaiting major blockbusters like "War 2", "Dhadak 2", and other exciting titles across action, romance, comedy, and drama genres.`,
  excerpt: 'Bollywood round-up: Big theatrical releases this August include "War 2", "Dhadak 2", and more.',
  author: 'Bollywood Reporter',
  category: 'entertainment',
  imageUrl: war2,
  tags: ['Bollywood', 'Movies', 'New Releases', 'Cinema'],
  publishedAt: new Date(),
  readTime: 3,
},
{
  id: '6',
  title: "Marathi Actor Bal Karve Passes Away at 95",
  content: `Veteran Marathi actor Bal Karve, beloved for his role as Gundyabhau in the hit TV serial "Chimanrao", passed away peacefully at age 95 at his Mumbai residence. Known for his long-standing contributions to Marathi theatre and television, he is mourned by multiple generations of fans.`,
  excerpt: 'Marathi actor Bal Karve, famous for his “Gundyabhau” role in "Chimanrao", passes away at 95.',
  author: 'Regional Entertainment',
  category: 'entertainment',
  imageUrl: balKarve,
  tags: ['Marathi', 'Obituary', 'Television', 'Entertainment'],
  publishedAt: new Date(),
  readTime: 2,
},
{
  id: '7',
  title: "Star-Studded Bollywood Flick 'Toxic' Builds Buzz with Yash, Nayanthara, and More",
  content: `The highly anticipated Bollywood film "Toxic" directed by Geetu Mohandas is creating waves. Featuring a powerhouse ensemble cast—including Yash, Nayanthara, Kiara Advani, Tara Sutaria, Huma Qureshi, Rukmini Vasanth, and Akshay Oberoi—the film generated excitement when Akshay praised co-star Yash as a “one-man show.”`,
  excerpt: 'Bollywood’s “Toxic” builds buzz with an all-star cast and praise from Akshay Oberoi calling Yash a “one-man show.”',
  author: 'Bollywood Editor',
  category: 'entertainment',
  imageUrl: yash_Nayanthara,
  tags: ['Bollywood', 'Toxic', 'Yash', 'Nayanthara', 'Movies'],
  publishedAt: new Date(),
  readTime: 3,
},
{
  id: '8',
  title: "AI-Enabled Search Tech Becomes the New Competitive Differentiator",
  content: `In today’s fast-paced digital landscape, AI-enabled search technology is emerging as a game-changer. As businesses navigate vast datasets across domains, these systems empower teams to discover critical insights instantly — not in hours, but in seconds. This shift is revolutionizing operations, informing decision-making, and enabling real-time strategic advantage. Companies leveraging AI-powered search are seeing enhanced productivity, faster time-to-insight, and stronger innovation performance. With Elastic leading the charge, this trend is reshaping how organizations think about information retrieval and competitive agility.`,
  excerpt: 'AI-enabled search is transforming business intelligence — delivering actionable insights in seconds and redefining competitive edge.',
  author: 'Tech Innovation Desk',
  category: 'technology',
  imageUrl: AI_Enabled,
  tags: ['AI', 'Search', 'Business Intelligence', 'Elastic', 'Innovation'],
  publishedAt: new Date(),
  readTime: 4,
},
{
  id: '9',
  title: "India Shines: 6 Cities Rated Top Global Tech Talent Hubs in 2025",
  content: `A new report from Colliers highlights a remarkable trend: six Indian cities rank among the top ten global markets for tech talent in 2025 — four of which are in the top five. While the U.S. continues to dominate with 14 cities on the list, India’s concentrated presence underscores its growing importance in the global technology ecosystem. This shift reflects booming demand for skilled developers, data scientists, and AI specialists, and sets the stage for outsourcing, startup growth, and global collaboration. As India cements its position as a tech powerhouse, businesses worldwide are taking notice and recalibrating their talent strategies.`,
  excerpt: 'Colliers’ 2025 report ranks six Indian cities among the top 10 global tech talent markets, signaling India’s growing tech dominance.',
  author: 'The Indian Express',
  category: 'technology',
  imageUrl: India_Shines,
  tags: ['India', 'Tech Talent', 'Global Markets', 'Colliers Report', '2025 Trends'],
  publishedAt: new Date(),
  readTime: 3,
}


];

const Index = () => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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
                  onClick={setSelectedArticle}
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
                  onClick={setSelectedArticle}
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

      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};

export default Index;
