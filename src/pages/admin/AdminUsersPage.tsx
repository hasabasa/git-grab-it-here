
import UsersManagementNew from "@/components/admin/UsersManagementNew";

const AdminUsersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Управление пользователями
          </h1>
          <p className="text-gray-600 mt-2">
            Просмотр пользователей из Supabase Auth и управление их подписками
          </p>
        </div>
      </div>

      <UsersManagementNew />
    </div>
  );
};

export default AdminUsersPage;
