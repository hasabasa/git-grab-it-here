
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Plus, Search, ExternalLink, Users, MessageSquare } from "lucide-react";
import { WhatsAppContact, MessageTemplate } from "@/types";
import ContactsList from "@/components/whatsapp/ContactsList";
import ContactForm from "@/components/whatsapp/ContactForm";
import MessageTemplates from "@/components/whatsapp/MessageTemplates";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Демо данные для контактов
const demoContacts: WhatsAppContact[] = [
  {
    id: "1",
    name: "Алия Нурбекова",
    phone: "+77771234567",
    company: "ТОО Алматы Трейд",
    tags: ["VIP", "Оптовик"],
    lastMessage: "Когда будет следующая поставка?",
    lastMessageDate: "2024-01-10T10:30:00Z",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Ержан Касымов",
    phone: "+77019876543",
    company: "ИП Касымов",
    tags: ["Розница"],
    lastMessage: "Спасибо за заказ!",
    lastMessageDate: "2024-01-09T15:45:00Z",
    status: "active",
    createdAt: "2024-01-05T00:00:00Z"
  },
  {
    id: "3",
    name: "Сауле Жанибекова",
    phone: "+77771112233",
    company: "",
    tags: ["Новый клиент"],
    lastMessage: "Здравствуйте! Интересует ваш товар",
    lastMessageDate: "2024-01-08T09:15:00Z",
    status: "active",
    createdAt: "2024-01-08T00:00:00Z"
  }
];

// Демо данные для шаблонов
const demoTemplates: MessageTemplate[] = [
  {
    id: "1",
    name: "Приветствие нового клиента",
    content: "Здравствуйте! Спасибо за интерес к нашим товарам. Чем могу помочь?",
    category: "Приветствие",
    isDefault: true
  },
  {
    id: "2",
    name: "Подтверждение заказа",
    content: "Ваш заказ принят! Номер заказа: {order_number}. Доставка в течение 2-3 дней.",
    category: "Заказы",
    isDefault: false
  },
  {
    id: "3",
    name: "Напоминание об оплате",
    content: "Добрый день! Напоминаем о необходимости оплаты заказа №{order_number}. Сумма: {amount} тенге.",
    category: "Оплата",
    isDefault: false
  }
];

const WhatsAppPage = () => {
  const [contacts, setContacts] = useState<WhatsAppContact[]>(demoContacts);
  const [templates, setTemplates] = useState<MessageTemplate[]>(demoTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<WhatsAppContact | null>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Фильтрация контактов по поисковому запросу
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenWhatsApp = (phone: string, template?: string) => {
    const formattedPhone = phone.replace(/[^\d]/g, '');
    const message = template ? encodeURIComponent(template) : '';
    const url = `https://web.whatsapp.com/send?phone=${formattedPhone}${message ? `&text=${message}` : ''}`;
    window.open(url, '_blank');
  };

  const handleAddContact = (contactData: Omit<WhatsAppContact, 'id' | 'createdAt'>) => {
    const newContact: WhatsAppContact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setContacts([...contacts, newContact]);
    setIsContactFormOpen(false);
  };

  const activeContactsCount = contacts.filter(c => c.status === 'active').length;
  const totalMessages = contacts.reduce((sum, contact) => contact.lastMessage ? sum + 1 : sum, 0);

  return (
    <div className="space-y-6">
      {/* Заголовок и статистика */}
      <div>
        <h1 className="text-3xl font-bold mb-2">WhatsApp интеграция</h1>
        <p className="text-muted-foreground">
          Управляйте контактами и общайтесь с клиентами через WhatsApp Web
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные контакты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeContactsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего контактов</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Шаблонов сообщений</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Основной контент */}
      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны сообщений</TabsTrigger>
          <TabsTrigger value="web">WhatsApp Web</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          {/* Поиск и добавление контактов */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск контактов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить контакт
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить новый контакт</DialogTitle>
                </DialogHeader>
                <ContactForm onSubmit={handleAddContact} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Список контактов */}
          <ContactsList
            contacts={filteredContacts}
            onOpenWhatsApp={handleOpenWhatsApp}
            templates={templates}
          />
        </TabsContent>

        <TabsContent value="templates">
          <MessageTemplates
            templates={templates}
            onTemplatesChange={setTemplates}
          />
        </TabsContent>

        <TabsContent value="web">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Web</CardTitle>
              <CardDescription>
                Откройте WhatsApp Web для прямого общения с клиентами
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Button
                  onClick={() => window.open('https://web.whatsapp.com', '_blank')}
                  size="lg"
                  className="gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  Открыть WhatsApp Web
                </Button>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">💡 Совет:</h4>
                <p className="text-sm text-muted-foreground">
                  Для удобства работы рекомендуем открыть WhatsApp Web в отдельной вкладке 
                  и использовать кнопки "Написать" рядом с контактами для быстрого перехода к чатам.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppPage;
