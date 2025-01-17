import GroupTable from "./components/group-table";
import GroupOverall from "./components/group-overall";

export default function ManagerManageGroupsPage() {
    return (
        <div className="flex flex-col gap-4">
            <GroupOverall />
            <GroupTable />
        </div>
    )
}