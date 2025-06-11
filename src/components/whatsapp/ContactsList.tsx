
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppContact, MessageTemplate } from "@/types";
import { MessageCircle, ExternalLink, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ContactsListProps {
  contacts: WhatsAppContact[];
  onOpenWhatsApp: (phone: string, template?: string) => void;
  templates: MessageTemplate[];
}

const ContactsList = ({ contacts, onOpenWhatsApp, templates }: ContactsListProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customMessage, setCustomMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<WhatsAppContact | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Вчера";
    if (diffDays < 7) return `${diffDays} дн. назад`;
    return date.toLocaleDateString('ru-RU');
  };

  const handleSendMessage = () => {
    if (!selectedContact) return;
    
    let message = customMessage;
    if (selectedTemplate && !customMessage) {
      const template = templates.find(t => t.id === selectedTemplate);
      message = template?.content || "";
    }
    
    onOpenWhatsApp(selectedContact.phone, message);
    setSelectedContact(null);
    setSelectedTemplate("");
    setCustomMessage("");
  };

  if (contacts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Контакты не найдены</h3>
          <p className="text-muted-foreground text-center">
            Добавьте первый контакт для начала работы с WhatsApp
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {contacts.map((contact) => (
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
                        <Calendar className="h-3 w-3" />
                        {formatDate(contact.lastMessageDate)}
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
                  <Button
                    size="sm"
                    onClick={() => onOpenWhatsApp(contact.phone)}
                    className="gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Открыть чат
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedContact(contact)}
                        className="gap-1"
                      >
                        <MessageCircle className="h-3 w-3" />
                        С шаблоном
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Отправить сообщение - {contact.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Выберите шаблон (необязательно)
                          </label>
                          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите шаблон сообщения" />
                            </SelectTrigger>
                            <SelectContent>
                              {templates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Или введите свое сообщение
                          </label>
                          <Textarea
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder="Введите сообщение..."
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        {selectedTemplate && !customMessage && (
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">Предпросмотр шаблона:</p>
                            <p className="text-sm text-muted-foreground">
                              {templates.find(t => t.id === selectedTemplate)?.content}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setSelectedContact(null)}>
                            Отмена
                          </Button>
                          <Button onClick={handleSendMessage}>
                            Открыть чат
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ContactsList;
