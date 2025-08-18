
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TextQRFormProps {
  onGenerate: (text: string) => void;
  formData?: any;
  onFormDataChange?: (data: any) => void;
}

const TextQRForm: React.FC<TextQRFormProps> = ({ onGenerate, formData, onFormDataChange }) => {
  const [text, setText] = useState(formData?.text || '');

  // Sync with parent form data
  useEffect(() => {
    if (formData?.text !== undefined && formData.text !== text) {
      setText(formData.text);
    }
  }, [formData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onGenerate(text);
      if (onFormDataChange) {
        onFormDataChange({ text });
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [text, onGenerate, onFormDataChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Text Content</Label>
        <Textarea
          id="text"
          placeholder="Enter any text...
Press Enter for new lines"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-lg py-3 px-4 min-h-[120px] resize-none"
          rows={5}
        />
        <p className="text-sm text-gray-500">
          Enter any text to convert into a QR code. Press Enter for new lines.
        </p>
      </div>
    </div>
  );
};

export default TextQRForm;
