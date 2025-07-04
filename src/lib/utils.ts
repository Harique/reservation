import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Calendar, CalendarDate } from "@internationalized/date";
import { toDate } from "reka-ui/date";
import { Date, Guest, GuestFilter } from "@/db/models/DbModels/GuestsSchema";
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
    year: checkOut?.year,
    month: checkOut?.month,
    day: checkOut?.day,
  };
  return { checkInDate, checkOutDate };
}
export function formatDate(date: Date) {
  const newDate = `${date.year}/${date.month}/${date.day}`;
  return newDate;
}
export function filterGuests(
  guests: Guest[],
  filter: Partial<GuestFilter>
): Guest[] {
  const filteredGuests = guests.filter((guest) => {
    return Object.entries(filter).every(([key, value]) => {
      if (value === undefined || value === null) return true;

      if (key === "check_in" || key === "check_out") {
        const guestDate = guest[key as "check_in" | "check_out"];
        const filterDate = value as Date;

        return (
          guestDate?.year === filterDate.year &&
          guestDate?.month === filterDate.month &&
          guestDate?.day === filterDate.day
        );
      }
      if (key === "nights") {
        const filterNights = Number(value);
        return guest.nights === filterNights;
      }
      if (key === "name") {
        const guestName = guest.name?.toLowerCase() || "";
        const filterName = (value as string)?.toLowerCase() || "";
        return guestName.includes(filterName);
      }
      return guest[key as keyof Guest] === value;
    });
  });

  // Sort by relevance
  return filteredGuests.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    Object.entries(filter).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "name") {
        const guestNameA = a.name?.toLowerCase() || "";
        const guestNameB = b.name?.toLowerCase() || "";
        const filterName = (value as string)?.toLowerCase() || "";
        
        // Exact match gets highest score
        if (guestNameA === filterName) scoreA += 100;
        if (guestNameB === filterName) scoreB += 100;
        
        // Starts with filter gets high score
        if (guestNameA.startsWith(filterName)) scoreA += 50;
        if (guestNameB.startsWith(filterName)) scoreB += 50;
        
        // Earlier position of match gets higher score
        const indexA = guestNameA.indexOf(filterName);
        const indexB = guestNameB.indexOf(filterName);
        if (indexA !== -1) scoreA += (20 - indexA);
        if (indexB !== -1) scoreB += (20 - indexB);
      }
      
      // Exact matches for other fields get high scores
      if (key === "room" && a.room === value) scoreA += 30;
      if (key === "room" && b.room === value) scoreB += 30;
      
      if (key === "status" && a.status === value) scoreA += 30;
      if (key === "status" && b.status === value) scoreB += 30;
      
      if (key === "nights" && a.nights === Number(value)) scoreA += 20;
      if (key === "nights" && b.nights === Number(value)) scoreB += 20;
      
      // Date matches get moderate scores
      if (key === "check_in" || key === "check_out") {
        const guestDateA = a[key as "check_in" | "check_out"];
        const guestDateB = b[key as "check_in" | "check_out"];
        const filterDate = value as Date;
        
        if (guestDateA?.year === filterDate.year && 
            guestDateA?.month === filterDate.month && 
            guestDateA?.day === filterDate.day) {
          scoreA += 25;
        }
        if (guestDateB?.year === filterDate.year && 
            guestDateB?.month === filterDate.month && 
            guestDateB?.day === filterDate.day) {
          scoreB += 25;
        }
      }
    });

    return scoreB - scoreA; // Higher score first
  });
}