import MajorGroupTable from "@/app/superadmin/majorgroups/component/majorgroup-table";
import MajorGroupOverallStats from "@/app/superadmin/majorgroups/component/majorgroup-overall-stats";

export default function MajorGroupPage() {
  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overall</h2>
        <MajorGroupOverallStats />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Major Groups</h2>
        <MajorGroupTable />
      </div>
    </div>
  );
}
