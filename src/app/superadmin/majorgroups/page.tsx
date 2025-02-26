import MajorGroupTable from "@/app/superadmin/majorgroups/component/majorgroup-table";
import MajorGroupOverallStats from "@/app/superadmin/majorgroups/component/majorgroup-overall-stats";
import { MajorGroupProvider } from "@/contexts/superadmin/superadmin-majorgroup-management";

export default function MajorGroupPage() {
  return (
    <MajorGroupProvider>
      <div className="flex flex-col gap-4">
        <MajorGroupOverallStats />
        <MajorGroupTable />
      </div>
    </MajorGroupProvider>
  );
}