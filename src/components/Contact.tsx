import React from 'react';
import ContactForm from './ContactForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Want to Work Together?</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Contact me and we can chat about potential collaborations, opportunities, or just to say hello!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <a 
                href="tel:+6591282681" 
                className="text-accent-blue hover:text-accent-blue-hover transition-colors"
              >
                (+65) 9128 2681
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-300">Singapore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 