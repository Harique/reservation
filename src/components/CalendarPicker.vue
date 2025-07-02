<script setup lang="ts">
import type { DateRange } from "reka-ui";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

import { type Ref, ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { watch } from 'vue'
const emit = defineEmits<{
  'update:dateRange': [value: DateRange]
}>()
const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});
const time = today("Africa/Algiers");
const value = ref({
  start: new CalendarDate(time.year, time.month, time.day),
  end: new CalendarDate(time.year, time.month, time.day).add({ days: 20 }),
}) as Ref<DateRange>;

watch(value, (newValue) => {
  emit('update:dateRange', newValue)
}, { deep: true })
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="'w-[280px] justify-start text-left font-normal h-full'"
        id="calendar"
      >
        <img src="/Calendar.png" alt="calendar" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> Pick a date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
      
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:start-value="(startDate) => (value.start = startDate)"
      />
    </PopoverContent>
  </Popover>
</template>

<style scoped>
#calendar {
  font-weight: 600;
  font-size: 13px;
  line-height: 14px;
  color: #7e8299;
  border-radius: 6px;
  max-width: 230px;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f2;
  max-height: 38px;
}
#calendar:hover {
  cursor: pointer;
  background-color: oklch(0.97 0 0);
}
</style>
