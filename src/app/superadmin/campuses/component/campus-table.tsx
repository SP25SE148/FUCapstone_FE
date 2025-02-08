// "use client";

// import { useState, useEffect } from 'react';
// import { DataTable } from "@/components/ui/data-table";
// import { columns } from "@/app/superadmin/campuses/component/campus-table-columns";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import AddCampus from "./add-campus";
// import { useApi } from "@/hooks/use-api";

// export default function CampusTable() {
//   const { callApi } = useApi();
//   const [campusData, setCampusData] = useState([]);
//   const [error, setError] = useState<Error | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCampusList = async () => {
//       setLoading(true);
//       try {
//         const data = await callApi('fuc/AcademicManagement/campus', { method: 'GET' });
//         setCampusData(data);
//       } catch (err) {
//         console.error('Error fetching campus data:', err);
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCampusList();
//   }, []);

//   if (loading) {
//     return <div>Loading campus data...</div>;
//   }

//   if (error) {
//     return (
//       <strong>
//         Error loading campus data: {error.message}
    
//       </strong>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle className="font-semibold tracking-tight text-xl">
//               Campuses
//             </CardTitle>
//             <CardDescription>List of FPT University campuses</CardDescription>
//           </div>
//           <AddCampus />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <DataTable columns={columns} data={campusData} />
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { data } from "@/app/superadmin/campuses/table-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/campuses/component/campus-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddCampus from "./add-campus";

export default function CampusTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Campuses
            </CardTitle>
            <CardDescription>List of FPT University campuses</CardDescription>
          </div>
          <AddCampus />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
