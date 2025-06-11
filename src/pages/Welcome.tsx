
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight, TrendingUp, Users, Calculator, MessageSquare, Search, CheckCircle, Crown, Play, Zap, Activity, BarChart3 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import DemoModeButton from "@/components/auth/DemoModeButton";

const Welcome = () => {
  const modules = [
    {
      title: "Бот демпинга",
      description: "Динамическое ценообразование для опережения конкурентов",
      path: "/dashboard/price-bot",
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
      path: "/dashboard/sales",
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
      path: "/dashboard/unit-economics",
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
      path: "/dashboard/crm",
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
      path: "/dashboard/whatsapp",
      icon: "💬",
      color: "from-emerald-500 to-green-500",
      example: "127 сообщений обработано автоматически",
      stats: "98% отвечено",
      animatedValue: "127",
      animatedText: "сообщений обработано"
    },
    {
      title: "Поиск ниш",
      description: "Анализ спроса и предложения",
      path: "/dashboard/niche-search",
      icon: "📊",
      color: "from-indigo-500 to-purple-500",
      example: "Найдено 8 перспективных ниш с низкой конкуренцией",
      stats: "8 новых ниш",
      animatedValue: "8",
      animatedText: "новых ниш найдено"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Crown className="h-4 w-4" />
              Платформа №1 для продавцов Kaspi
            </motion.div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Kaspi Price
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Автоматизируйте управление ценами, анализируйте продажи и увеличивайте прибыль 
              на маркетплейсе Kaspi с помощью искусственного интеллекта
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-12 max-w-4xl mx-auto">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700 font-medium">
                🚀 Демо-режим активен! Все модули доступны для просмотра. 
                Зарегистрируйтесь для сохранения данных и полного доступа.
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Мощные инструменты для роста</h2>
          <p className="text-lg text-gray-600">
            Комплексное решение для автоматизации и оптимизации вашего бизнеса
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {modules.map((module, index) => (
            <motion.div
              key={module.path}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center text-4xl mb-4 transition-all duration-300`}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    {module.icon}
                  </motion.div>
                  <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <motion.div 
                    className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg mb-4 relative overflow-hidden border-2 border-transparent transition-all duration-300"
                    whileHover={{
                      borderColor: "rgba(59, 130, 246, 0.3)",
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))",
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Header with LIVE indicator */}
                    <motion.div 
                      className="flex items-center justify-between mb-3"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full relative"
                          whileHover={{
                            scale: [1, 1.4, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.7)",
                              "0 0 0 6px rgba(34, 197, 94, 0)",
                              "0 0 0 0 rgba(34, 197, 94, 0)"
                            ],
                            transition: { 
                              duration: 1,
                              repeat: 2,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-green-400 rounded-full"
                            whileHover={{
                              opacity: [0.5, 1, 0.5],
                              transition: {
                                duration: 0.8,
                                repeat: 2,
                                ease: "easeInOut"
                              }
                            }}
                          />
                        </motion.div>
                        <motion.span 
                          className="text-xs font-bold text-gray-500 tracking-wider"
                          whileHover={{
                            scale: 1.1,
                            color: "#059669",
                            transition: { duration: 0.1 }
                          }}
                        >
                          LIVE ПРИМЕР
                        </motion.span>
                      </div>

                      {/* Activity indicator */}
                      <motion.div
                        whileHover={{
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.5 }
                        }}
                      >
                        <Activity className="h-3 w-3 text-blue-500" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Main content */}
                    <motion.div
                      className="space-y-3"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.p 
                        className="text-sm text-gray-700 font-medium leading-relaxed opacity-80"
                        whileHover={{
                          opacity: 1,
                          scale: 1.02,
                          transition: { duration: 0.1 }
                        }}
                      >
                        {module.example}
                      </motion.p>
                      
                      {/* Stats with enhanced animation */}
                      <motion.div 
                        className="flex items-center justify-between bg-white/70 p-3 rounded-md"
                        whileHover={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{
                            x: 2,
                            scale: 1.05,
                            transition: { duration: 0.1 }
                          }}
                        >
                          <motion.div
                            whileHover={{
                              rotate: 15,
                              scale: 1.3,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </motion.div>
                          <motion.span 
                            className="text-xs font-semibold text-green-600"
                            whileHover={{
                              scale: 1.1,
                              color: "#047857",
                              transition: { duration: 0.1 }
                            }}
                          >
                            {module.stats}
                          </motion.span>
                        </motion.div>

                        {/* Animated value display */}
                        <motion.div
                          className="text-right"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="text-xs font-bold text-blue-600"
                            whileHover={{
                              opacity: 1,
                              y: -2,
                              transition: { duration: 0.1 }
                            }}
                          >
                            {module.animatedValue}
                          </motion.div>
                          <motion.div
                            className="text-xs text-gray-500"
                            whileHover={{
                              opacity: 0.8,
                              transition: { duration: 0.1 }
                            }}
                          >
                            {module.animatedText}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Animated background effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent -skew-x-12 opacity-0"
                      whileHover={{
                        x: ["-100%", "200%"],
                        opacity: [0, 0.8, 0],
                        transition: { duration: 0.8, ease: "easeInOut" }
                      }}
                    />

                    {/* Corner accent */}
                    <motion.div
                      className="absolute top-2 right-2"
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div 
                        className="text-xs bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-2 py-1 rounded-full font-bold border border-green-200/50"
                        whileHover={{
                          background: "linear-gradient(to right, #a7f3d0, #93c5fd)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.span
                          whileHover={{
                            opacity: 1,
                            scale: 1.05,
                            transition: { duration: 0.1 }
                          }}
                        >
                          LIVE
                        </motion.span>
                      </motion.div>
                    </motion.div>

                    {/* Progress bar effect - only on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0"
                      whileHover={{
                        width: ["0%", "100%"],
                        opacity: [0, 0.7, 0.7],
                        transition: { duration: 0.8, ease: "easeInOut" }
                      }}
                    />
                  </motion.div>

                  <Link to={module.path}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Button className="w-full group-hover:bg-primary/90 transition-all duration-300 relative overflow-hidden">
                        <motion.span
                          className="relative z-10"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          Перейти к модулю
                        </motion.span>
                        <motion.div
                          className="ml-2 relative z-10"
                          whileHover={{
                            x: 4,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                        
                        {/* Button hover effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
                          initial={{ x: "-100%" }}
                          whileHover={{
                            x: "100%",
                            transition: { duration: 0.5, ease: "easeInOut" }
                          }}
                        />
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Выберите свой план</h2>
            <p className="text-xl text-gray-300">
              Начните бесплатно или получите полный доступ к платформе
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Demo Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="relative overflow-hidden h-full bg-white/95 backdrop-blur-sm border-2 border-gray-200">
                <CardHeader className="text-center pb-8">
                  <div className="mb-4">
                    <Play className="h-12 w-12 text-blue-500 mx-auto" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Демо-режим</CardTitle>
                  <p className="text-gray-600">Попробуйте все функции бесплатно</p>
                  
                  <div className="mt-6">
                    <div className="text-4xl font-bold text-gray-900">Бесплатно</div>
                    <p className="text-gray-500 mt-2">Полный доступ к просмотру</p>
                  </div>
                </CardHeader>

                <CardContent className="px-8">
                  <div className="space-y-4 mb-8">
                    {[
                      "Просмотр всех модулей",
                      "Тестовые данные",
                      "Изучение интерфейса",
                      "Понимание возможностей",
                      "Без ограничений по времени"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <DemoModeButton />
                </CardContent>
              </Card>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="relative overflow-hidden h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-400 text-yellow-900 font-semibold">
                    ПОПУЛЯРНЫЙ
                  </Badge>
                </div>
                
                <CardHeader className="text-center pb-8">
                  <div className="mb-4">
                    <Crown className="h-12 w-12 text-yellow-400 mx-auto" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Pro план</CardTitle>
                  <p className="text-blue-100">Все возможности для профессионалов</p>
                  
                  <div className="mt-6">
                    <div className="text-4xl font-bold">10 990 ₸</div>
                    <p className="text-blue-100 mt-2">/месяц • Первый день бесплатно</p>
                  </div>
                </CardHeader>

                <CardContent className="px-8">
                  <div className="space-y-4 mb-8">
                    {[
                      "Полный доступ ко всем модулям",
                      "Неограниченное количество товаров",
                      "Сохранение всех данных",
                      "Приоритетная поддержка 24/7",
                      "API для интеграций",
                      "Персональный менеджер"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3" />
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/dashboard/subscription">
                    <Button size="lg" className="w-full text-lg py-6 bg-white text-blue-600 hover:bg-gray-100">
                      <Crown className="mr-2 h-5 w-5" />
                      Начать бесплатный день
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-gray-300 mb-4">
              💳 Принимаем все виды оплат • 🔒 Безопасные платежи • 📞 Поддержка 24/7
            </p>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Зарегистрироваться сейчас
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Доверяют более 500+ продавцов на Kaspi
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>500+ активных пользователей</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>Рост продаж до 40%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>99.9% время работы</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
