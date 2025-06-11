
import { Phone, MessageCircle, Mail, MapPin, Clock, Building } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Kaspi Price
            </h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start gap-2">
                <Building className="h-4 w-4 mt-1 text-blue-400" />
                <div>
                  <div className="font-semibold">ТОО "EX-GROUP"</div>
                  <div className="text-sm">БИН: 250440027125</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Адрес</h4>
            <div className="flex items-start gap-2 text-gray-300">
              <MapPin className="h-4 w-4 mt-1 text-blue-400" />
              <div className="text-sm leading-relaxed">
                Казахстан, район Нұра,<br />
                улица Мәншүк Мәметова, дом 2,<br />
                кв/офис 190
              </div>
            </div>
          </motion.div>

          {/* Contacts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Контакты</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-400" />
                <div>
                  <a href="tel:+77082171960" className="hover:text-white transition-colors">
                    +7 (708) 217-19-60
                  </a>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    10:00-18:00
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <div>
                  <a href="https://wa.me/77082171960" className="hover:text-white transition-colors">
                    WhatsApp: +7 (708) 217-19-60
                  </a>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    10:00-18:00
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:dev@eternal-ai.kz" className="hover:text-white transition-colors">
                  dev@eternal-ai.kz
                </a>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Информация</h4>
            <div className="space-y-2">
              <div>
                <a 
                  href="https://eternal-ai.kz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Разработка: eternal-ai.kz
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Договор оферты
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Политика конфиденциальности
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 ТОО "EX-GROUP". Все права защищены.
            </div>
            <div className="text-gray-400 text-sm">
              Платформа для автоматизации продаж на Kaspi.kz
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
