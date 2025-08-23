import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, BookmarkPlus, Share2, ThumbsUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const tipsData = [
  {
    slug: "save-tax-2024",
    title: "10 Smart Ways to Save Tax in 2024",
    category: "Tax Planning",
    readTime: "8 min read",
    author: "TaxSahi.com",
    publishDate: "Aug 20, 2025",
    views: "12.5K",
    likes: 234,
    difficulty: "Beginner",
    tags: ["Tax", "Savings", "Investment", "2025"],
    excerpt: "Discover proven strategies to maximize your tax savings this year with these actionable tips.",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Tax planning is crucial for financial health. Here are 10 proven strategies to help you save significantly on taxes in 2024:</p>
        
        <div class="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-l-4 border-blue-500">
          <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Pro Tip</h3>
          <p class="text-blue-800 dark:text-blue-200">Start planning early in the financial year to maximize your tax savings potential.</p>
        </div>

        <ol class="space-y-4">
          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</span>
            <div>
              <h4 class="font-semibold mb-2">Maximize Section 80C Investments</h4>
              <p>Invest up to ₹1.5 lakh in ELSS, PPF, NPS, and life insurance to get tax deductions. ELSS offers the dual benefit of tax savings and wealth creation.</p>
            </div>
          </li>
          
          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</span>
            <div>
              <h4 class="font-semibold mb-2">Claim HRA Effectively</h4>
              <p>If you live in a rented house, claim HRA even if your parents own the property. This can save thousands in taxes.</p>
            </div>
          </li>

          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</span>
            <div>
              <h4 class="font-semibold mb-2">Health Insurance Premiums</h4>
              <p>Claim up to ₹25K for health insurance under Section 80D. Additional ₹50K for parents above 60 years.</p>
            </div>
          </li>

          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</span>
            <div>
              <h4 class="font-semibold mb-2">Home Loan Interest Deduction</h4>
              <p>Claim up to ₹2 lakh interest on home loans under Section 24. For first-time buyers, additional ₹1.5 lakh under Section 80EEA.</p>
            </div>
          </li>

          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">5</span>
            <div>
              <h4 class="font-semibold mb-2">Charitable Donations</h4>
              <p>Donate to approved charities and claim 50-100% deduction under Section 80G. Choose institutions with 80G certification.</p>
            </div>
          </li>

          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">6</span>
            <div>
              <h4 class="font-semibold mb-2">Education Loan Interest</h4>
              <p>Claim full interest paid on education loans without any upper limit under Section 80E for up to 8 years.</p>
            </div>
          </li>

          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">7</span>
            <div>
              <h4 class="font-semibold mb-2">New vs Old Tax Regime</h4>
              <p>Calculate benefits for both regimes. New regime offers lower rates but fewer deductions. Choose based on your investment pattern.</p>
            </div>
          </li>

          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">8</span>
            <div>
              <h4 class="font-semibold mb-2">Maintain Proper Documentation</h4>
              <p>Keep all receipts, certificates, and proof of investments. Digital records are acceptable but ensure they're backed up.</p>
            </div>
          </li>

          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">9</span>
            <div>
              <h4 class="font-semibold mb-2">Strategic Investment Timing</h4>
              <p>Don't wait until March. Spread investments throughout the year for better returns and systematic planning.</p>
            </div>
          </li>

          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">10</span>
            <div>
              <h4 class="font-semibold mb-2">Professional Tax Consultation</h4>
              <p>Hire a qualified CA for complex scenarios. The consultation fee is often offset by additional savings they identify.</p>
            </div>
          </li>
        </ol>

        <div class="bg-green-50 dark:bg-green-950 p-6 rounded-lg border-l-4 border-green-500">
          <h3 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Quick Action Items</h3>
          <ul class="text-green-800 dark:text-green-200 space-y-1">
            <li>• Calculate your taxable income</li>
            <li>• List all eligible deductions</li>
            <li>• Choose optimal tax regime</li>
            <li>• Plan remaining investments</li>
          </ul>
        </div>
      </div>
    `,
  },
  {
    slug: "budgeting-basics",
    title: "Budgeting Basics for Beginners",
    category: "Personal Finance",
    readTime: "6 min read",
    author: "TaxSahi.com",
    publishDate: "Aug 20, 2025",
    views: "8.2K",
    likes: 156,
    difficulty: "Beginner",
    tags: ["Budget", "Planning", "Savings", "Beginner"],
    excerpt: "Master the fundamentals of budgeting with this comprehensive beginner's guide.",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Budgeting is the cornerstone of financial success. Learn how to take control of your money with these proven strategies.</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
            <h3 class="font-semibold mb-4">50/30/20 Rule</h3>
            <ul class="space-y-2">
              <li>50% - Needs (rent, groceries, utilities)</li>
              <li>30% - Wants (entertainment, dining out)</li>
              <li>20% - Savings & debt repayment</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg">
            <h3 class="font-semibold mb-4">Zero-Based Budgeting</h3>
            <p>Assign every rupee a purpose. Income minus expenses should equal zero.</p>
          </div>
        </div>

        <p>Start by tracking your expenses for a month, identify spending patterns, and set realistic goals. Use apps like Mint, YNAB, or simple spreadsheets to stay organized.</p>
      </div>
    `,
  },
  {
    slug: "investing-101",
    title: "Investing 101: Getting Started",
    category: "Investment",
    readTime: "10 min read",
    author: "Investment Advisor",
    publishDate: "Aug 20, 2025",
    views: "15.3K",
    likes: 289,
    difficulty: "Intermediate",
    tags: ["Investment", "Stocks", "Mutual Funds", "Beginner"],
    excerpt: "Your complete guide to starting your investment journey with confidence.",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Investing is your pathway to wealth creation. Here's everything you need to know to get started on the right foot.</p>
        
        <div class="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Important</h3>
          <p class="text-yellow-800 dark:text-yellow-200">Never invest money you can't afford to lose. Start with small amounts and gradually increase as you gain confidence.</p>
        </div>

        <h3 class="text-xl font-semibold">Investment Options for Beginners</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">Mutual Funds</h4>
            <p class="text-sm">Professional management, diversification, low minimum investment</p>
          </div>
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">Index Funds</h4>
            <p class="text-sm">Low cost, market returns, passive investment strategy</p>
          </div>
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold mb-2">SIP</h4>
            <p class="text-sm">Systematic investing, rupee cost averaging, disciplined approach</p>
          </div>
        </div>

        <p>Remember: Time in the market beats timing the market. Start early, stay consistent, and let compound interest work its magic!</p>
      </div>
    `,
  },
];

const TipDetail = () => {
  const { slug } = useParams();
  const tip = tipsData.find((t) => t.slug === slug);

  if (!tip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Tip Not Found</h2>
            <p className="text-muted-foreground mb-6">The tip you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tips
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              {tip.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {tip.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {tip.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{tip.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{tip.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{tip.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{tip.likes} likes</span>
              </div>
            </div>

            {/* Tags & Difficulty */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Badge className={getDifficultyColor(tip.difficulty)}>
                {tip.difficulty}
              </Badge>
              {tip.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Button variant="outline" size="sm">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="prose prose-lg max-w-none p-8 dark:prose-invert">
              <div 
                dangerouslySetInnerHTML={{ __html: tip.content }} 
                className="[&>div]:space-y-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:font-semibold [&_h4]:mb-2 [&_p]:leading-relaxed [&_li]:mb-2"
              />
            </CardContent>
          </Card>

          {/* Author & Date */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Published by {tip.author}</span>
              <span>{tip.publishDate}</span>
            </div>
          </div>

          {/* Related Actions */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-4">
              <Button>
                <ThumbsUp className="w-4 h-4 mr-2" />
                Like ({tip.likes})
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetail;