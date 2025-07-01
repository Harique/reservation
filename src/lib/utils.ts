import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  CalendarDate,
  
} from "@internationalized/date";
import { toDate } from "reka-ui/date";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getDateDifferenceInDays(date1: CalendarDate, date2: CalendarDate): number {
  const d1 = toDate(date1); // converts to native JS Date
  const d2 = toDate(date2);

  // Get time difference in milliseconds
  const diffTime = d2.getTime() - d1.getTime();

  // Convert ms → days
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
