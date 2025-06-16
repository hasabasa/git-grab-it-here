
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface WhatsAppComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppComingSoonModal = ({ isOpen, onClose }: WhatsAppComingSoonModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`
        relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-md w-full
        transform transition-all duration-300 ease-out
        ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Emoji stack */}
          <div className="text-6xl space-y-2">
            <div className="animate-bounce">💬</div>
            <div className="text-4xl animate-pulse">📱</div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900">
            Еще чуть-чуть... 🚀
          </h2>

          {/* Message */}
          <p className="text-gray-600 leading-relaxed text-lg">
            И будет интеграция с WhatsApp 💫
            <br />
            <span className="block mt-2 text-base">
              А пока наслаждайтесь приятными ценами и функциями нашей платформы! ✨
            </span>
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 text-2xl">
            <span className="animate-pulse">🎉</span>
            <span className="animate-bounce delay-100">⭐</span>
            <span className="animate-pulse delay-200">🎯</span>
          </div>

          {/* Action button */}
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Понятно! 👍
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppComingSoonModal;
