
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface URLQRFormProps {
  onGenerate: (url: string) => void;
}

const URLQRForm: React.FC<URLQRFormProps> = ({ onGenerate }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (url) {
        const formattedUrl = url.startsWith('http://') || url.startsWith('https://') 
          ? url 
          : `https://${url}`;
        onGenerate(formattedUrl);
      } else {
        onGenerate('');
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [url, onGenerate]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">Website URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="text-lg py-3 px-4"
        />
        <p className="text-sm text-gray-500">
          Enter a website URL (https:// will be added automatically)
        </p>
      </div>
    </div>
  );
};

export default URLQRForm;
