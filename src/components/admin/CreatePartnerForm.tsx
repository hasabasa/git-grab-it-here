
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePartners } from '@/hooks/usePartners';

export const CreatePartnerForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    partnerCode: ''
  });
  const [loading, setLoading] = useState(false);
  const { createPartner } = usePartners();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await createPartner(formData);
    
    if (result.success) {
      setFormData({
        email: '',
        password: '',
        fullName: '',
        companyName: '',
        partnerCode: ''
      });
    }
    
    setLoading(false);
  };

  const generatePartnerCode = () => {
    const code = `PARTNER_${Date.now().toString(36).toUpperCase()}`;
    setFormData(prev => ({ ...prev, partnerCode: code }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создать нового партнера</CardTitle>
        <CardDescription>
          Создайте новый аккаунт партнера с логином и паролем
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Полное имя</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="companyName">Название компании</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="partnerCode">Код партнера</Label>
            <div className="flex gap-2">
              <Input
                id="partnerCode"
                value={formData.partnerCode}
                onChange={(e) => setFormData(prev => ({ ...prev, partnerCode: e.target.value }))}
                required
              />
              <Button type="button" variant="outline" onClick={generatePartnerCode}>
                Генерировать
              </Button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Создание...' : 'Создать партнера'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
