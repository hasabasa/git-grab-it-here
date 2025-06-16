
import React from 'react';
import { cn } from '@/lib/utils';

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

      <style jsx>{`
        .loading-wrapper {
          position: relative;
          width: 200px;
          height: 200px;
          background-color: transparent;
        }

        .box-wrap {
          width: 70%;
          height: 70%;
          margin: calc((100% - 70%) / 2) calc((100% - 70%) / 2);
          position: relative;
          transform: rotate(-45deg);
        }

        .box {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(
            to right,
            hsl(var(--primary)),
            hsl(var(--primary) / 0.8),
            hsl(var(--secondary)),
            hsl(var(--accent)),
            #3b82f6,
            #8b5cf6,
            #06b6d4,
            #10b981,
            #f59e0b,
            hsl(var(--primary)),
            hsl(var(--primary) / 0.8)
          );
          background-position: 0% 50%;
          background-size: 1000% 1000%;
          visibility: hidden;
          border-radius: 8px;
        }

        .box.one {
          animation: moveGradient 15s infinite, oneMove 3.5s infinite;
        }

        .box.two {
          animation: moveGradient 15s infinite, twoMove 3.5s 0.15s infinite;
        }

        .box.three {
          animation: moveGradient 15s infinite, threeMove 3.5s 0.3s infinite;
        }

        .box.four {
          animation: moveGradient 15s infinite, fourMove 3.5s 0.575s infinite;
        }

        .box.five {
          animation: moveGradient 15s infinite, fiveMove 3.5s 0.725s infinite;
        }

        .box.six {
          animation: moveGradient 15s infinite, sixMove 3.5s 0.875s infinite;
        }

        @keyframes moveGradient {
          to {
            background-position: 100% 50%;
          }
        }

        @keyframes oneMove {
          0% {
            visibility: visible;
            clip-path: inset(0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          14.2857% {
            clip-path: inset(0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          28.5714% {
            clip-path: inset(35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          42.8571% {
            clip-path: inset(35% 70% 35% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          57.1428% {
            clip-path: inset(35% 70% 35% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          71.4285% {
            clip-path: inset(0% 70% 70% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          85.7142% {
            clip-path: inset(0% 70% 70% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          100% {
            clip-path: inset(0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
        }

        @keyframes twoMove {
          0% {
            visibility: visible;
            clip-path: inset(0% 70% 70% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          14.2857% {
            clip-path: inset(0% 70% 70% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          28.5714% {
            clip-path: inset(0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          42.8571% {
            clip-path: inset(0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          57.1428% {
            clip-path: inset(35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          71.4285% {
            clip-path: inset(35% 70% 35% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          85.7142% {
            clip-path: inset(35% 70% 35% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          100% {
            clip-path: inset(0% 70% 70% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
        }

        @keyframes threeMove {
          0% {
            visibility: visible;
            clip-path: inset(35% 70% 35% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          14.2857% {
            clip-path: inset(35% 70% 35% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          28.5714% {
            clip-path: inset(0% 70% 70% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          42.8571% {
            clip-path: inset(0% 70% 70% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          57.1428% {
            clip-path: inset(0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          71.4285% {
            clip-path: inset(0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          85.7142% {
            clip-path: inset(35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          100% {
            clip-path: inset(35% 70% 35% 0 round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
        }

        @keyframes fourMove {
          0% {
            visibility: visible;
            clip-path: inset(35% 0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          14.2857% {
            clip-path: inset(35% 0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          28.5714% {
            clip-path: inset(35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          42.8571% {
            clip-path: inset(70% 35% 0% 35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          57.1428% {
            clip-path: inset(70% 35% 0% 35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          71.4285% {
            clip-path: inset(70% 0 0 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          85.7142% {
            clip-path: inset(70% 0 0 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          100% {
            clip-path: inset(35% 0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
        }

        @keyframes fiveMove {
          0% {
            visibility: visible;
            clip-path: inset(70% 0 0 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          14.2857% {
            clip-path: inset(70% 0 0 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          28.5714% {
            clip-path: inset(35% 0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          42.8571% {
            clip-path: inset(35% 0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          57.1428% {
            clip-path: inset(35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          71.4285% {
            clip-path: inset(70% 35% 0% 35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          85.7142% {
            clip-path: inset(70% 35% 0% 35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          100% {
            clip-path: inset(70% 0 0 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
        }

        @keyframes sixMove {
          0% {
            visibility: visible;
            clip-path: inset(70% 35% 0% 35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          14.2857% {
            clip-path: inset(70% 35% 0% 35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          28.5714% {
            clip-path: inset(70% 0 0 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          42.8571% {
            clip-path: inset(70% 0 0 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          57.1428% {
            clip-path: inset(35% 0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          71.4285% {
            clip-path: inset(35% 0% 35% 70% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          85.7142% {
            clip-path: inset(35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
          100% {
            clip-path: inset(70% 35% 0% 35% round 5%);
            animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
