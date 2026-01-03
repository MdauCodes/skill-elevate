/**
 * Help Center Page Component
 * 
 * Provides help resources and support options.
 * 
 * @backend API Endpoint: GET /api/v1/help/articles
 * @backend Expected Response: { categories: HelpCategory[], articles: HelpArticle[] }
 */

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { 
  Search, BookOpen, CreditCard, Award, Settings, Users, 
  Briefcase, HelpCircle, MessageCircle, ArrowRight 
} from 'lucide-react';

// Mock data - Replace with API call: GET /api/v1/help/categories
const helpCategories = [
  { icon: BookOpen, title: 'Getting Started', desc: 'How to create an account and enroll in courses', count: 12 },
  { icon: CreditCard, title: 'Payments & Billing', desc: 'M-Pesa, refunds, and payment issues', count: 8 },
  { icon: Award, title: 'Certificates', desc: 'Earning and downloading your certificates', count: 6 },
  { icon: Settings, title: 'Account Settings', desc: 'Profile, password, and preferences', count: 10 },
  { icon: Users, title: 'For Tutors', desc: 'Creating courses and managing students', count: 15 },
  { icon: Briefcase, title: 'Job Applications', desc: 'Applying for jobs and tracking status', count: 7 },
];

// Mock popular articles - Replace with API call: GET /api/v1/help/popular
const popularArticles = [
  { id: '1', title: 'How to pay with M-Pesa', category: 'Payments' },
  { id: '2', title: 'Downloading your certificate', category: 'Certificates' },
  { id: '3', title: 'Resetting your password', category: 'Account' },
  { id: '4', title: 'Enrolling in a course', category: 'Getting Started' },
  { id: '5', title: 'Applying for jobs after completion', category: 'Jobs' },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Handle search submission
   * @backend Replace with: GET /api/v1/help/search?q={query}
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search with API
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero with Search */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            How Can We <span className="text-gradient">Help?</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Search our help center or browse categories below.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help..."
                className="pl-12 pr-4 py-6 text-lg rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6">Browse by Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpCategories.map((category, index) => (
              <Link
                key={category.title}
                to={`/help/${category.title.toLowerCase().replace(/ /g, '-')}`}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card/80 transition-all duration-300 animate-fade-up group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.desc}</p>
                    <p className="text-xs text-muted-foreground mt-2">{category.count} articles</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6">Popular Articles</h2>
          <div className="max-w-2xl">
            {popularArticles.map((article) => (
              <Link
                key={article.id}
                to={`/help/article/${article.id}`}
                className="flex items-center gap-3 p-4 border-b border-border hover:bg-background/50 transition-colors group"
              >
                <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                <span className="flex-1 group-hover:text-primary transition-colors">{article.title}</span>
                <span className="text-xs text-muted-foreground">{article.category}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center p-6 rounded-2xl bg-gradient-card border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Still Need Help?</h2>
            <p className="text-muted-foreground mb-4">
              Our support team is available Monday to Friday, 8AM - 6PM.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
