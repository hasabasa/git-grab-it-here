import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, CheckCircle, Crown, Zap, Activity, Brain, Shield, Target } from "lucide-react";
import { motion } from "framer-motion";
import DemoModeButton from "@/components/auth/DemoModeButton";
import Footer from "@/components/layout/Footer";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

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
      path: "/dashboard/niche-search",
      icon: "📊",
      color: "from-indigo-500 to-purple-500",
      example: "Найдено 8 перспективных ниш с низкой конкуренцией",
      stats: "8 новых ниш",
      animatedValue: "8",
      animatedText: "новых ниш найдено"
    }
  ];

  const [featuresRef, visibleFeatures] = useStaggeredScrollAnimation(6, 150);
  const [modulesRef, visibleModules] = useStaggeredScrollAnimation(6, 200);

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-x-hidden">
      {/* Hero Section with enhanced visual integration */}
      <div className="relative overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-cyan-600/10 animate-gradient-shift bg-[length:400%_400%]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full filter blur-3xl animate-float float-delayed" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <ScrollAnimation animation="fade" delay={200}>
            <div className="text-center mb-16">
              <ScrollAnimation animation="scale" delay={400}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6 glass-enhanced">
                  <Crown className="h-4 w-4" />
                  Платформа №1 для продавцов Kaspi
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-up" delay={600}>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                  Kaspi Price
                </h1>
              </ScrollAnimation>
              
              <ScrollAnimation animation="fade" delay={800}>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                  Интеллектуальная платформа для предпринимателей и компаний, работающих на маркетплейсе Kaspi.kz. 
                  Мы разработали это решение, чтобы вы могли автоматизировать рутинные задачи, повысить прибыль и получить полный контроль над вашим бизнесом.
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-up" delay={1000}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                  <div className="glass-enhanced rounded-lg p-6 smooth-hover ambient-glow">
                    <div className="flex items-center gap-3 mb-3 justify-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">На основе данных</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Принимайте решения на основе данных, а не интуиции. Получайте точную аналитику для роста бизнеса.
                    </p>
                  </div>
                  
                  <div className="glass-enhanced rounded-lg p-6 smooth-hover ambient-glow">
                    <div className="flex items-center gap-3 mb-3 justify-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Всё в одном</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Объединяем аналитику, автоценообразование, юнит-экономику, CRM в одном интерфейсе.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="scale" delay={1200}>
                <p className="text-lg text-gray-700 font-medium mb-8">
                  🎯 Хотите подключиться и попробовать бесплатно?<br />
                  <span className="text-blue-600">Демо-режим доступен без регистрации — начните прямо сейчас!</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
                  <DemoModeButton />
                  <Link to="/auth" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full text-lg py-6 px-8 smooth-hover">
                      <Crown className="mr-2 h-5 w-5" />
                      Получить полный доступ
                    </Button>
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
        
        {/* Seamless transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-slate-100/50" />
      </div>

      {/* Why Choose Section with enhanced integration */}
      <div className="py-20 bg-gradient-to-r from-slate-100/80 to-blue-100/80 section-transition">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimation animation="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Почему выбирают Kaspi Price</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Наша цель — сделать управление интернет-магазином простым, понятным и прибыльным. 
                Kaspi Price объединяет в себе мощные инструменты аналитики, автоценообразования, расчёта юнит-экономики, CRM и многое другое — всё в одном интерфейсе.
              </p>
            </div>
          </ScrollAnimation>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Автоматическое ценообразование",
                description: "Автоматическое обновление цен и борьба с демпингом без лишних усилий",
                color: "from-red-500 to-orange-500"
              },
              {
                icon: "📊",
                title: "Глубокая аналитика",
                description: "Подробная аналитика продаж и прибыли для принятия взвешенных решений",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "📦",
                title: "Управление товарами",
                description: "Удобное управление товарами и категориями в одном интерфейсе",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: "👥",
                title: "CRM система",
                description: "Построение эффективных отношений с клиентами через встроенную CRM",
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: "💡",
                title: "Поиск ниш",
                description: "Находите перспективные ниши для роста и расширения бизнеса",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: "🔢",
                title: "Юнит-экономика",
                description: "Точный расчёт прибыли с учётом всех комиссий и расходов",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <ScrollAnimation 
                key={index} 
                animation="slide-up" 
                delay={visibleFeatures.includes(index) ? index * 150 : 0}
                className={`opacity-0 ${visibleFeatures.includes(index) ? 'animate-slide-in-up' : ''}`}
              >
                <Card className="h-full glass-enhanced border-0 smooth-hover ambient-glow group">
                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-3xl">{feature.icon}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-3 text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 leading-relaxed text-center px-6 pb-8">
                    {feature.description}
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        
          {/* Smooth transition overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-white/20 to-white/60" />
        </div>
      </div>

      {/* Modules Section with enhanced effects */}
      <div className="max-w-7xl mx-auto px-6 py-20 section-transition">
        <ScrollAnimation animation="slide-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Мощные инструменты для роста</h2>
            <p className="text-lg text-gray-600">
              Комплексное решение для автоматизации и оптимизации вашего бизнеса
            </p>
          </div>
        </ScrollAnimation>

        <div ref={modulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <ScrollAnimation
              key={module.path}
              animation="scale"
              delay={visibleModules.includes(index) ? index * 200 : 0}
              className={`group opacity-0 ${visibleModules.includes(index) ? 'animate-fade-in-scale' : ''}`}
            >
              <Card className="overflow-hidden smooth-hover glass-enhanced h-full border-0 ambient-glow">
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
                  <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <motion.div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg mb-4 relative overflow-hidden border-2 border-transparent transition-all duration-300" whileHover={{
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))",
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
                      <motion.p className="text-sm text-gray-700 font-medium leading-relaxed opacity-80" whileHover={{
                        opacity: 1,
                        scale: 1.02,
                        transition: { duration: 0.1 }
                      }}>
                        {module.example}
                      </motion.p>
                      
                      <motion.div className="flex items-center justify-between bg-white/70 p-3 rounded-md" whileHover={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
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
                            opacity: 1,
                            y: -2,
                            transition: { duration: 0.1 }
                          }}>
                            {module.animatedValue}
                          </motion.div>
                          <motion.div className="text-xs text-gray-500" whileHover={{
                            opacity: 0.8,
                            transition: { duration: 0.1 }
                          }}>
                            {module.animatedText}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent -skew-x-12 opacity-0" whileHover={{
                      x: ["-100%", "200%"],
                      opacity: [0, 0.8, 0],
                      transition: { duration: 0.8, ease: "easeInOut" }
                    }} />

                    <motion.div className="absolute top-2 right-2" whileHover={{
                      scale: 1.2,
                      rotate: 10,
                      transition: { duration: 0.2 }
                    }}>
                      <motion.div className="text-xs bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-2 py-1 rounded-full font-bold border border-green-200/50" whileHover={{
                        background: "linear-gradient(to right, #a7f3d0, #93c5fd)",
                        transition: { duration: 0.2 }
                      }}>
                        <motion.span whileHover={{
                          opacity: 1,
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}>
                          LIVE
                        </motion.span>
                      </motion.div>
                    </motion.div>

                    <motion.div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0" whileHover={{
                      width: ["0%", "100%"],
                      opacity: [0, 0.7, 0.7],
                      transition: { duration: 0.8, ease: "easeInOut" }
                    }} />
                  </motion.div>

                  <Link to={module.path}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
                      <Button className="w-full group-hover:bg-primary/90 transition-all duration-300 relative overflow-hidden smooth-hover">
                        <motion.span className="relative z-10" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                          Перейти к модулю
                        </motion.span>
                        <motion.div className="ml-2 relative z-10" whileHover={{
                          x: 4,
                          transition: { duration: 0.2 }
                        }}>
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                        
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" initial={{
                          x: "-100%"
                        }} whileHover={{
                          x: "100%",
                          transition: { duration: 0.5, ease: "easeInOut" }
                        }} />
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Focus on Growth Section with enhanced visual effects */}
      <div className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-purple-900 section-transition relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl float-delayed" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollAnimation animation="scale">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 smooth-hover">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Сосредоточьтесь на росте
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Kaspi Price помогает вам принимать решения на основе данных, а не на интуиции. 
                С нами вы сможете сосредоточиться на росте и масштабировании бизнеса — всё остальное мы возьмём на себя.
              </p>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slide-up" delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-enhanced bg-white/10 rounded-lg p-6 smooth-hover">
                <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                <div className="text-white">Довольных клиентов</div>
              </div>
              <div className="glass-enhanced bg-white/10 rounded-lg p-6 smooth-hover">
                <div className="text-3xl font-bold text-green-400 mb-2">40%</div>
                <div className="text-white">Рост продаж</div>
              </div>
              <div className="glass-enhanced bg-white/10 rounded-lg p-6 smooth-hover">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-white">Поддержка</div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade" delay={400}>
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg py-6 px-8 smooth-hover">
                Начать прямо сейчас
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </ScrollAnimation>
        </div>
      </div>

      {/* Pricing Section with enhanced glass effects */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 py-20 section-transition relative">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimation animation="slide-up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Выберите свой план</h2>
              <p className="text-xl text-gray-300">
                Начните бесплатно или получите полный доступ к платформе
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demo Plan */}
            <ScrollAnimation animation="slide-left" delay={200}>
              <Card className="relative overflow-hidden h-full glass-enhanced border-2 border-gray-200 smooth-hover ambient-glow">
                <CardHeader className="text-center pb-8">
                  <div className="mb-4">
                    <Zap className="h-12 w-12 text-blue-500 mx-auto" />
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
                    {["Просмотр всех модулей", "Тестовые данные", "Изучение интерфейса", "Понимание возможностей", "Без ограничений по времени"].map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <DemoModeButton />
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Pro Plan */}
            <ScrollAnimation animation="slide-right" delay={400}>
              <Card className="relative overflow-hidden h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl smooth-hover">
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
                    {["Полный доступ ко всем модулям", "Неограниченное количество товаров", "Сохранение всех данных", "Приоритетная поддержка 24/7", "API для интеграций", "Персональный менеджер"].map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3" />
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/dashboard/subscription">
                    <Button size="lg" className="w-full text-lg py-6 bg-white text-blue-600 hover:bg-gray-100 smooth-hover">
                      <Crown className="mr-2 h-5 w-5" />
                      Начать бесплатный день
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          <ScrollAnimation animation="fade" delay={600}>
            <div className="text-center mt-12">
              <p className="text-gray-300 mb-4">
                💳 Принимаем все виды оплат • 🔒 Безопасные платежи • 📞 Поддержка 24/7
              </p>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 smooth-hover">
                  Зарегистрироваться сейчас
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Trust Section with subtle animations */}
      <div className="py-16 bg-white section-transition">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimation animation="slide-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Доверяют более 500+ продавцов на Kaspi
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2 smooth-hover">
                <Users className="h-5 w-5" />
                <span>500+ активных пользователей</span>
              </div>
              <div className="flex items-center gap-2 smooth-hover">
                <TrendingUp className="h-5 w-5" />
                <span>Рост продаж до 40%</span>
              </div>
              <div className="flex items-center gap-2 smooth-hover">
                <CheckCircle className="h-5 w-5" />
                <span>99.9% время работы</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Footer with seamless integration */}
      <Footer />
    </div>
  );
};

export default Welcome;
