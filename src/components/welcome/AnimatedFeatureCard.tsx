
import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient,
  delay = 0,
}) => {
  const [ref, isVisible] = useScrollAnimation();
  const [showTitle, setShowTitle] = useState(false);
  const [visibleWords, setVisibleWords] = useState<number[]>([]);

  const words = description.split(' ');

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowTitle(true);
        
        setTimeout(() => {
          const wordTimers: NodeJS.Timeout[] = [];
          words.forEach((_, index) => {
            const timer = setTimeout(() => {
              setVisibleWords(prev => [...prev, index]);
            }, index * 150);
            wordTimers.push(timer);
          });

          return () => {
            wordTimers.forEach(clearTimeout);
          };
        }, 500);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, words.length]);

  return (
    <div 
      ref={ref}
      className="bg-white rounded-lg p-4 sm:p-6 shadow-lg border border-gray-200 min-h-[140px] sm:min-h-[160px] flex flex-col overflow-hidden"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 justify-center">
        <div className={cn(
          "w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0",
          `${gradient}`,
          showTitle ? "scale-100 opacity-100" : "scale-75 opacity-50"
        )}>
          <Icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
        </div>
        <h3 className={cn(
          "font-bold text-gray-900 text-sm sm:text-base lg:text-lg transition-all duration-500 text-center leading-tight",
          showTitle 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-2"
        )}>
          {title}
        </h3>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center min-h-[2.5rem] sm:min-h-[3rem] flex flex-wrap items-center justify-center gap-1">
          {words.map((word, index) => (
            <span
              key={index}
              className={cn(
                "transition-all duration-300 inline-block",
                visibleWords.includes(index)
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-1"
              )}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default AnimatedFeatureCard;
