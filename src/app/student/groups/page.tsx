import { Users } from 'lucide-react'

export default function GroupsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Users className="h-16 w-16 text-[#6C47FF] mb-4" />
      <h1 className="text-2xl font-bold text-center">Groups</h1>
      <p className="text-muted-foreground text-center mt-2">
        Connect and collaborate with your teams and communities.
      </p>
    </div>
  )
}

