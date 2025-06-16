
import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Download, Copy, Check, Type, Globe, User, Wifi, MessageSquare, Mail, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRTypeCard from './QRTypeCard';
import TextQRForm from './qr-forms/TextQRForm';
import URLQRForm from './qr-forms/URLQRForm';
import ContactQRForm from './qr-forms/ContactQRForm';
import WiFiQRForm from './qr-forms/WiFiQRForm';
import SMSQRForm from './qr-forms/SMSQRForm';
import EmailQRForm from './qr-forms/EmailQRForm';

const QRGenerator = () => {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeType, setActiveType] = useState('text');
  const [resolution, setResolution] = useState('256');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const qrTypes = [
    {
      id: 'text',
      title: 'Text',
      description: 'Convert any text into a QR code',
      icon: Type
    },
    {
      id: 'url',
      title: 'Website URL',
      description: 'Link to any website or webpage',
      icon: Globe
    },
    {
      id: 'contact',
      title: 'Contact Info',
      description: 'Share contact details and vCard',
      icon: User
    },
    {
      id: 'wifi',
      title: 'WiFi Password',
      description: 'Share WiFi credentials easily',
      icon: Wifi
    },
    {
      id: 'sms',
      title: 'SMS Message',
      description: 'Pre-filled text message',
      icon: MessageSquare
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Pre-filled email with subject',
      icon: Mail
    }
  ];

  const resolutionOptions = [
    { value: '128', label: '128x128 (Small)' },
    { value: '256', label: '256x256 (Medium)' },
    { value: '512', label: '512x512 (Large)' },
    { value: '1024', label: '1024x1024 (Extra Large)' }
  ];

  const generateQR = async (inputText: string) => {
    if (!inputText.trim()) {
      setQrDataUrl('');
      return;
    }

    setIsLoading(true);
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        const size = parseInt(resolution);
        await QRCode.toCanvas(canvas, inputText, {
          width: size,
          margin: 2,
          color: {
            dark: '#1a1a1a',
            light: '#ffffff'
          }
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        setQrDataUrl(dataUrl);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `qr-code-${activeType}-${resolution}x${resolution}.png`;
    link.href = qrDataUrl;
    link.click();
    
    toast({
      title: "Downloaded!",
      description: `QR code (${resolution}x${resolution}) has been saved as PNG.`,
    });
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) return;
    
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied!",
        description: "QR code has been copied to clipboard as PNG.",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: "Error",
        description: "Failed to copy QR code. Please try downloading instead.",
        variant: "destructive"
      });
    }
  };

  const renderForm = () => {
    switch (activeType) {
      case 'text':
        return <TextQRForm onGenerate={generateQR} />;
      case 'url':
        return <URLQRForm onGenerate={generateQR} />;
      case 'contact':
        return <ContactQRForm onGenerate={generateQR} />;
      case 'wifi':
        return <WiFiQRForm onGenerate={generateQR} />;
      case 'sms':
        return <SMSQRForm onGenerate={generateQR} />;
      case 'email':
        return <EmailQRForm onGenerate={generateQR} />;
      default:
        return <TextQRForm onGenerate={generateQR} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Comprehensive QR Code Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Create QR codes for URLs, text, contact info, WiFi passwords, and more!
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 text-center">Choose QR Code Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Resolution Selector */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Resolution:</span>
              </div>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  {resolutionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-gray-500">PNG format</span>
            </div>

            {/* Horizontal Scrollable Cards */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 min-w-max px-4 py-2">
                {qrTypes.map((type) => (
                  <QRTypeCard
                    key={type.id}
                    icon={type.icon}
                    title={type.title}
                    description={type.description}
                    isActive={activeType === type.id}
                    onClick={() => setActiveType(type.id)}
                  />
                ))}
              </div>
            </div>

            {/* Form and QR Code Display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {renderForm()}
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className={`border-2 border-gray-200 rounded-lg transition-all duration-300 ${
                      qrDataUrl ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    width={parseInt(resolution)}
                    height={parseInt(resolution)}
                    style={{ maxWidth: '256px', maxHeight: '256px', width: 'auto', height: 'auto' }}
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                  )}
                  {!qrDataUrl && !isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300" style={{ width: '256px', height: '256px' }}>
                      <div className="text-center text-gray-400">
                        <QrCode className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Fill the form to generate QR code</p>
                        <p className="text-xs mt-1">{resolution}x{resolution} PNG</p>
                      </div>
                    </div>
                  )}
                </div>

                {qrDataUrl && (
                  <div className="flex gap-3 animate-in fade-in duration-300">
                    <Button
                      onClick={downloadQR}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy PNG
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Generate high-quality PNG QR codes for any purpose - share instantly and securely!
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default QRGenerator;
