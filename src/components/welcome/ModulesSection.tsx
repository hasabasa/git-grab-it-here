
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const ModulesSection = () => {
  const [modulesRef, visibleModules] = useStaggeredScrollAnimation(6, 200);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
    </svg>
  );

  const modules = [
    {
      title: "Бот демпинга",
      description: "Динамическое ценообразование для опережения конкурентов",
      icon: "🔥",
      color: "from-red-500 to-orange-500",
      example: "Автоматически снижает цену на 50₸ при изменении у конкурентов",
      stats: "+15% к продажам",
      animatedValue: "50₸",
      animatedText: "цена снижена"
    },
    {
      title: "Мои продажи",
      description: "Статистика и аналитика продаж",
      icon: "📈",
      color: "from-green-500 to-emerald-500",
      example: "Доход за месяц: 2,450,000₸ (+12% к прошлому месяцу)",
      stats: "Рост 23%",
      animatedValue: "2,450,000₸",
      animatedText: "+12% рост"
    },
    {
      title: "Юнит-экономика",
      description: "Расчет прибыли с учетом комиссий и доставки",
      icon: "🔢",
      color: "from-blue-500 to-cyan-500",
      example: "Чистая прибыль: 3,240₸ (32% маржа) с товара",
      stats: "32% маржа",
      animatedValue: "3,240₸",
      animatedText: "32% маржа"
    },
    {
      title: "CRM и напоминания",
      description: "Работа с клиентами и задачами",
      icon: "✅",
      color: "from-purple-500 to-violet-500",
      example: "15 активных клиентов, 3 задачи на сегодня",
      stats: "94% выполнено",
      animatedValue: "15",
      animatedText: "активных клиентов"
    },
    {
      title: "WhatsApp",
      description: "Интеграция с WhatsApp для общения с клиентами",
      icon: "whatsapp",
      color: "from-emerald-500 to-green-500",
      example: "127 сообщений обработано автоматически",
      stats: "98% отвечено",
      animatedValue: "127",
      animatedText: "сообщений обработано"
    },
    {
      title: "Поиск ниш",
      description: "Анализ спроса и предложения",
      icon: "📊",
      color: "from-indigo-500 to-purple-500",
      example: "Найдено 8 перспективных ниш с низкой конкуренцией",
      stats: "8 новых ниш",
      animatedValue: "8",
      animatedText: "новых ниш найдено"
    }
  ];

  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollAnimation animation="slide-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Мощные инструменты для роста</h2>
            <p className="text-lg text-gray-600">
              Комплексное решение для автоматизации и оптимизации вашего бизнеса
            </p>
          </div>
        </ScrollAnimation>

        <div ref={modulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {modules.map((module, index) => (
            <ScrollAnimation
              key={module.title}
              animation="scale"
              delay={visibleModules.includes(index) ? index * 200 : 0}
              className={`group opacity-100 ${visibleModules.includes(index) ? 'animate-fade-in-scale' : ''}`}
            >
              <Card className="overflow-hidden smooth-hover h-full border bg-white shadow-xl">
                <CardHeader className="pb-4">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center mb-4 transition-all duration-300 text-white`}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    {module.icon === "whatsapp" ? <WhatsAppIcon /> : <span className="text-4xl">{module.icon}</span>}
                  </motion.div>
                  <CardTitle className="text-xl mb-2 text-gray-900">{module.title}</CardTitle>
                  <p className="text-gray-700 text-sm leading-relaxed">{module.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  
                  <motion.div className="bg-gray-50 p-4 rounded-lg mb-4 relative overflow-hidden border border-gray-200 transition-all duration-300" whileHover={{
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    backgroundColor: "#f8fafc",
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}>
                    <motion.div className="flex items-center justify-between mb-3" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center gap-2">
                        <motion.div className="w-2 h-2 bg-green-500 rounded-full relative" whileHover={{
                          scale: [1, 1.4, 1],
                          boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 6px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"],
                          transition: { duration: 1, repeat: 2, ease: "easeInOut" }
                        }}>
                          <motion.div className="absolute inset-0 bg-green-400 rounded-full" whileHover={{
                            opacity: [0.5, 1, 0.5],
                            transition: { duration: 0.8, repeat: 2, ease: "easeInOut" }
                          }} />
                        </motion.div>
                        <motion.span className="text-xs font-bold text-gray-500 tracking-wider" whileHover={{
                          scale: 1.1,
                          color: "#059669",
                          transition: { duration: 0.1 }
                        }}>
                          LIVE ПРИМЕР
                        </motion.span>
                      </div>
                      <motion.div whileHover={{
                        rotate: 360,
                        scale: 1.2,
                        transition: { duration: 0.5 }
                      }}>
                        <Activity className="h-3 w-3 text-blue-500" />
                      </motion.div>
                    </motion.div>
                    
                    <motion.div className="space-y-3" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                      <motion.p className="text-sm text-gray-700 font-medium leading-relaxed" whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.1 }
                      }}>
                        {module.example}
                      </motion.p>
                      
                      <motion.div className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-100" whileHover={{
                        backgroundColor: "#fafafa",
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}>
                        <motion.div className="flex items-center gap-2" whileHover={{
                          x: 2,
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}>
                          <motion.div whileHover={{
                            rotate: 15,
                            scale: 1.3,
                            transition: { duration: 0.2 }
                          }}>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </motion.div>
                          <motion.span className="text-xs font-semibold text-green-600" whileHover={{
                            scale: 1.1,
                            color: "#047857",
                            transition: { duration: 0.1 }
                          }}>
                            {module.stats}
                          </motion.span>
                        </motion.div>

                        <motion.div className="text-right" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                          <motion.div className="text-xs font-bold text-blue-600" whileHover={{
                            y: -2,
                            transition: { duration: 0.1 }
                          }}>
                            {module.animatedValue}
                          </motion.div>
                          <motion.div className="text-xs text-gray-500" whileHover={{
                            transition: { duration: 0.1 }
                          }}>
                            {module.animatedText}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <motion.div className="absolute top-2 right-2" whileHover={{
                      scale: 1.2,
                      rotate: 10,
                      transition: { duration: 0.2 }
                    }}>
                      <motion.div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold border border-green-200" whileHover={{
                        backgroundColor: "#dcfce7",
                        transition: { duration: 0.2 }
                      }}>
                        <motion.span whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}>
                          LIVE
                        </motion.span>
                      </motion.div>
                    </motion.div>

                    <motion.div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 w-0" whileHover={{
                      width: "100%",
                      transition: { duration: 0.8, ease: "easeInOut" }
                    }} />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
                    <Button onClick={scrollToPricing} className="w-full group-hover:bg-primary/90 transition-all duration-300 relative overflow-hidden smooth-hover">
                      <motion.span className="relative z-10" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                        Перейти к модулю
                      </motion.span>
                      <motion.div className="ml-2 relative z-10" whileHover={{
                        x: 4,
                        transition: { duration: 0.2 }
                      }}>
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                      
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 translate-x-[-100%]" whileHover={{
                        translateX: "100%",
                        transition: { duration: 0.5, ease: "easeInOut" }
                      }} />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModulesSection;
