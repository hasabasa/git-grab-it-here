
import React from 'react';
import { cn } from '@/lib/utils';
import '@/styles/loading-animation.css';

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
      <div className="loading-wrapper">
        <div className="box-wrap">
          <div className="box one"></div>
          <div className="box two"></div>
          <div className="box three"></div>
          <div className="box four"></div>
          <div className="box five"></div>
          <div className="box six"></div>
        </div>
      </div>
      
      {text && (
        <div className="mt-8 text-lg font-medium text-gray-700">
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
