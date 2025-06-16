
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextQRFormProps {
  onGenerate: (text: string) => void;
}

const TextQRForm: React.FC<TextQRFormProps> = ({ onGenerate }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onGenerate(text);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [text, onGenerate]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Text Content</Label>
        <Input
          id="text"
          type="text"
          placeholder="Enter any text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-lg py-3 px-4"
        />
        <p className="text-sm text-gray-500">
          Enter any text to convert into a QR code
        </p>
      </div>
    </div>
  );
};

export default TextQRForm;
