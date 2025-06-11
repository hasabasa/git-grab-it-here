import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Plus, Search, Users, MessageSquare, Smartphone } from "lucide-react";
import { WhatsAppContact } from "@/types";
import ContactsList from "@/components/whatsapp/ContactsList";
import ContactForm from "@/components/whatsapp/ContactForm";
import ChatsList from "@/components/whatsapp/ChatsList";
import QRCodeAuth from "@/components/whatsapp/QRCodeAuth";
import WhatsAppChat from "@/components/whatsapp/WhatsAppChat";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useWhatsAppConnection } from "@/hooks/useWhatsAppConnection";

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
  const [selectedContact, setSelectedContact] = useState<{ phone: string; name: string } | undefined>();

  const {
    session,
    messages,
    loading,
    qrCode,
    createSession,
    sendMessage,
  } = useWhatsAppConnection();

  // Фильтрация контактов по поисковому запросу
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = (contactData: Omit<WhatsAppContact, 'id' | 'createdAt'>) => {
    const newContact: WhatsAppContact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setContacts([...contacts, newContact]);
    setIsContactFormOpen(false);
  };

  const handleSelectContact = (contact: WhatsAppContact) => {
    setSelectedContact({
      phone: contact.phone,
      name: contact.name
    });
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
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                window.open('https://web.whatsapp.com', '_blank');
              }}
              size="sm"
              className="gap-2 w-full"
            >
              <Smartphone className="h-4 w-4" />
              Открыть
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Основной контент */}
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">Чат WhatsApp</TabsTrigger>
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="history">История чатов</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Левая колонка - Подключение */}
            <div>
              <QRCodeAuth
                qrCode={qrCode}
                isConnected={session?.is_connected || false}
                onCreateSession={createSession}
                loading={loading}
              />
              
              {session?.is_connected && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">Быстрый выбор контакта</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {contacts.slice(0, 5).map((contact) => (
                        <Button
                          key={contact.id}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleSelectContact(contact)}
                        >
                          <MessageCircle className="h-3 w-3 mr-2" />
                          {contact.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Правая колонка - Чат */}
            <div>
              {session?.is_connected ? (
                <WhatsAppChat
                  messages={messages}
                  onSendMessage={sendMessage}
                  selectedContact={selectedContact}
                />
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Smartphone className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Подключите WhatsApp</h3>
                    <p className="text-muted-foreground text-center">
                      Отсканируйте QR-код для начала общения с клиентами
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {session?.is_connected && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">✅ WhatsApp активен</h4>
              <p className="text-sm text-green-700">
                Теперь вы можете отправлять и получать сообщения прямо в платформе. 
                Все сообщения сохраняются в истории.
              </p>
            </div>
          )}
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

          {/* Список контактов с кнопкой выбора для чата */}
          <div className="grid gap-4">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{contact.name}</h3>
                        <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                          {contact.status === 'active' ? 'Активен' : 'Неактивен'}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>📞 {contact.phone}</p>
                        {contact.company && <p>🏢 {contact.company}</p>}
                        {contact.lastMessage && (
                          <p className="flex items-center gap-1">
                            💬 {contact.lastMessage.length > 50 
                              ? `${contact.lastMessage.substring(0, 50)}...` 
                              : contact.lastMessage}
                          </p>
                        )}
                        {contact.lastMessageDate && (
                          <p className="flex items-center gap-1">
                            📅 {contact.lastMessageDate}
                          </p>
                        )}
                      </div>
                      
                      {contact.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {contact.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {session?.is_connected && (
                        <Button
                          size="sm"
                          onClick={() => handleSelectContact(contact)}
                          className="gap-1"
                        >
                          <MessageCircle className="h-3 w-3" />
                          Чат
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const formattedPhone = contact.phone.replace(/[^\d]/g, '');
                          const url = `https://web.whatsapp.com/send?phone=${formattedPhone}`;
                          window.open(url, '_blank');
                        }}
                        className="gap-1"
                      >
                        <MessageSquare className="h-3 w-3" />
                        Web
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <ChatsList contacts={contacts} onOpenWhatsApp={(phone) => {
            const formattedPhone = phone.replace(/[^\d]/g, '');
            const url = `https://web.whatsapp.com/send?phone=${formattedPhone}`;
            window.open(url, '_blank');
          }} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppPage;
