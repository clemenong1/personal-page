import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero: React.FC = () => {
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
    }
  ];

  return (
    <section id="home" className="h-full flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Profile Image Placeholder */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-dark-card rounded-full flex items-center justify-center border-4 border-accent-blue">
              <span className="text-4xl font-bold text-white">CO</span>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Hi, I'm <span className="gradient-text">Clemen!</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
            Welcome to my website!
          </h2>

          {/* Bio */}
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            I'm a passionate developer and NUS Computer Science undergraduate with interests in full-stack development, machine learning, and impactful tech for good.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-12">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={social.name}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="btn-primary inline-block"
            >
              Get In Touch
            </a>
            <a
              href="#professional-work"
              className="btn-secondary inline-block"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 