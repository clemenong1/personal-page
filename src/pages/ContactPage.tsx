import React from 'react';
import PageLayout from '../components/PageLayout';
import PageContent from '../components/PageContent';
import ContactForm from '../components/ContactForm';
import ScrollAnimations from '../components/ScrollAnimations';

const ContactPage: React.FC = () => {
  return (
    <ScrollAnimations>
      <PageLayout className="relative bg-dark-bg overflow-hidden">
        {/* Foreground Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center py-12">
          <PageContent maxWidth="4xl">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 scroll-animate">
                Let's connect!
              </h1>
            </div>

            <div className="max-w-4xl mx-auto mb-10 scroll-animate">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="text-center scroll-animate">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                  <a
                    href="mailto:clemenongjunkai@gmail.com"
                    className="text-accent-blue hover:text-accent-blue-hover transition-colors hover-scale"
                  >
                    clemenongjunkai@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                  <p className="text-gray-300">Singapore</p>
                </div>
              </div>
            </div>
          </PageContent>
        </div>
      </PageLayout>
    </ScrollAnimations>
  );
};

export default ContactPage;
