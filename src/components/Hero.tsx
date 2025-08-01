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
    <section id="home" className="h-full flex items-center justify-end pt-16 relative">
      {/* Background Image with Fade Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 w-1/2 h-full">
          <img 
            src="/images/profile-bg.jpg" 
            alt="Profile Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-image-fade"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-image-fade-bottom"></div>
        </div>
      </div>
      
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mr-8 lg:mr-16 relative z-10">
        <div className="text-right">
          {/* Name and Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Hi, I'm <span className="gradient-text">Clemen!</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
            Welcome to my website!
          </h2>

          {/* Bio */}
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl ml-auto mb-12 leading-relaxed">
            I'm a passionate developer and NUS Computer Science undergraduate with interests in full-stack development, machine learning, and impactful tech for good.
          </p>

          {/* Social Links */}
          <div className="flex justify-end space-x-4 mb-12">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
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