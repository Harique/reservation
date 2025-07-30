<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import CalendarPicker from "./CalendarPicker.vue";

import { CalendarDate } from "@internationalized/date";
import { getInBetweenDates } from "@/lib/utils";
import AvailableDatesBox from "./AvailableDatesBox.vue";
import { DateRange } from "reka-ui";

let availableDates = reactive<Record<string, CalendarDate[]>>({});
const rooms = [
  "0-1",
  "0-2",
  "1-1",
  "1-2",
  "1-3",
  "1-4",
  "2-1",
  "2-2",
  "2-3",
  "2-4",
  "3-1",
  "3-2",
  "3-4",
];
async function getAvailableDatesForRoom(
  room: string,
  Date: DateRange
): Promise<CalendarDate[]> {
  if (!Date.end) return [];

  const startDate = new CalendarDate(
    Date.start!.year,
    Date.start!.month,
    Date.start!.day
  );
  const endDate = new CalendarDate(
    Date.end!.year,
    Date.end!.month,
    Date.end!.day
  );
  // Get all dates in the requested range
  const allDatesInRange = getInBetweenDates(startDate, endDate);

  // Get unavailable dates for this room
  const unavailableDates = await window.electronAPI.getUnAvailableDates(room);

  // Filter out unavailable dates
  const availableDates = allDatesInRange.filter((date) => {
    return !unavailableDates.some((unavailableDate) => {
      // Convert unavailableDate to CalendarDate if it's not already
      const unavailableCalendarDate =
        unavailableDate instanceof CalendarDate
          ? unavailableDate
          : new CalendarDate(
              (unavailableDate as CalendarDate).year,
              (unavailableDate as CalendarDate).month,
              (unavailableDate as CalendarDate).day
            );

      return date.compare(unavailableCalendarDate) === 0;
    });
  });
  return availableDates;
}

async function lol(dateRange: DateRange) {

  for (const room of rooms) {
    const dates = await getAvailableDatesForRoom(room, dateRange);
    availableDates[room] = dates;
  }

}
</script>

<template>
  <div class="container">
    <CalendarPicker
      @update:dateRange="lol"
      class="calendar"
      :isDialogEdit="false"
    ></CalendarPicker>

    <AvailableDatesBox
      v-for="room in rooms"
      :key="room"
      :roomName="room"
      :availableDates="availableDates[room]"
    ></AvailableDatesBox>
  </div>
</template>
<style scoped>
.container {
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
