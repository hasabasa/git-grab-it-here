
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppContact } from "@/types";
import { MessageCircle, ExternalLink, Calendar } from "lucide-react";

interface ContactsListProps {
  contacts: WhatsAppContact[];
  onOpenWhatsApp: (phone: string) => void;
}

const ContactsList = ({ contacts, onOpenWhatsApp }: ContactsListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Вчера";
    if (diffDays < 7) return `${diffDays} дн. назад`;
    return date.toLocaleDateString('ru-RU');
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
                  Написать
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactsList;
