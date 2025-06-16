
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
  const [animationPhase, setAnimationPhase] = useState<'waiting' | 'title' | 'description' | 'complete'>('waiting');

  const words = description.split(' ');

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimationPhase('title');
        setShowTitle(true);
        
        // Начинаем показывать слова через 500мс после заголовка
        setTimeout(() => {
          setAnimationPhase('description');
          
          const wordTimers: NodeJS.Timeout[] = [];
          words.forEach((_, index) => {
            const timer = setTimeout(() => {
              setVisibleWords(prev => [...prev, index]);
            }, index * 150); // Каждое слово появляется через 150мс
            wordTimers.push(timer);
          });

          // После показа всех слов, начинаем исчезновение через 3 секунды
          const hideTimer = setTimeout(() => {
            // Сначала скрываем слова по одному (в обратном порядке)
            const hideWordTimers: NodeJS.Timeout[] = [];
            for (let i = words.length - 1; i >= 0; i--) {
              const timer = setTimeout(() => {
                setVisibleWords(prev => prev.filter(wordIndex => wordIndex !== i));
              }, (words.length - 1 - i) * 100);
              hideWordTimers.push(timer);
            }

            // Затем скрываем заголовок
            setTimeout(() => {
              setShowTitle(false);
              setAnimationPhase('waiting');
              
              // Перезапускаем анимацию через 2 секунды
              setTimeout(() => {
                setAnimationPhase('title');
                setShowTitle(true);
                setVisibleWords([]);
                
                setTimeout(() => {
                  setAnimationPhase('description');
                  words.forEach((_, index) => {
                    setTimeout(() => {
                      setVisibleWords(prev => [...prev, index]);
                    }, index * 150);
                  });
                }, 500);
              }, 2000);
            }, words.length * 100 + 500);

            return () => {
              hideWordTimers.forEach(clearTimeout);
            };
          }, words.length * 150 + 3000);

          return () => {
            wordTimers.forEach(clearTimeout);
            clearTimeout(hideTimer);
          };
        }, 500);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, words.length]);

  return (
    <div 
      ref={ref}
      className="bg-white rounded-lg p-4 sm:p-6 shadow-lg border border-gray-200 min-h-[160px] flex flex-col"
    >
      <div className="flex items-center gap-3 mb-4 justify-center">
        <div className={cn(
          "w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r rounded-lg flex items-center justify-center transition-all duration-300",
          `${gradient}`,
          showTitle ? "scale-100 opacity-100" : "scale-75 opacity-50"
        )}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <h3 className={cn(
          "font-bold text-gray-900 text-sm sm:text-base transition-all duration-500",
          showTitle 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-2"
        )}>
          {title}
        </h3>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center min-h-[3rem] flex flex-wrap items-center justify-center gap-1">
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
