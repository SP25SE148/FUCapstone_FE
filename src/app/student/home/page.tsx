import { data } from "@/app/student/home/table-data";
import { News } from "@/app/student/home/components/news";

export default function NewsPage() {
  return <News data={data} />;
}
