import MajorGroupTable from "@/app/superadmin/majorgroups/component/majorgroup-table";
import MajorGroupOverallStats from "@/app/superadmin/majorgroups/component/majorgroup-overall-stats";
<<<<<<< HEAD
import { SuperadminMajorGroupProvider } from "@/contexts/superadmin/superadmin-majorgroup-context";
=======
import { MajorGroupProvider } from "@/contexts/superadmin/superadmin-majorgroup-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd

export default function MajorGroupPage() {
  return (
    <SuperadminMajorGroupProvider>
      <div className="flex flex-col gap-4">
        <MajorGroupOverallStats />
        <MajorGroupTable />
      </div>
    </SuperadminMajorGroupProvider>
  );
}