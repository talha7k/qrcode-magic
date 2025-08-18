
import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { QrCode, Download, Copy, Check, Type, Globe, User, Wifi, MessageSquare, Mail, Settings, Save, FolderOpen, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { storage, QREntry, QRSettings, SessionData } from '@/lib/storage';
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
  const [logoSpace, setLogoSpace] = useState(false);
  const [logoSize, setLogoSize] = useState([20]); // Percentage of QR code size
  const [logoShape, setLogoShape] = useState('circle'); // 'circle' or 'square'
  const [showBorder, setShowBorder] = useState(true); // Toggle for border visibility
  const [borderThickness, setBorderThickness] = useState([2]); // Border thickness in pixels
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const [currentQRData, setCurrentQRData] = useState('');
  
  // Saved entries state
  const [savedEntries, setSavedEntries] = useState<QREntry[]>([]);
  const [currentFormData, setCurrentFormData] = useState<any>({});
  const [showSavedEntries, setShowSavedEntries] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = () => {
      // Load saved entries
      const entries = storage.getSavedEntries();
      setSavedEntries(entries);
      
      // Load session data
      const sessionData = storage.getSessionData();
      if (sessionData) {
        setActiveType(sessionData.activeType);
        setCurrentFormData(sessionData.currentFormData);
        
        // Load settings
        if (sessionData.settings) {
          setResolution(sessionData.settings.resolution);
          setLogoSpace(sessionData.settings.logoSpace);
          setLogoSize(sessionData.settings.logoSize);
          setLogoShape(sessionData.settings.logoShape);
          setShowBorder(sessionData.settings.showBorder);
          setBorderThickness(sessionData.settings.borderThickness);
        }
      }
    };
    
    loadSavedData();
  }, []);
  
  // Auto-save session data
  useEffect(() => {
    const sessionData: SessionData = {
      activeType,
      currentFormData,
      settings: {
        resolution,
        logoSpace,
        logoSize,
        logoShape,
        showBorder,
        borderThickness
      }
    };
    
    storage.saveSessionData(sessionData);
  }, [activeType, currentFormData, resolution, logoSpace, logoSize, logoShape, showBorder, borderThickness]);

  // Regenerate QR code when logo settings change
  useEffect(() => {
    if (currentQRData && qrDataUrl) {
      generateQR(currentQRData);
    }
  }, [logoSpace, logoSize, logoShape, showBorder, borderThickness]);

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
      setCurrentQRData('');
      return;
    }

    setCurrentQRData(inputText);
    setIsLoading(true);
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        const size = parseInt(resolution);
        // Configure QR options based on logo space requirements
        const qrOptions = {
          width: size,
          margin: 2,
          errorCorrectionLevel: logoSpace ? 'M' : 'L', // Medium error correction for logo space
          color: {
            dark: '#000000'
            // No light color specified for transparent background
          }
        };
        
        // Clear canvas first to ensure transparency
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        await QRCode.toCanvas(canvas, inputText, qrOptions);
        
        // If logo space is enabled, create a clean center area
        if (logoSpace) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const logoSizePixels = Math.min(canvas.width, canvas.height) * (logoSize[0] / 100);
            const borderWidth = showBorder ? borderThickness[0] : 0;
            
            // Enable high-quality rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Save the current state
            ctx.save();
            
            if (logoShape === 'circle') {
              // Clear the center area first
              ctx.globalCompositeOperation = 'destination-out';
              ctx.beginPath();
              ctx.arc(centerX, centerY, logoSizePixels / 2 + borderWidth, 0, 2 * Math.PI);
              ctx.fill();
              
              // Add border if enabled
              if (showBorder && borderWidth > 0) {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = borderWidth;
                ctx.beginPath();
                ctx.arc(centerX, centerY, logoSizePixels / 2 + borderWidth / 2, 0, 2 * Math.PI);
                ctx.stroke();
              }
            } else {
              // Square shape
              const halfSize = logoSizePixels / 2;
              
              // Clear the center area first
              ctx.globalCompositeOperation = 'destination-out';
              ctx.fillRect(centerX - halfSize - borderWidth, centerY - halfSize - borderWidth, 
                          logoSizePixels + (borderWidth * 2), logoSizePixels + (borderWidth * 2));
              
              // Add border if enabled
              if (showBorder && borderWidth > 0) {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = borderWidth;
                ctx.strokeRect(centerX - halfSize - borderWidth / 2, centerY - halfSize - borderWidth / 2, 
                              logoSizePixels + borderWidth, logoSizePixels + borderWidth);
              }
            }
            
            ctx.restore();
          }
        }
        
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
  
  // Save current entry
  const saveCurrentEntry = () => {
    if (!currentQRData || !currentFormData) {
      toast({
        title: "Nothing to save",
        description: "Please fill out the form and generate a QR code first.",
        variant: "destructive"
      });
      return;
    }
    
    const entryName = prompt('Enter a name for this QR code:');
    if (!entryName) return;
    
    try {
      const newEntry = storage.saveEntry({
        name: entryName,
        type: activeType,
        data: currentFormData
      });
      
      setSavedEntries(prev => [...prev, newEntry]);
      
      toast({
        title: "Saved!",
        description: `QR code "${entryName}" has been saved.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save QR code. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Load saved entry
  const loadSavedEntry = (entry: QREntry) => {
    setActiveType(entry.type);
    setCurrentFormData(entry.data);
    setShowSavedEntries(false);
    
    toast({
      title: "Loaded!",
      description: `QR code "${entry.name}" has been loaded.`,
    });
  };
  
  // Delete saved entry
  const deleteSavedEntry = (entryId: string) => {
    if (confirm('Are you sure you want to delete this saved QR code?')) {
      storage.deleteEntry(entryId);
      setSavedEntries(prev => prev.filter(entry => entry.id !== entryId));
      
      toast({
        title: "Deleted!",
        description: "Saved QR code has been deleted.",
      });
    }
  };
  
  // Get saved entries for current type
  const getCurrentTypeSavedEntries = () => {
    return savedEntries.filter(entry => entry.type === activeType);
  };

  const renderForm = () => {
    const formProps = {
      onGenerate: generateQR,
      formData: currentFormData,
      onFormDataChange: setCurrentFormData
    };
    
    switch (activeType) {
      case 'text':
        return <TextQRForm {...formProps} />;
      case 'url':
        return <URLQRForm {...formProps} />;
      case 'contact':
        return <ContactQRForm {...formProps} />;
      case 'wifi':
        return <WiFiQRForm {...formProps} />;
      case 'sms':
        return <SMSQRForm {...formProps} />;
      case 'email':
        return <EmailQRForm {...formProps} />;
      default:
        return <TextQRForm {...formProps} />;
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
            {/* Settings */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Resolution Selector */}
              <div className="flex items-center gap-4">
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
              
              {/* Logo Space Toggle */}
              <div className="flex items-center gap-3">
                <Label htmlFor="logo-space" className="text-sm font-medium text-gray-700">
                  Logo Space:
                </Label>
                <Switch
                  id="logo-space"
                  checked={logoSpace}
                  onCheckedChange={setLogoSpace}
                />
                <span className="text-xs text-gray-500">
                  {logoSpace ? 'Center cleared for logo' : 'Standard QR code'}
                </span>
              </div>
            </div>
            
            {/* Logo Customization Controls */}
            {logoSpace && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Logo Space Customization</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Logo Size Slider */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Size: {logoSize[0]}% of QR code
                    </Label>
                    <Slider
                      value={logoSize}
                      onValueChange={setLogoSize}
                      max={40}
                      min={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>10%</span>
                      <span>40%</span>
                    </div>
                  </div>
                  
                  {/* Border Toggle */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Show Border
                    </Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        checked={showBorder}
                        onCheckedChange={setShowBorder}
                      />
                      <span className="text-xs text-gray-500">
                        {showBorder ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Border Thickness Slider - Only show when border is enabled */}
                   {showBorder && (
                     <div className="space-y-2">
                       <Label className="text-sm font-medium text-gray-700">
                         Border: {borderThickness[0]}px thick
                       </Label>
                       <Slider
                         value={borderThickness}
                         onValueChange={setBorderThickness}
                         max={28}
                         min={1}
                         step={1}
                         className="w-full"
                       />
                       <div className="flex justify-between text-xs text-gray-500">
                         <span>1px</span>
                         <span>28px</span>
                       </div>
                     </div>
                   )}
                  
                  {/* Logo Shape Selector */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Shape
                    </Label>
                    <Select value={logoShape} onValueChange={setLogoShape}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select shape" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <strong>Tip:</strong> Use a graphics editor to add your logo to the transparent center area after downloading the QR code.
                </div>
              </div>
            )}

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

            {/* Saved Entries Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Saved {qrTypes.find(t => t.id === activeType)?.title} QR Codes</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={saveCurrentEntry}
                    variant="outline"
                    size="sm"
                    className="border-green-200 hover:border-green-400 hover:bg-green-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Current
                  </Button>
                  <Button
                    onClick={() => setShowSavedEntries(!showSavedEntries)}
                    variant="outline"
                    size="sm"
                    className="border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                  >
                    <FolderOpen className="w-4 h-4 mr-2" />
                    {showSavedEntries ? 'Hide' : 'Show'} Saved ({getCurrentTypeSavedEntries().length})
                  </Button>
                </div>
              </div>
              
              {showSavedEntries && (
                <div className="bg-gray-50 rounded-lg p-4">
                  {getCurrentTypeSavedEntries().length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No saved {qrTypes.find(t => t.id === activeType)?.title.toLowerCase()} QR codes yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {getCurrentTypeSavedEntries().map((entry) => (
                        <div key={entry.id} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800 truncate">{entry.name}</h4>
                            <Button
                              onClick={() => deleteSavedEntry(entry.id)}
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mb-3">
                            Created: {new Date(entry.createdAt).toLocaleDateString()}
                          </p>
                          <Button
                            onClick={() => loadSavedEntry(entry)}
                            size="sm"
                            className="w-full bg-purple-600 hover:bg-purple-700"
                          >
                            Load
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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

      <style>{`
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
