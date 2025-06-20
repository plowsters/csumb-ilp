
import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        {children}
      </main>
      <footer className="bg-card border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 ILP Portfolio - Computer Science Online Program</p>
            <p className="text-sm mt-2">California State University, Monterey Bay</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
