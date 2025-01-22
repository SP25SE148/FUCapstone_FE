"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useParams, useRouter } from "next/navigation";

import { data } from "@/app/student/home/table-data"; 

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id;
  const newsItem = data.find((item) => item.id === newsId);

  if (!newsItem) {
    notFound();
  }

  const currentIndex = data.findIndex((item) => item.id === newsId);
  const sortedNews = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const prevItem = data[currentIndex - 1];
  const nextItem = data[currentIndex + 1];
  const latestNews = sortedNews.slice(0, 3);

  return (
    <div className="container mx-auto p-4 bg-muted min-h-screen flex flex-col items-center">
      <div className="relative w-full max-w-4xl h-[720px] flex justify-center items-center">
        <Image
          src={newsItem.image}
          alt={newsItem.title}
          width={1280}
          height={720}
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h1 className="text-3xl text-white font-bold">{newsItem.title}</h1>
          <time className="text-muted-foreground block">
            {new Date(newsItem.date).toLocaleDateString("vi-VN")}
          </time>
        </div>
      </div>
      <div className="p-6 bg-muted w-full max-w-4xl mt-6">
        <div
          className="text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      </div>
      <div className="flex justify-between items-center w-full max-w-4xl mt-8 border-t pt-4">
        {nextItem ? (
          <div className="text-left">
            <h3 className="text-sm text-muted-foreground">BÀI TIẾP</h3>
            <button
              onClick={() => router.push(`/student/home/${nextItem.id}`)}
              className="text-primary hover:underline truncate max-w-[300px] overflow-hidden whitespace-nowrap"
            >
              ← {nextItem.title}
            </button>
          </div>
        ) : (
          <div />
        )}
        {prevItem ? (
          <div className="text-right">
            <h3 className="text-sm text-muted-foreground">BÀI TRƯỚC</h3>
            <button
              onClick={() => router.push(`/student/home/${prevItem.id}`)}
              className="text-primary hover:underline truncate max-w-[300px] overflow-hidden whitespace-nowrap"
            >
              {prevItem.title} →
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
      <h3 className="text-2xl font-bold my-4 mt-8">LASTEST NEWS</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {latestNews.map((news) => (
          <div
            key={news.id}
            className="bg-muted rounded-lg overflow-hidden cursor-pointer"
            onClick={() => router.push(`/student/home/${news.id}`)}
          >
            <Image
              src={news.image}
              alt={news.title}
              width={300}
              height={200}
              className="object-cover w-full h-48"
            />
            <div className="py-4">
              <h3 className="text-md font-medium hover:text-primary">
                {news.title}
              </h3>
              <time className="text-sm text-muted-foreground">
                {new Date(news.date).toLocaleDateString("vi-VN")}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
