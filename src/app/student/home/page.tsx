import { News } from "@/app/student/home/components/news";
import { data } from "@/app/student/home/table-data";


export default function NewsPage() {
  return <News data={data} />;
}
