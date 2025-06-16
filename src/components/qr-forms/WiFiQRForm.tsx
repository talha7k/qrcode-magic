
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface WiFiQRFormProps {
  onGenerate: (wifiString: string) => void;
}

const WiFiQRForm: React.FC<WiFiQRFormProps> = ({ onGenerate }) => {
  const [wifi, setWifi] = useState({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (wifi.ssid) {
        const wifiString = `WIFI:T:${wifi.security};S:${wifi.ssid};P:${wifi.password};H:${wifi.hidden ? 'true' : 'false'};;`;
        onGenerate(wifiString);
      } else {
        onGenerate('');
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [wifi, onGenerate]);

  const updateWifi = (field: string, value: string | boolean) => {
    setWifi(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ssid">Network Name (SSID)</Label>
        <Input
          id="ssid"
          placeholder="My WiFi Network"
          value={wifi.ssid}
          onChange={(e) => updateWifi('ssid', e.target.value)}
          className="text-lg py-3 px-4"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter WiFi password"
          value={wifi.password}
          onChange={(e) => updateWifi('password', e.target.value)}
          className="text-lg py-3 px-4"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="security">Security Type</Label>
        <Select value={wifi.security} onValueChange={(value) => updateWifi('security', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select security type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WPA">WPA/WPA2</SelectItem>
            <SelectItem value="WEP">WEP</SelectItem>
            <SelectItem value="nopass">No Password</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="hidden"
          checked={wifi.hidden}
          onCheckedChange={(checked) => updateWifi('hidden', checked === true)}
        />
        <Label htmlFor="hidden">Hidden Network</Label>
      </div>
      
      <p className="text-sm text-gray-500">
        Generate a QR code for easy WiFi sharing
      </p>
    </div>
  );
};

export default WiFiQRForm;
