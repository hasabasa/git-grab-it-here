
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppContact } from "@/types";
import { MessageCircle, Calendar, ExternalLink } from "lucide-react";

interface ChatsListProps {
  contacts: WhatsAppContact[];
  onOpenWhatsApp: (phone: string) => void;
}

const ChatsList = ({ contacts, onOpenWhatsApp }: ChatsListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Вчера";
    if (diffDays < 7) return `${diffDays} дн. назад`;
    return date.toLocaleDateString('ru-RU');
  };

  // Фильтруем только контакты с сообщениями и сортируем по дате
  const chatsWithMessages = contacts
    .filter(contact => contact.lastMessage && contact.lastMessageDate)
    .sort((a, b) => {
      if (!a.lastMessageDate || !b.lastMessageDate) return 0;
      return new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime();
    });

  if (chatsWithMessages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Нет активных чатов</h3>
          <p className="text-muted-foreground text-center">
            Начните общение с клиентами, и их чаты появятся здесь
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Активные чаты</h3>
        <Badge variant="secondary">{chatsWithMessages.length} чатов</Badge>
      </div>

      <div className="grid gap-3">
        {chatsWithMessages.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{contact.name}</h4>
                      {contact.company && (
                        <p className="text-sm text-muted-foreground truncate">{contact.company}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {contact.lastMessageDate && formatDate(contact.lastMessageDate)}
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-3 mb-3">
                    <p className="text-sm">
                      {contact.lastMessage && contact.lastMessage.length > 100 
                        ? `${contact.lastMessage.substring(0, 100)}...` 
                        : contact.lastMessage}
                    </p>
                  </div>
                  
                  {contact.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="ml-4">
                  <Button
                    size="sm"
                    onClick={() => onOpenWhatsApp(contact.phone)}
                    className="gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Открыть чат
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChatsList;
