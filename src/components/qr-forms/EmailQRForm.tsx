
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmailQRFormProps {
  onGenerate: (email: string) => void;
  formData?: any;
  onFormDataChange?: (data: any) => void;
}

const EmailQRForm: React.FC<EmailQRFormProps> = ({ onGenerate, formData, onFormDataChange }) => {
  const [email, setEmail] = useState({
    to: formData?.to || '',
    subject: formData?.subject || '',
    body: formData?.body || ''
  });

  // Sync with parent form data
  useEffect(() => {
    if (formData && (formData.to !== email.to || formData.subject !== email.subject || formData.body !== email.body)) {
      setEmail({
        to: formData.to || '',
        subject: formData.subject || '',
        body: formData.body || ''
      });
    }
  }, [formData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (email.to || email.subject || email.body) {
        const emailString = `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
        onGenerate(emailString);
      } else {
        onGenerate('');
      }
      
      if (onFormDataChange) {
        onFormDataChange(email);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [email, onGenerate, onFormDataChange]);

  const updateEmail = (field: string, value: string) => {
    setEmail(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-to">To Email</Label>
        <Input
          id="email-to"
          type="email"
          placeholder="recipient@example.com"
          value={email.to}
          onChange={(e) => updateEmail('to', e.target.value)}
          className="text-lg py-3 px-4"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email-subject">Subject</Label>
        <Input
          id="email-subject"
          placeholder="Email subject..."
          value={email.subject}
          onChange={(e) => updateEmail('subject', e.target.value)}
          className="text-lg py-3 px-4"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email-body">Message</Label>
        <Input
          id="email-body"
          placeholder="Email message..."
          value={email.body}
          onChange={(e) => updateEmail('body', e.target.value)}
          className="text-lg py-3 px-4"
        />
      </div>
      
      <p className="text-sm text-gray-500">
        Generate a QR code that opens email client with pre-filled content
      </p>
    </div>
  );
};

export default EmailQRForm;
