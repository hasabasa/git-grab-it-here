
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Welcome = () => {
  const modules = [
    {
      title: "Бот демпинга",
      description: "Динамическое ценообразование для опережения конкурентов",
      path: "/price-bot",
      icon: "🔥"
    },
    {
      title: "Мои продажи",
      description: "Статистика и аналитика продаж",
      path: "/sales",
      icon: "📈"
    },
    {
      title: "Юнит-экономика",
      description: "Расчет прибыли с учетом комиссий и доставки",
      path: "/unit-economics",
      icon: "🔢"
    },
    {
      title: "CRM и напоминания",
      description: "Работа с клиентами и задачами",
      path: "/crm",
      icon: "✅"
    },
    {
      title: "Поиск ниш",
      description: "Анализ спроса и предложения",
      path: "/niche-search",
      icon: "📊"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Добро пожаловать в Kaspi Price
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Платформа для управления ценами, анализа продаж и увеличения прибыли на маркетплейсе Kaspi
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl"
      >
        {modules.map((module) => (
          <motion.div key={module.path} variants={item}>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-0">
                <Link to={module.path}>
                  <div className="p-6 flex flex-col h-full">
                    <div className="text-4xl mb-4">{module.icon}</div>
                    <h2 className="text-2xl font-semibold mb-2">{module.title}</h2>
                    <p className="text-gray-600 flex-grow">{module.description}</p>
                    <Button className="mt-4 w-full">Перейти</Button>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Welcome;
