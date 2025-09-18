import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SplitText from "./BounceEffect.tsx";

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
    <section id="home" className="h-screen flex items-center justify-end pt-16 relative">
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
      
      {/* Content */}
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mr-8 lg:mr-16 relative z-10">
        <div className="text-right space-y-6">
          {/* Name and Title */}
          <div>
            <SplitText
              text="Hi, I'm&nbsp;"
              className="text-6xl font-semibold text-white"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
            <SplitText
              text=" Clemen!"
              className="text-6xl font-semibold gradient-text"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
          </div>

          {/* Intro Bullets */}
          <div className="text-gray-300 text-lg md:text-xl space-y-2 leading-relaxed">
            <p>➤ Software Engineer</p>
            <p>➤ Passionate about AI & Fintech</p>
            <p>➤ Love building impactful tech</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-end space-x-4 pt-4">
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
            <Link to="/contact" className="btn-primary inline-block">
              Get In Touch
            </Link>
            <Link to="/my-work" className="btn-secondary inline-block">
              View My Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
