/**
 * Terms of Service Page Component
 * 
 * Legal terms and conditions for using Mwanzo Skills Campus.
 * 
 * @backend API Endpoint: GET /api/v1/legal/terms
 * @backend Expected Response: { content: string, lastUpdated: string }
 */

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-20 pb-8 md:pt-28 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-invert prose-sm">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using Mwanzo Skills Campus ("the Platform"), you agree to be bound 
                  by these Terms of Service. If you do not agree to these terms, please do not use 
                  our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. User Accounts</h2>
                <p className="text-muted-foreground mb-3">
                  To access certain features, you must create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Providing accurate and complete registration information</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Course Enrollment & Payments</h2>
                <p className="text-muted-foreground mb-3">
                  When you enroll in a course:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Payment is due at the time of enrollment via M-Pesa or other accepted methods</li>
                  <li>Course access is granted for the lifetime of the course on our platform</li>
                  <li>Refunds are available within 7 days if you haven't completed more than 30% of the course</li>
                  <li>Prices are in Kenyan Shillings (KES) unless otherwise stated</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. Certificates</h2>
                <p className="text-muted-foreground">
                  Upon successful completion of a course (minimum 80% completion), you will receive 
                  a digital certificate. Certificates are for personal use and verification by employers. 
                  We reserve the right to revoke certificates obtained through fraudulent means.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Job Board Usage</h2>
                <p className="text-muted-foreground mb-3">
                  The job board is provided as a service to connect students with employers. We:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Do not guarantee employment outcomes</li>
                  <li>Are not responsible for employer actions or decisions</li>
                  <li>Reserve the right to remove fraudulent job postings</li>
                  <li>May require course completion for certain job applications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All course content, videos, materials, and platform features are owned by Mwanzo 
                  Skills Campus or our content partners. You may not reproduce, distribute, or 
                  commercially exploit any content without written permission.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. User Conduct</h2>
                <p className="text-muted-foreground mb-3">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Share account credentials or course access</li>
                  <li>Download or distribute course videos</li>
                  <li>Submit fraudulent applications or information</li>
                  <li>Engage in harassment or inappropriate behavior</li>
                  <li>Attempt to hack or disrupt platform services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Mwanzo Skills Campus is provided "as is" without warranties. We are not liable 
                  for any indirect, incidental, or consequential damages arising from your use 
                  of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may update these terms at any time. Continued use of the platform after 
                  changes constitutes acceptance of the new terms. We will notify registered 
                  users of significant changes via email.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">10. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these terms, contact us at legal@mwanzo.co.ke or 
                  through our support channels.
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
