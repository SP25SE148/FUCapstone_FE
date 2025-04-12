import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDate(data: string) {
  const date = new Date(data || "");
  // Chuyển sang giờ Việt Nam (GMT+7)
  const vnDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  const day = vnDate.getDate().toString().padStart(2, '0');
  const month = (vnDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = vnDate.getFullYear();

  const hours = vnDate.getHours().toString().padStart(2, '0');
  const minutes = vnDate.getMinutes().toString().padStart(2, '0');
  const seconds = vnDate.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

export function getDateNoTime(data: string) {
  const date = new Date(data || "");
  // Chuyển sang giờ Việt Nam (GMT+7)
  const vnDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  const day = vnDate.getDate().toString().padStart(2, '0');
  const month = (vnDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = vnDate.getFullYear();

  return `${day}/${month}/${year}`
}

export function getTimeElapsed(dateString: string): string {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute(s) ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour(s) ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day(s) ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month(s) ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year(s) ago`;
}

export function stripHtmlTags(htmlString: string) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlString;
  return tempElement.textContent || tempElement.innerText || '';
}