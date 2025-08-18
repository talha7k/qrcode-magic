
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface URLQRFormProps {
  onGenerate: (url: string) => void;
  formData?: any;
  onFormDataChange?: (data: any) => void;
}

const URLQRForm: React.FC<URLQRFormProps> = ({ onGenerate, formData, onFormDataChange }) => {
  const [url, setUrl] = useState(formData?.url || '');

  // Sync with parent form data
  useEffect(() => {
    if (formData?.url !== undefined && formData.url !== url) {
      setUrl(formData.url);
    }
  }, [formData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (url) {
        const formattedUrl = url.startsWith('http://') || url.startsWith('https://') 
          ? url 
          : `https://${url}`;
        onGenerate(formattedUrl);
        if (onFormDataChange) {
          onFormDataChange({ url });
        }
      } else {
        onGenerate('');
        if (onFormDataChange) {
          onFormDataChange({ url: '' });
        }
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [url, onGenerate, onFormDataChange]);

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
