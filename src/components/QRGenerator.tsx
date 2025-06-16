
import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Download, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  const [activeTab, setActiveTab] = useState('text');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQR = async (inputText: string) => {
    if (!inputText.trim()) {
      setQrDataUrl('');
      return;
    }

    setIsLoading(true);
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, inputText, {
          width: 256,
          margin: 2,
          color: {
            dark: '#1a1a1a',
            light: '#ffffff'
          }
        });
        
        const dataUrl = canvas.toDataURL();
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
    link.download = `qr-code-${activeTab}.png`;
    link.href = qrDataUrl;
    link.click();
    
    toast({
      title: "Downloaded!",
      description: "QR code has been saved to your device.",
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
        description: "QR code has been copied to clipboard.",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
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
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="wifi">WiFi</TabsTrigger>
                <TabsTrigger value="sms">SMS</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <TabsContent value="text" className="mt-0">
                    <TextQRForm onGenerate={generateQR} />
                  </TabsContent>
                  
                  <TabsContent value="url" className="mt-0">
                    <URLQRForm onGenerate={generateQR} />
                  </TabsContent>
                  
                  <TabsContent value="contact" className="mt-0">
                    <ContactQRForm onGenerate={generateQR} />
                  </TabsContent>
                  
                  <TabsContent value="wifi" className="mt-0">
                    <WiFiQRForm onGenerate={generateQR} />
                  </TabsContent>
                  
                  <TabsContent value="sms" className="mt-0">
                    <SMSQRForm onGenerate={generateQR} />
                  </TabsContent>
                  
                  <TabsContent value="email" className="mt-0">
                    <EmailQRForm onGenerate={generateQR} />
                  </TabsContent>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      className={`border-2 border-gray-200 rounded-lg transition-all duration-300 ${
                        qrDataUrl ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      width={256}
                      height={256}
                    />
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    )}
                    {!qrDataUrl && !isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-center text-gray-400">
                          <QrCode className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Fill the form to generate QR code</p>
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
                        Download
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
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Generate QR codes for any purpose - share instantly and securely!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
