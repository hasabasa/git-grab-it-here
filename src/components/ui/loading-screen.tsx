
import React from 'react';
import { cn } from '@/lib/utils';
import LoadingAnimation from './loading-animation';
import LoadingText from './loading-text';

interface LoadingScreenProps {
  className?: string;
  text?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  className,
  text = "Загрузка..." 
}) => {
  return (
    <div className={cn(
      "fixed inset-0 bg-gray-50 flex flex-col items-center justify-center z-50",
      className
    )}>
      <LoadingAnimation />
      <LoadingText text={text} />
    </div>
  );
};

export default LoadingScreen;
