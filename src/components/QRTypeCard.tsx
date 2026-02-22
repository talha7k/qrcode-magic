"use client"

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
      className={`min-w-[280px] bg-card cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isActive
          ? 'ring-2 ring-primary bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30'
          : 'hover:border-primary/30 hover:bg-primary/5'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`p-3 rounded-full ${
            isActive
              ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-semibold text-lg ${
              isActive ? 'text-foreground' : 'text-foreground'
            }`}>
              {title}
            </h3>
            <p className={`text-sm mt-1 ${
              isActive ? 'text-primary' : 'text-muted-foreground'
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
