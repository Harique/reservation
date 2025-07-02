import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Calendar, CalendarDate } from "@internationalized/date";
import { toDate } from "reka-ui/date";
import { Date } from "@/db/models/DbModels/GuestsSchema";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getDateDifferenceInDays(
  date1: CalendarDate,
  date2: CalendarDate
): number {
  const d1 = toDate(date1); // converts to native JS Date
  const d2 = toDate(date2);

  // Get time difference in milliseconds
  const diffTime = d2.getTime() - d1.getTime();

  // Convert ms → days
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function convertIntoDate(checkIn: CalendarDate, checkOut: CalendarDate) {
  const checkInDate: Date = {
    year: checkIn.year,
    month: checkIn.month,
    day: checkIn.day,
  };
  const checkOutDate: Date = {
    year: checkOut.year,
    month: checkOut.month,
    day: checkOut.day,
  };
  return { checkInDate, checkOutDate };
}
export function formatDate(date: Date) {
  const newDate = `${date.year}/${date.month}/${date.day}`;
  return newDate;
}
