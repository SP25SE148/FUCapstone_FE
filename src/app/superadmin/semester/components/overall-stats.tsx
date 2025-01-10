'use client'

import { semesterData } from '@/app/superadmin/semester/table-data'

export default function SemesterOverallStats() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div>
        <h3 className="text-purple-500 mb-2">Total Semesters</h3>
        <p className="text-2xl text-black font-semibold">{semesterData.length}</p>
      </div>
    </div>
  )
}