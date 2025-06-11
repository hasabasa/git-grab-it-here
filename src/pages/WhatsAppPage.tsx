
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Plus, Search, ExternalLink, Users, MessageSquare, QrCode } from "lucide-react";
import { WhatsAppContact } from "@/types";
import ContactsList from "@/components/whatsapp/ContactsList";
import ContactForm from "@/components/whatsapp/ContactForm";
import ChatsList from "@/components/whatsapp/ChatsList";
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

const WhatsAppPage = () => {
  const [contacts, setContacts] = useState<WhatsAppContact[]>(demoContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Фильтрация контактов по поисковому запросу
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenWhatsApp = (phone?: string) => {
    const baseUrl = 'https://web.whatsapp.com';
    if (phone) {
      const formattedPhone = phone.replace(/[^\d]/g, '');
      const url = `${baseUrl}/send?phone=${formattedPhone}`;
      window.open(url, '_blank');
    } else {
      window.open(baseUrl, '_blank');
    }
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
            <CardTitle className="text-sm font-medium">WhatsApp Web</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => handleOpenWhatsApp()}
              size="sm"
              className="gap-2 w-full"
            >
              <ExternalLink className="h-4 w-4" />
              Открыть
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Основной контент */}
      <Tabs defaultValue="web" className="space-y-4">
        <TabsList>
          <TabsTrigger value="web">WhatsApp Web</TabsTrigger>
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="chats">Чаты</TabsTrigger>
        </TabsList>

        <TabsContent value="web">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                WhatsApp Web
              </CardTitle>
              <CardDescription>
                Войдите в WhatsApp Web с помощью QR-кода и общайтесь с клиентами
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Как войти в WhatsApp Web:
                </h4>
                <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                  <li>Откройте WhatsApp на вашем телефоне</li>
                  <li>Нажмите на меню (три точки) → "Связанные устройства"</li>
                  <li>Нажмите "Привязать устройство"</li>
                  <li>Отсканируйте QR-код ниже камерой телефона</li>
                </ol>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={() => handleOpenWhatsApp()}
                  size="lg"
                  className="gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  Открыть WhatsApp Web в новой вкладке
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 border-b flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">WhatsApp Web</h4>
                    <p className="text-sm text-muted-foreground">
                      Отсканируйте QR-код для входа
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenWhatsApp()}
                    className="gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Открыть отдельно
                  </Button>
                </div>
                <div className="relative" style={{ height: '600px' }}>
                  <iframe
                    src="https://web.whatsapp.com"
                    className="w-full h-full border-0"
                    title="WhatsApp Web"
                    allow="camera; microphone"
                  />
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">💡 Советы по использованию:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Используйте кнопки "Написать" рядом с контактами для быстрого перехода к чатам</li>
                  <li>Держите телефон подключенным к интернету для работы WhatsApp Web</li>
                  <li>Вы можете открыть WhatsApp Web в отдельной вкладке для удобства</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
          />
        </TabsContent>

        <TabsContent value="chats">
          <ChatsList contacts={contacts} onOpenWhatsApp={handleOpenWhatsApp} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppPage;
