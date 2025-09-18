import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  background?: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  background, 
  className = '' 
}) => {
  return (
    <div className={`min-h-screen w-full relative ${className}`}>
      {/* Background Layer */}
      {background && (
        <div className="absolute inset-0 z-0">
          {background}
        </div>
      )}
      
      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
