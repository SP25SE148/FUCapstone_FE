'use client'

import { data } from '@/app/superadmin/campus/table-data'

export default function OverallStats() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div>
        <h3 className="text-purple-500 mb-2">Total Campuses</h3>
        <p className="text-2xl text-black font-semibold">{data.length}</p>
      </div>
    </div>
  )
}