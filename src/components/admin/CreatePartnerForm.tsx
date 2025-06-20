
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePartners } from '@/hooks/usePartners';
import { Info, AlertCircle } from 'lucide-react';

export const CreatePartnerForm = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createPartner } = usePartners();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    console.log('Form submitted with data:', { ...formData, password: '[HIDDEN]' });
    
    const result = await createPartner(formData);
    
    if (result.success) {
      setFormData({
        login: '',
        password: '',
        fullName: ''
      });
    } else {
      setError(result.error?.message || 'Произошла ошибка при создании партнера');
    }
    
    setLoading(false);
  };

  const validateLogin = (login: string) => {
    return /^[a-zA-Z0-9_]+$/.test(login);
  };

  const generatedEmail = formData.login ? `${formData.login}@partners.internal` : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создать нового партнера</CardTitle>
        <CardDescription>
          Создайте новый аккаунт партнера с логином и паролем
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            После создания партнер сможет войти в систему через партнерскую панель, используя сгенерированный email и пароль.
            Доступ к панели: <strong>/partner/login</strong>
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Полное имя</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Иван Иванов"
              required
            />
          </div>

          <div>
            <Label htmlFor="login">Логин</Label>
            <Input
              id="login"
              type="text"
              value={formData.login}
              onChange={(e) => {
                const login = e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_]/g, '');
                setFormData(prev => ({ ...prev, login }));
              }}
              placeholder="astana"
              required
            />
            {formData.login && (
              <p className="text-sm text-gray-500 mt-1">
                Email: <span className="font-mono">{generatedEmail}</span>
              </p>
            )}
            {formData.login && !validateLogin(formData.login) && (
              <p className="text-sm text-red-500 mt-1">
                Используйте только буквы, цифры и подчеркивания
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Минимум 6 символов"
              minLength={6}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading || !validateLogin(formData.login)} 
            className="w-full"
          >
            {loading ? 'Создание...' : 'Создать партнера'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
