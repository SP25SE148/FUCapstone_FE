import AdminsOverallStats from "@/app/superadmin/admins/component/admins-overall-stats";
import AdminsTable from "@/app/superadmin/admins/component/admins-table";



export default function AdminAccountdPage() {
  return (
    <div className="flex flex-col gap-4">
        <AdminsOverallStats />
        <AdminsTable />
    </div>
  );
}
