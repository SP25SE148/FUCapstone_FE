import { SuperadminMajorGroupProvider } from "@/contexts/superadmin/superadmin-majorgroup-context";

import MajorGroupTable from "@/app/superadmin/majorgroups/component/majorgroup-table";
import MajorGroupOverallStats from "@/app/superadmin/majorgroups/component/majorgroup-overall-stats";

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