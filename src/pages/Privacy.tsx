/**
 * Privacy Policy Page Component
 * 
 * Privacy policy for Mwanzo Skills Campus users.
 * 
 * @backend API Endpoint: GET /api/v1/legal/privacy
 * @backend Expected Response: { content: string, lastUpdated: string }
 */

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-8 md:pt-28 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground">
                  Mwanzo Skills Campus ("we," "our," or "us") is committed to protecting your privacy. 
                  This policy explains how we collect, use, and safeguard your personal information 
                  when you use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-3">
                  We collect the following types of information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Account Information:</strong> Name, email, phone number, and password</li>
                  <li><strong>Profile Data:</strong> Education history, skills, and career interests</li>
                  <li><strong>Learning Data:</strong> Course progress, quiz scores, and completion records</li>
                  <li><strong>Payment Information:</strong> M-Pesa transaction details (we don't store full payment credentials)</li>
                  <li><strong>Usage Data:</strong> IP address, browser type, device information, and platform interactions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-3">
                  Your information is used to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and improve our educational services</li>
                  <li>Process payments and issue certificates</li>
                  <li>Match you with relevant job opportunities</li>
                  <li>Send course updates and promotional communications (with consent)</li>
                  <li>Analyze platform usage to improve user experience</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Sharing Your Information</h2>
                <p className="text-muted-foreground mb-3">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Employers:</strong> When you apply for jobs, your profile and certificates are shared</li>
                  <li><strong>Tutors:</strong> Tutors can see enrolled student progress in their courses</li>
                  <li><strong>Payment Providers:</strong> M-Pesa and other payment processors</li>
                  <li><strong>Service Providers:</strong> Cloud hosting, analytics, and communication services</li>
                  <li><strong>Legal Requirements:</strong> When required by Kenyan law or court order</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures including encryption, secure servers, 
                  and regular security audits. However, no method of transmission over the internet is 
                  100% secure. We encourage you to use strong passwords and protect your account credentials.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access and download your personal data</li>
                  <li>Correct inaccurate information in your profile</li>
                  <li>Delete your account (note: certificates remain verifiable)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request information about how your data is used</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your data for as long as your account is active or as needed to provide 
                  services. Certificate records are maintained indefinitely for verification purposes. 
                  You can request account deletion, and we will remove personal data within 30 days, 
                  except for legally required records.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Cookies and Tracking</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to improve your experience, remember your 
                  preferences, and analyze platform usage. You can control cookie settings through 
                  your browser, though some features may not work properly without them.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our platform is intended for users 16 years and older. We do not knowingly collect 
                  data from children under 16. If we discover such data has been collected, we will 
                  delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this policy periodically. We will notify you of significant changes 
                  via email or platform notification. Continued use after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  For privacy-related questions or requests, contact our Data Protection Officer at 
                  privacy@mwanzo.co.ke or write to us at Mwanzo Skills Campus, Nairobi, Kenya.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
