import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-gray-900 text-center mb-6 leading-tight"
        variants={itemVariants}
      >
        QR Code Magic
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-700 text-center max-w-3xl mb-10"
        variants={itemVariants}
      >
        Your ultimate solution for creating highly customizable, static, and permanent QR codes.
        No subscriptions, no dynamic URLs, just pure QR code power.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-12"
        variants={containerVariants}
      >
        <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Local Storage Persistence</h2>
          <p className="text-gray-600">All your QR code data is saved directly in your browser, ensuring your work is always accessible.</p>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Multiple Saved Entries</h2>
          <p className="text-gray-600">Manage multiple QR code contents for each type, keeping your projects organized.</p>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Session Restoration</h2>
          <p className="text-gray-600">Never lose your progress. Your current form data and settings are auto-saved and restored.</p>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Intuitive Management UI</h2>
          <p className="text-gray-600">Effortlessly save, load, and delete your QR code entries with a user-friendly interface.</p>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Auto-Save Functionality</h2>
          <p className="text-gray-600">Real-time auto-saving prevents data loss, giving you peace of mind as you create.</p>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Customizable & Permanent</h2>
          <p className="text-gray-600">Add logos, adjust resolution, and customize borders. Our static QR codes work forever.</p>
        </motion.div>
      </motion.div>

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
        className="text-sm text-gray-500 mt-12 text-center"
        variants={itemVariants}
      >
        A project by <a href="https://dijitize.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Dijitize.com</a>
      </motion.p>
    </motion.div>
  );
};

export default LandingPage;