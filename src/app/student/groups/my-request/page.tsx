import { ListRequest } from "@/app/student/groups/my-request/components/list-request"
import { StudentGroupRequestProvider } from "@/contexts/student/student-group-request-context"

export default function MyRequestPage() {
  return (
    <StudentGroupRequestProvider>
      <ListRequest />
    </StudentGroupRequestProvider>
  )
}

