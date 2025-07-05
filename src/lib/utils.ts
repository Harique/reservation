import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Calendar, CalendarDate } from "@internationalized/date";
import { toDate } from "reka-ui/date";
import {
  DateObject,
  Guest,
  GuestFilter,
} from "@/db/models/DbModels/GuestsSchema";
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
  const checkInDate: DateObject = {
    year: checkIn.year,
    month: checkIn.month,
    day: checkIn.day,
  };
  const checkOutDate: DateObject = {
    year: checkOut?.year,
    month: checkOut?.month,
    day: checkOut?.day,
  };
  return { checkInDate, checkOutDate };
}
export function dateObjectToDate(dateObj: DateObject): Date {
  return new Date(dateObj.year, dateObj.month - 1, dateObj.day); // month is 0-indexed in Date constructor
}

export function formatDate(date: DateObject) {
  const newDate = `${date.year}/${date.month}/${date.day}`;
  return newDate;
}

export function filterGuests(
  guests: Guest[],
  filter: Partial<GuestFilter>
): Guest[] {
  const filteredGuests = guests.filter((guest) => {
    const checkinVal = filter.check_in;
    const checkoutVal = filter.check_out;

    return Object.entries(filter).every(([key, value]) => {
      if (value === undefined || value === null) return true;
      if (key === "check_in") {
        const guestCheckIn = guest.check_in;
        if (!guestCheckIn) return false;

        const guestDate = new Date(
          guestCheckIn.year,
          guestCheckIn.month - 1,
          guestCheckIn.day
        );

        const filterCheckIn = new Date(
          checkinVal!.year,
          checkinVal!.month - 1,
          checkinVal!.day
        );

        // If we have both check-in and check-out, check if guest starts between the range
        if (checkoutVal) {
          const filterCheckOut = new Date(
            checkoutVal.year,
            checkoutVal.month - 1,
            checkoutVal.day
          );
          return guestDate >= filterCheckIn && guestDate <= filterCheckOut;
        }

        // If only check-in, guest must start on or after this date
        return guestDate >= filterCheckIn;
      }

      // Skip check_out key since it's handled in check_in
      if (key === "check_out") {
        return true;
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
  // Sort by relevance
  return filteredGuests.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Get check-in and check-out values for date range scoring
    let checkinVal: DateObject | undefined;
    let checkoutVal: DateObject | undefined;

    Object.entries(filter).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "check_in") {
        checkinVal = value as DateObject;
      }
      if (key === "check_out") {
        checkoutVal = value as DateObject;
      }
    });

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
        if (indexA !== -1) scoreA += 20 - indexA;
        if (indexB !== -1) scoreB += 20 - indexB;
      }

      // Exact matches for other fields get high scores
      if (key === "room" && a.room === value) scoreA += 30;
      if (key === "room" && b.room === value) scoreB += 30;

      if (key === "status" && a.status === value) scoreA += 30;
      if (key === "status" && b.status === value) scoreB += 30;

      if (key === "nights" && a.nights === Number(value)) scoreA += 20;
      if (key === "nights" && b.nights === Number(value)) scoreB += 20;

      // Date range scoring - only when we have both check-in and check-out
      if (key === "check_out" && checkinVal && checkoutVal) {
        const guestCheckInA = a.check_in;
        const guestCheckInB = b.check_in;

        // Create the date range from check-in and check-out values
        const filterDateRange = { start: checkinVal, end: checkoutVal };

        // Score guest A
        if (guestCheckInA) {
          const guestDateA = new Date(
            guestCheckInA.year,
            guestCheckInA.month - 1,
            guestCheckInA.day
          );

          const startDate = new Date(
            filterDateRange.start.year,
            filterDateRange.start.month - 1,
            filterDateRange.start.day
          );

          // Date range scoring - closer to start date gets higher score
          const daysDiff =
            Math.abs(guestDateA.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24);
          scoreA += Math.max(25 - daysDiff, 5);
        }

        // Score guest B
        if (guestCheckInB) {
          const guestDateB = new Date(
            guestCheckInB.year,
            guestCheckInB.month - 1,
            guestCheckInB.day
          );

          const startDate = new Date(
            filterDateRange.start.year,
            filterDateRange.start.month - 1,
            filterDateRange.start.day
          );

          const daysDiff =
            Math.abs(guestDateB.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24);
          scoreB += Math.max(25 - daysDiff, 5);
        }
      }

      // Individual check-in scoring (when not part of a date range)
      if (key === "check_in" && !checkoutVal) {
        const guestCheckInA = a.check_in;
        const guestCheckInB = b.check_in;
        const filterDate = value as DateObject;

        // Score guest A
        if (guestCheckInA) {
          const guestDateA = new Date(
            guestCheckInA.year,
            guestCheckInA.month - 1,
            guestCheckInA.day
          );

          const filterStartDate = new Date(
            filterDate.year,
            filterDate.month - 1,
            filterDate.day
          );

          const daysDiff =
            Math.abs(guestDateA.getTime() - filterStartDate.getTime()) /
            (1000 * 60 * 60 * 24);
          scoreA += Math.max(25 - daysDiff, 5);
        }

        // Score guest B
        if (guestCheckInB) {
          const guestDateB = new Date(
            guestCheckInB.year,
            guestCheckInB.month - 1,
            guestCheckInB.day
          );

          const filterStartDate = new Date(
            filterDate.year,
            filterDate.month - 1,
            filterDate.day
          );

          const daysDiff =
            Math.abs(guestDateB.getTime() - filterStartDate.getTime()) /
            (1000 * 60 * 60 * 24);
          scoreB += Math.max(25 - daysDiff, 5);
        }
      }
    });

    return scoreB - scoreA; // Higher score first
  });
}
