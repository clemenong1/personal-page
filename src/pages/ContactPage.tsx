import React from 'react';
import PageLayout from '../components/PageLayout';
import PageContent from '../components/PageContent';
import ContactForm from '../components/ContactForm';
// @ts-ignore
import LiquidEther from '../components/LiquidEther';

const ContactPage: React.FC = () => {
  return (
    <PageLayout className="relative bg-dark-bg overflow-hidden">
      {/* Background Liquid Ether */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-20 pointer-events-none">
        <PageContent maxWidth="4xl">
          <div className="text-center mb-16 pointer-events-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Work Together?
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Contact me and we can chat about potential collaborations, opportunities, or just to say hello!
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16 pointer-events-auto">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="text-center pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <a
                  href="mailto:clemenongjunkai@gmail.com"
                  className="text-accent-blue hover:text-accent-blue-hover transition-colors"
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
  );
};

export default ContactPage;
