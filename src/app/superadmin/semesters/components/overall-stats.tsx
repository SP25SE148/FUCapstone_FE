'use client'

import { semesterData } from '@/app/superadmin/semesters/table-data'

export default function SemesterOverallStats() {
  return (
    <div className="p-4 rounded-lg shadow-sm dark:bg-darkbackground">
      <div>
        <h3 className="text-purple-500 mb-2">Total Semesters</h3>
        <p className="text-2xl font-semibold">{semesterData.length}</p>
      </div>
    </div>
  )
}