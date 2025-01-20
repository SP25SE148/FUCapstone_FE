import { Monitor } from 'lucide-react'

export default function TopicsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Monitor className="h-16 w-16 text-[#6C47FF] mb-4" />
      <h1 className="text-2xl font-bold text-center">Topics</h1>
      <p className="text-muted-foreground text-center mt-2">
        Explore and manage your learning topics and courses.
      </p>
    </div>
  )
}

