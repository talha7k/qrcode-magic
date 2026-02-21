
import QRGenerator from '@/components/QRGenerator';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center text-foreground">
      <Header showAppButton={false} />
      <QRGenerator />
    </div>
  );
};

export default Index;
