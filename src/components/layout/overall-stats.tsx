"use client";
export default function OverallStats({
  items,
}: {
  items: {
    title: string;
    stat: number;
  }[];
}) {
  return (
    <div className="flex gap-5 p-4 rounded-lg shadow-sm bg-background">
      {items?.map((item) => (
        <div key={item.title} className="flex-1">
          <h3 className="text-purple-500 mb-2">{item.title}</h3>
          <p className="text-2xl font-semibold">{item.stat}</p>
        </div>
      ))}
    </div>
  );
}
