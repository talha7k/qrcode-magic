
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface QRTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const QRTypeCard: React.FC<QRTypeCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  isActive, 
  onClick 
}) => {
  return (
    <Card 
      className={`min-w-[280px] cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isActive 
          ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200' 
          : 'hover:border-purple-200 hover:bg-purple-50/50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`p-3 rounded-full ${
            isActive 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-semibold text-lg ${
              isActive ? 'text-purple-900' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <p className={`text-sm mt-1 ${
              isActive ? 'text-purple-700' : 'text-gray-600'
            }`}>
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRTypeCard;
