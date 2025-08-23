import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Calendar,
  ArrowRight,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const FinancialTips = () => {
  const tips = [
    {
       slug: "save-tax-2024",
      category: "Tax Savings",
      title: "10 Smart Ways to Save Tax in 2024",
      description: "Discover legitimate tax-saving strategies that can help you keep more of your hard-earned money.",
      readTime: "5 min read",
      date: "Aug 20, 2025",
      trending: true,
      image: "💰"
    },
    {
      slug: "emi-planning",
      category: "EMI Planning",
      title: "EMI vs Lump Sum: Which is Better?",
      description: "Compare the pros and cons of EMI payments versus lump sum investments for major purchases.",
      readTime: "7 min read", 
      date: "Aug 20, 2025",
      trending: false,
      image: "🏠"
    },
    {
      slug: "investing-101",
      category: "Investment",
      title: "SIP Investment Guide for Beginners",
      description: "Start your systematic investment plan journey with this comprehensive beginner's guide.",
      readTime: "8 min read",
      date: "Aug 20, 2025", 
      trending: true,
      image: "📈"
    },
    {
      slug: "budgeting-basics",
      category: "Budget Planning",
      title: "50-30-20 Rule: Smart Budgeting Made Simple",
      description: "Learn how to allocate your income effectively using the popular 50-30-20 budgeting rule.",
      readTime: "4 min read",
      date: "Aug 20, 2025",
      trending: false,
      image: "📊"
    },
    {
      slug: "loan-management",
      category: "Loan Management", 
      title: "How to Improve Your Credit Score Fast",
      description: "Practical steps to boost your credit score and get better loan terms and interest rates.",
      readTime: "6 min read",
      date: "Aug 20, 2025",
      trending: false,
      image: "⭐"
    },
    {
      slug: "emergency-fund",
      category: "Financial Planning",
      title: "Emergency Fund: How Much is Enough?",
      description: "Calculate the right emergency fund size for your financial security and peace of mind.",
      readTime: "5 min read",
      date: "Aug 20, 2025",
      trending: true, 
      image: "🛡️"
    }
  ];

  const newsItems = [
    {
      title: "RBI Cuts Repo Rate by 0.25%",
      summary: "The recent rate cut will impact EMI calculations for existing and new borrowers.",
      time: "2 hours ago",
      category: "Banking"
    },
    {
      title: "New Tax Slabs Announced for FY 2024-25", 
      summary: "Government introduces revised tax slabs affecting income tax calculations.",
      time: "1 day ago",
      category: "Tax Policy"
    },
    {
      title: "GST Council Reduces Rates on Essential Items",
      summary: "Several everyday items now attract lower GST rates, affecting pricing calculations.",
      time: "3 days ago", 
      category: "GST Updates"
    }
  ];

  return (
    <section id="tips" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Financial Insights & Tips
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert advice to help you make smarter financial decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tips Content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <Card key={index} className="calculator-card group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {tip.category}
                      </Badge>
                      {tip.trending && (
                        <Badge className="primary-gradient text-primary-foreground text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-4xl mb-3">{tip.image}</div>
                    
                    <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-fast">
                      {tip.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tip.readTime}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {tip.date}
                      </div>
                    </div>
                     <Link to={`/tips/${tip.slug}`}>
                    <Button variant="outline" className="w-full group-hover:border-primary transition-fast">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - Latest News */}
          <div className="lg:col-span-1">
            <Card className="card-shadow sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  Latest Finance News
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {newsItems.map((news, index) => (
                  <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <Badge variant="outline" className="text-xs mb-2">
                      {news.category}
                    </Badge>
                    <h4 className="font-semibold text-card-foreground mb-2 hover:text-primary cursor-pointer transition-fast">
                      {news.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {news.summary}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {news.time}
                    </p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  View All News
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialTips;