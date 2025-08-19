
import QRGenerator from '@/components/QRGenerator';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center text-white">
      <Header showAppButton={false} />
      <QRGenerator />
    </div>
  );
};

export default Index;
