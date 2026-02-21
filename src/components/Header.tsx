import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { QrCode, Sun, Moon } from 'lucide-react';

const Header: React.FC<{ showAppButton?: boolean }> = ({ showAppButton = true }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg flex justify-between items-center"
    >
      <Link to="/" className="flex items-center space-x-2">
        <QrCode className="h-8 w-8" />
        <h1 className="text-2xl font-bold">QR Code Magic</h1>
      </Link>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-primary-foreground hover:bg-primary-foreground/20"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        {showAppButton && (
          <Link to="/app">
            <Button className="bg-card text-primary hover:bg-secondary">
              Go to App
            </Button>
          </Link>
        )}
      </div>
    </motion.header>
  );
};

export default Header;