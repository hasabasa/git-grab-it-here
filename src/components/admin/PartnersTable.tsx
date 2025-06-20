
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePartners } from '@/hooks/usePartners';
import { Eye, Edit, Instagram } from 'lucide-react';

export const PartnersTable = () => {
  const { partners, loading, updatePartner } = usePartners();

  const togglePartnerStatus = async (partnerId: string, isActive: boolean) => {
    await updatePartner(partnerId, { is_active: !isActive });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Партнеры ({partners.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{partner.company_name || 'Без названия'}</h3>
                  <Badge variant={partner.is_active ? "default" : "secondary"}>
                    {partner.is_active ? 'Активен' : 'Неактивен'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium">@{partner.instagram_username}</span>
                </div>
                <p className="text-sm text-muted-foreground">{partner.contact_email}</p>
                <p className="text-sm font-mono">{partner.partner_code}</p>
                <p className="text-xs text-muted-foreground">
                  Комиссия: {partner.commission_rate}%
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={partner.is_active}
                  onCheckedChange={() => togglePartnerStatus(partner.id, partner.is_active)}
                />
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {partners.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Партнеры не найдены
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
