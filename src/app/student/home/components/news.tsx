"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import type { NewsItem } from "@/app/student/home/table-data";
import { useRouter } from "next/navigation";

interface NewsProps {
  data: NewsItem[];
}

export function News({ data }: NewsProps) {
  const sortedNews = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const mainNews = sortedNews.slice(0, 4);
  const sideNews = sortedNews.slice(4);

  const router = useRouter();
  return (
    <div className="container mx-auto px-24 py-6">
      <div className="bg-gradient-to-r from-[#ade9ff] to-primary text-background py-8 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-extrabold text-center">
          Welcome to the News Section
        </h1>
        <p className="text-center mt-2">
          Stay updated with the latest news and announcements
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainNews.map((news) => (
            <Card
              key={news.id}
              className="border-0 shadow-none cursor-pointer bg-muted"
              onClick={() => router.push(`/student/home/${news.id}`)}
            >
              <CardContent className="aspect-[16/9] p-0">
                <Image
                  src={news.image}
                  alt={news.title}
                  width={549}
                  height={308}
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </CardContent>
              <CardContent className="p-0 py-4">
                <CardTitle className="font-medium text-lg hover:text-primary">
                  {news.title}
                </CardTitle>
                <CardTitle className="text-sm text-muted-foreground">
                  {news.date}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="p-6 rounded-lg bg-background">
          <div className="space-y-6">
            {sideNews.map((news) => (
              <Link
                key={news.id}
                href={`/student/home/${news.id}`}
                className="block group"
              >
                <div className="space-y-1">
                  <h3 className="font-medium group-hover:text-primary">
                    {news.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <time className="text-sm text-red-500">
                      {new Date(news.date).toLocaleDateString("vi-VN")}
                    </time>
                    <span className="text-red-500">»</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
