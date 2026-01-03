/**
 * Contact Page Component
 * 
 * Contact form and information for reaching Mwanzo Skills Campus.
 * 
 * @backend API Endpoint: POST /api/v1/contact
 * @backend Request Body: { name: string, email: string, subject: string, message: string }
 * @backend Expected Response: { success: boolean, ticketId: string }
 */

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@mwanzo.co.ke', href: 'mailto:hello@mwanzo.co.ke' },
  { icon: Phone, label: 'Phone', value: '+254 700 000 000', href: 'tel:+254700000000' },
  { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri: 8AM - 6PM', href: null },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  /**
   * Handle form submission
   * @backend Replace with: POST /api/v1/contact
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    // const response = await fetch('/api/v1/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions? We're here to help you on your learning journey.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Kamau"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-card border border-border">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="font-medium hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Chat on WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">Get instant support</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                      Chat Now
                    </a>
                  </Button>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-bold mb-2">Looking for quick answers?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Check our FAQ section for common questions about courses, payments, and certifications.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="/faq">View FAQ</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
