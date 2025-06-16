
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContactQRFormProps {
  onGenerate: (vcard: string) => void;
}

const ContactQRForm: React.FC<ContactQRFormProps> = ({ onGenerate }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    website: ''
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (contact.firstName || contact.lastName || contact.phone || contact.email) {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName} ${contact.lastName}
N:${contact.lastName};${contact.firstName};;;
TEL:${contact.phone}
EMAIL:${contact.email}
ORG:${contact.organization}
URL:${contact.website}
END:VCARD`;
        onGenerate(vcard);
      } else {
        onGenerate('');
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [contact, onGenerate]);

  const updateContact = (field: string, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={contact.firstName}
            onChange={(e) => updateContact('firstName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={contact.lastName}
            onChange={(e) => updateContact('lastName', e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 234 567 8900"
          value={contact.phone}
          onChange={(e) => updateContact('phone', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={contact.email}
          onChange={(e) => updateContact('email', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          placeholder="Company Name"
          value={contact.organization}
          onChange={(e) => updateContact('organization', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          placeholder="https://example.com"
          value={contact.website}
          onChange={(e) => updateContact('website', e.target.value)}
        />
      </div>
      
      <p className="text-sm text-gray-500">
        Fill in contact details to generate a vCard QR code
      </p>
    </div>
  );
};

export default ContactQRForm;
