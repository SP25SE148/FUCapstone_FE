import { LayoutGrid } from 'lucide-react'

export default function WorkspacePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted">
      <LayoutGrid className="h-16 w-16 text-[#6C47FF] mb-4" />
      <h1 className="text-2xl font-bold text-center">Workspace</h1>
      <p className="text-muted-foreground text-center mt-2">
        Access your personal workspace and ongoing projects.
      </p>
    </div>
  )
}

