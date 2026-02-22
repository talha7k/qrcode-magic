"use client"

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SMSQRFormProps {
  onGenerate: (sms: string) => void;
  formData?: any;
  onFormDataChange?: (data: any) => void;
}

const SMSQRForm: React.FC<SMSQRFormProps> = ({ onGenerate, formData, onFormDataChange }) => {
  const [sms, setSms] = useState({
    phone: formData?.phone || '',
    message: formData?.message || ''
  });

  // Sync with parent form data
  useEffect(() => {
    if (formData && (formData.phone !== sms.phone || formData.message !== sms.message)) {
      setSms({
        phone: formData.phone || '',
        message: formData.message || ''
      });
    }
  }, [formData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (sms.phone || sms.message) {
        const smsString = `sms:${sms.phone}?body=${encodeURIComponent(sms.message)}`;
        onGenerate(smsString);
      } else {
        onGenerate('');
      }
      
      if (onFormDataChange) {
        onFormDataChange(sms);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [sms, onGenerate, onFormDataChange]);

  const updateSms = (field: string, value: string) => {
    setSms(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sms-phone">Phone Number</Label>
        <Input
          id="sms-phone"
          type="tel"
          placeholder="+1 234 567 8900"
          value={sms.phone}
          onChange={(e) => updateSms('phone', e.target.value)}
          className="text-lg py-3 px-4"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sms-message">Message</Label>
        <Input
          id="sms-message"
          placeholder="Enter your message..."
          value={sms.message}
          onChange={(e) => updateSms('message', e.target.value)}
          className="text-lg py-3 px-4"
        />
      </div>
      
      <p className="text-sm text-gray-500">
        Create a QR code that opens SMS with pre-filled message
      </p>
    </div>
  );
};

export default SMSQRForm;
