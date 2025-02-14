import AdminsOverallStats from "@/app/superadmin/admins/component/admins-overall-stats";
import AdminsTable from "@/app/superadmin/admins/component/admins-table";
import { AdminProvider } from "@/contexts/admin-management-context";

export default function AdminAccountdPage() {
  return (
    <AdminProvider>
      <div className="flex flex-col gap-4">
        <AdminsOverallStats />
        <AdminsTable />
      </div>
    </AdminProvider>
  );
}
