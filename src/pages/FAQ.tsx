/**
 * FAQ Page Component
 * 
 * Frequently asked questions about Mwanzo Skills Campus.
 * 
 * @backend API Endpoint: GET /api/v1/faq
 * @backend Expected Response: { categories: FAQCategory[] }
 */

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';

// Mock data - Replace with API call: GET /api/v1/faq
const faqCategories = [
  {
    title: 'Getting Started',
    faqs: [
      {
        question: 'How do I create an account?',
        answer: 'Click "Sign Up" on the homepage, enter your email and phone number, verify via SMS, and you\'re ready to start learning. You can also sign up when enrolling in your first course.',
      },
      {
        question: 'Are the courses really free to start?',
        answer: 'Yes! Many courses offer free preview lessons so you can see if the content is right for you before purchasing. Some courses are completely free for Ajira Digital program participants.',
      },
      {
        question: 'What devices can I use to access courses?',
        answer: 'Mwanzo works on any device with a web browser - smartphones, tablets, laptops, or desktop computers. Our platform is optimized for mobile learning since we know many Kenyans learn on their phones.',
      },
    ],
  },
  {
    title: 'Payments & Pricing',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We primarily accept M-Pesa for seamless payments. Simply enter your phone number, confirm the STK push notification, and you\'re enrolled. We also support card payments for international students.',
      },
      {
        question: 'Can I pay in installments?',
        answer: 'Yes! For courses above KES 5,000, you can choose to pay in 2-3 installments. Contact our support team to arrange a payment plan.',
      },
      {
        question: 'What is your refund policy?',
        answer: 'If you\'re not satisfied with a course, you can request a full refund within 7 days of purchase, provided you haven\'t completed more than 30% of the course content.',
      },
      {
        question: 'Do prices include taxes?',
        answer: 'Yes, all displayed prices include applicable taxes. The price you see is the final price you pay.',
      },
    ],
  },
  {
    title: 'Courses & Learning',
    faqs: [
      {
        question: 'How long do I have access to a course?',
        answer: 'Once you purchase a course, you have lifetime access. You can revisit the material anytime, including future updates the tutor makes to the course.',
      },
      {
        question: 'Can I download course videos for offline viewing?',
        answer: 'Currently, videos are streaming only to protect our tutors\' content. However, you can download course resources, PDFs, and supplementary materials.',
      },
      {
        question: 'What if I get stuck on a lesson?',
        answer: 'Each course has a Q&A section where you can ask questions. Tutors and fellow students often respond within 24 hours. You can also reach out to our support team.',
      },
      {
        question: 'Are there any prerequisites for courses?',
        answer: 'Prerequisites vary by course. Check the "Requirements" section on each course page. Beginner courses typically need no prior experience.',
      },
    ],
  },
  {
    title: 'Certificates',
    faqs: [
      {
        question: 'How do I get a certificate?',
        answer: 'Complete at least 80% of the course content and pass any required assessments. Your certificate is automatically generated and can be downloaded from your dashboard.',
      },
      {
        question: 'Are certificates recognized by employers?',
        answer: 'Yes! Our certificates are recognized by partner employers across Kenya. Each certificate has a unique verification code that employers can use to verify authenticity.',
      },
      {
        question: 'Can I share my certificate on LinkedIn?',
        answer: 'Absolutely! Each certificate has a "Share to LinkedIn" button that adds your credential directly to your LinkedIn profile.',
      },
    ],
  },
  {
    title: 'Jobs & Employment',
    faqs: [
      {
        question: 'How does the job board work?',
        answer: 'Employers post jobs specifically seeking Mwanzo graduates. Some jobs require completion of specific courses. You can apply directly through our platform with your profile and certificates.',
      },
      {
        question: 'Do you guarantee job placement?',
        answer: 'While we can\'t guarantee employment, we work hard to connect qualified graduates with employers. Many of our students have successfully landed jobs through our platform.',
      },
      {
        question: 'Why are some jobs locked?',
        answer: 'Some employers want candidates who have completed specific courses. Complete the required course(s) to unlock these exclusive opportunities.',
      },
    ],
  },
  {
    title: 'For Tutors',
    faqs: [
      {
        question: 'How can I become a tutor on Mwanzo?',
        answer: 'Click "Teach on Mwanzo" and submit your application. We review your expertise, create a sample lesson, and if approved, you\'ll be guided through creating your first course.',
      },
      {
        question: 'What percentage of course sales do tutors receive?',
        answer: 'Tutors receive 70% of course revenue. Payments are made monthly via M-Pesa once your earnings exceed KES 1,000.',
      },
      {
        question: 'Can I set my own course prices?',
        answer: 'Yes! You have full control over your course pricing. We provide recommendations based on similar courses, but the final decision is yours.',
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find answers to common questions about Mwanzo Skills Campus.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqCategories.map((category) => (
              <div key={category.title}>
                <h2 className="text-xl font-bold mb-4">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`${category.title}-${index}`}
                      className="border border-border rounded-lg px-4 data-[state=open]:bg-card"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
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
