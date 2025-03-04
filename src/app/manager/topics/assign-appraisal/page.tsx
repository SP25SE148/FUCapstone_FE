import AssignAppraisalTable from "@/app/manager/topics/assign-appraisal/components/assign-appraisal-table";
import { ManagerAssignAppraisalProvider } from "@/contexts/manager/manager-assign-appraisal-context";

export default function AppraisalPage() {
  return (
    <ManagerAssignAppraisalProvider>
      <AssignAppraisalTable />
    </ManagerAssignAppraisalProvider>
  );
}
