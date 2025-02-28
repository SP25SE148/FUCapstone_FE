import AdminsOverallStats from "@/app/superadmin/admins/component/admins-overall-stats";
import AdminsTable from "@/app/superadmin/admins/component/admins-table";
import { SuperadminAdminProvider } from "@/contexts/superadmin/superadmin-admin-context";

export default function AdminAccountdPage() {
  return (
    <SuperadminAdminProvider>
      <div className="flex flex-col gap-4">
        <AdminsOverallStats />
        <AdminsTable />
      </div>
    </SuperadminAdminProvider>
  );
}
