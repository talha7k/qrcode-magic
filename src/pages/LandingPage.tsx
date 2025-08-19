import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { HardDrive, Save, History, LayoutDashboard, Zap, Palette } from 'lucide-react';

const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Header showAppButton={true} />
      <div className="flex flex-col items-center mt-4 justify-center flex-grow w-full p-8">

      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-white text-center mb-6 leading-tight"
        variants={itemVariants}
      >
        QR Code Magic
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mb-10"
        variants={itemVariants}
      >
        Your ultimate solution for creating highly customizable, static, and permanent QR codes.
        No subscriptions, no dynamic URLs, just pure QR code power.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-12"
        variants={containerVariants}
      >
        <motion.div className="bg-gray-700 rounded-xl shadow-lg p-6" variants={itemVariants}>
          <HardDrive className="h-10 w-10 text-blue-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Local Storage Persistence</h2>
          <p className="text-gray-300">All your QR code data is saved directly in your browser, ensuring your work is always accessible.</p>
        </motion.div>

        <motion.div className="bg-gray-700 rounded-xl shadow-lg p-6" variants={itemVariants}>
          <Save className="h-10 w-10 text-green-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Multiple Saved Entries</h2>
          <p className="text-gray-300">Manage multiple QR code contents for each type, keeping your projects organized.</p>
        </motion.div>

        <motion.div className="bg-gray-700 rounded-xl shadow-lg p-6" variants={itemVariants}>
          <History className="h-10 w-10 text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Session Restoration</h2>
          <p className="text-gray-300">Never lose your progress. Your current form data and settings are auto-saved and restored.</p>
        </motion.div>

        <motion.div className="bg-gray-700 rounded-xl shadow-lg p-6" variants={itemVariants}>
          <LayoutDashboard className="h-10 w-10 text-red-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Intuitive Management UI</h2>
          <p className="text-gray-300">Effortlessly save, load, and delete your QR code entries with a user-friendly interface.</p>
        </motion.div>

        <motion.div className="bg-gray-700 rounded-xl shadow-lg p-6" variants={itemVariants}>
          <Zap className="h-10 w-10 text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Auto-Save Functionality</h2>
          <p className="text-gray-300">Real-time auto-saving prevents data loss, giving you peace of mind as you create.</p>
        </motion.div>

        <motion.div className="bg-gray-700 rounded-xl shadow-lg p-6" variants={itemVariants}>
          <Palette className="h-10 w-10 text-pink-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Customizable & Permanent</h2>
          <p className="text-gray-300">Add logos, adjust resolution, and customize borders. Our static QR codes work forever.</p>
        </motion.div>
      </motion.div>

      </div>

      <motion.div variants={itemVariants}>
        <Link to="/app">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            Start Creating QR Codes
          </Button>
        </Link>
      </motion.div>

      <motion.p
        className="text-sm text-gray-400 mt-12 text-center"
        variants={itemVariants}
      >
        A project by <a href="https://dijitize.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Dijitize.com</a>
      </motion.p>
    </motion.div>
  );
};

export default LandingPage;