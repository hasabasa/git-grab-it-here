
import { useEffect } from 'react';
import { useLoading } from '@/hooks/useLoading';
import LoadingScreen from '@/components/ui/loading-screen';

const Index = () => {
  const { isLoading, stopLoading } = useLoading({
    minDuration: 2000,
    initialLoading: true
  });

  useEffect(() => {
    // Симулируем загрузку данных
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);

    return () => clearTimeout(timer);
  }, [stopLoading]);

  if (isLoading) {
    return <LoadingScreen text="Bot Mark загружается..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Bot Mark</h1>
        <p className="text-xl text-gray-600">Платформа для предпринимателей на Kaspi.kz готова к работе!</p>
      </div>
    </div>
  );
};

export default Index;
