import { HomeIcon } from 'lucide-react'

export default function AnnoucementPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 ">
      <HomeIcon className="h-16 w-16 text-[#6C47FF] mb-4" />
      <h1 className="text-2xl font-bold text-center">Home Page</h1>
      <p className="text-muted-foreground text-center mt-2">
        Welcome to your dashboard. Here you will find an overview of your recent activities.
      </p>
    </div>
  )
}

