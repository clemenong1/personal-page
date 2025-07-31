import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/clemenong1',
      icon: FaGithub
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/clemenong1',
      icon: FaLinkedin
    },
    {
      name: 'Email',
      url: 'mailto:clemenongjunkai@gmail.com',
      icon: FaEnvelope
    },
    {
      name: 'Phone',
      url: 'tel:+6591282681',
      icon: FaPhone
    }
  ];

  return (
    <footer className="bg-dark-card border-t border-dark-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © 2025 Clemen Ong Jun Kai. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 