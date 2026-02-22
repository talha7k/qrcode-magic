"use client"

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface ContactQRFormProps {
  onGenerate: (vcard: string) => void;
  formData?: any;
  onFormDataChange?: (data: any) => void;
}

interface PhoneNumber {
  id: string;
  number: string;
  type: string;
}

interface Email {
  id: string;
  address: string;
  type: string;
}

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: string;
}

const ContactQRForm: React.FC<ContactQRFormProps> = ({ onGenerate, formData, onFormDataChange }) => {
  const [contact, setContact] = useState({
    firstName: formData?.firstName || '',
    lastName: formData?.lastName || '',
    jobTitle: formData?.jobTitle || '',
    organization: formData?.organization || '',
    website: formData?.website || ''
  });
  
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>(
    formData?.phoneNumbers || [{ id: '1', number: '', type: 'CELL' }]
  );
  
  const [emails, setEmails] = useState<Email[]>(
    formData?.emails || [{ id: '1', address: '', type: 'WORK' }]
  );
  
  const [addresses, setAddresses] = useState<Address[]>(
    formData?.addresses || [{ id: '1', street: '', city: '', state: '', zip: '', country: '', type: 'HOME' }]
  );

  // Sync with parent form data
  useEffect(() => {
    if (formData) {
      if (formData.firstName !== contact.firstName || formData.lastName !== contact.lastName ||
          formData.jobTitle !== contact.jobTitle || formData.organization !== contact.organization ||
          formData.website !== contact.website) {
        setContact({
          firstName: formData.firstName || '',
          lastName: formData.lastName || '',
          jobTitle: formData.jobTitle || '',
          organization: formData.organization || '',
          website: formData.website || ''
        });
      }
      if (formData.phoneNumbers && JSON.stringify(formData.phoneNumbers) !== JSON.stringify(phoneNumbers)) {
        setPhoneNumbers(formData.phoneNumbers);
      }
      if (formData.emails && JSON.stringify(formData.emails) !== JSON.stringify(emails)) {
        setEmails(formData.emails);
      }
      if (formData.addresses && JSON.stringify(formData.addresses) !== JSON.stringify(addresses)) {
        setAddresses(formData.addresses);
      }
    }
  }, [formData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (contact.firstName || contact.lastName || phoneNumbers.some(p => p.number) || emails.some(e => e.address)) {
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.firstName} ${contact.lastName}\nN:${contact.lastName};${contact.firstName};;;\n`;
        
        // Add job title
        if (contact.jobTitle.trim()) {
          vcard += `TITLE:${contact.jobTitle}\n`;
        }
        
        // Add phone numbers
        phoneNumbers.forEach(phone => {
          if (phone.number.trim()) {
            vcard += `TEL;TYPE=${phone.type}:${phone.number}\n`;
          }
        });
        
        // Add emails
        emails.forEach(email => {
          if (email.address.trim()) {
            vcard += `EMAIL;TYPE=${email.type}:${email.address}\n`;
          }
        });
        
        // Add organization
        if (contact.organization.trim()) {
          vcard += `ORG:${contact.organization}\n`;
        }
        
        // Add website
        if (contact.website.trim()) {
          vcard += `URL:${contact.website}\n`;
        }
        
        // Add addresses
        addresses.forEach(address => {
          if (address.street || address.city || address.state || address.zip || address.country) {
            vcard += `ADR;TYPE=${address.type}:;;${address.street};${address.city};${address.state};${address.zip};${address.country}\n`;
          }
        });
        
        vcard += 'END:VCARD';
        onGenerate(vcard);
      } else {
        onGenerate('');
      }
      
      if (onFormDataChange) {
        onFormDataChange({ ...contact, phoneNumbers, emails, addresses });
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [contact, phoneNumbers, emails, addresses, onGenerate, onFormDataChange]);

  const updateContact = (field: string, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };
  
  const addPhoneNumber = () => {
    const newId = Date.now().toString();
    setPhoneNumbers(prev => [...prev, { id: newId, number: '', type: 'CELL' }]);
  };
  
  const removePhoneNumber = (id: string) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(prev => prev.filter(phone => phone.id !== id));
    }
  };
  
  const updatePhoneNumber = (id: string, field: string, value: string) => {
    setPhoneNumbers(prev => prev.map(phone => 
      phone.id === id ? { ...phone, [field]: value } : phone
    ));
  };
  
  const addEmail = () => {
    const newId = Date.now().toString();
    setEmails(prev => [...prev, { id: newId, address: '', type: 'WORK' }]);
  };
  
  const removeEmail = (id: string) => {
    if (emails.length > 1) {
      setEmails(prev => prev.filter(email => email.id !== id));
    }
  };
  
  const updateEmail = (id: string, field: string, value: string) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, [field]: value } : email
    ));
  };
  
  const addAddress = () => {
    const newId = Date.now().toString();
    setAddresses(prev => [...prev, { id: newId, street: '', city: '', state: '', zip: '', country: '', type: 'HOME' }]);
  };
  
  const removeAddress = (id: string) => {
    if (addresses.length > 1) {
      setAddresses(prev => prev.filter(address => address.id !== id));
    }
  };
  
  const updateAddress = (id: string, field: string, value: string) => {
    setAddresses(prev => prev.map(address => 
      address.id === id ? { ...address, [field]: value } : address
    ));
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
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Phone Numbers</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPhoneNumber}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Phone
          </Button>
        </div>
        {phoneNumbers.map((phone, index) => (
          <div key={phone.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <Input
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone.number}
                onChange={(e) => updatePhoneNumber(phone.id, 'number', e.target.value)}
              />
            </div>
            <div className="w-24">
              <Select
                value={phone.type}
                onValueChange={(value) => updatePhoneNumber(phone.id, 'type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CELL">Mobile</SelectItem>
                  <SelectItem value="WORK">Work</SelectItem>
                  <SelectItem value="HOME">Home</SelectItem>
                  <SelectItem value="FAX">Fax</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {phoneNumbers.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removePhoneNumber(phone.id)}
                className="px-2"
              >
                <Minus className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          placeholder="Software Engineer"
          value={contact.jobTitle}
          onChange={(e) => updateContact('jobTitle', e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Email Addresses</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEmail}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Email
          </Button>
        </div>
        {emails.map((email, index) => (
          <div key={email.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="john@example.com"
                value={email.address}
                onChange={(e) => updateEmail(email.id, 'address', e.target.value)}
              />
            </div>
            <div className="w-24">
              <Select
                value={email.type}
                onValueChange={(value) => updateEmail(email.id, 'type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WORK">Work</SelectItem>
                  <SelectItem value="HOME">Home</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {emails.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeEmail(email.id)}
                className="px-2"
              >
                <Minus className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
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
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Addresses</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAddress}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </Button>
        </div>
        {addresses.map((address, index) => (
          <div key={address.id} className="space-y-2 p-4 border-gray-800 border rounded-lg ">
            <div className="flex items-center justify-between  ">
              <div className="flex items-center gap-4 justify-between w-full ">
                <Label className="text-sm font-medium w-full">Address {index + 1}</Label>
                <Select
                  value={address.type}
                  onValueChange={(value) => updateAddress(address.id, 'type', value)}
                 >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOME">Home</SelectItem>
                    <SelectItem value="WORK">Work</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {addresses.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeAddress(address.id)}
                  className="px-2"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Input
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => updateAddress(address.id, 'street', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="City"
                value={address.city}
                onChange={(e) => updateAddress(address.id, 'city', e.target.value)}
              />
              <Input
                placeholder="State"
                value={address.state}
                onChange={(e) => updateAddress(address.id, 'state', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="ZIP Code"
                value={address.zip}
                onChange={(e) => updateAddress(address.id, 'zip', e.target.value)}
              />
              <Input
                placeholder="Country"
                value={address.country}
                onChange={(e) => updateAddress(address.id, 'country', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-200">
        Fill in contact details to generate a vCard QR code. Use the + buttons to add multiple phone numbers, emails, and addresses. Select types for better organization.
      </p>
    </div>
  );
};

export default ContactQRForm;
