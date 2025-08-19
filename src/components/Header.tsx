import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';

const Header: React.FC<{ showAppButton?: boolean }> = ({ showAppButton = true }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg flex justify-between items-center"
    >
      <Link to="/" className="flex items-center space-x-2">
        <QrCode className="h-8 w-8" />
        <h1 className="text-2xl font-bold">QR Code Magic</h1>
      </Link>
      {showAppButton && (
        <Link to="/app">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Go to App
          </Button>
        </Link>
      )}
    </motion.header>
  );
};

export default Header;