
import UsersManagement from "@/components/admin/UsersManagement";

const AdminUsersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Управление пользователями
          </h1>
          <p className="text-gray-600 mt-2">
            Просмотр, редактирование и управление учетными записями пользователей
          </p>
        </div>
      </div>

      <UsersManagement />
    </div>
  );
};

export default AdminUsersPage;
