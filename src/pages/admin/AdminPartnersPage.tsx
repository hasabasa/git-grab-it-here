
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePartnerForm } from "@/components/admin/CreatePartnerForm";
import { PartnersTable } from "@/components/admin/PartnersTable";

const AdminPartnersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Управление партнерами
          </h1>
          <p className="text-gray-600 mt-2">
            Создание и управление партнерской программой
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Создание нового партнера</CardTitle>
          </CardHeader>
          <CardContent>
            <CreatePartnerForm />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Управление партнерами</CardTitle>
          </CardHeader>
          <CardContent>
            <PartnersTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPartnersPage;
