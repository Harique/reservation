<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "./Select.vue";
import CalendarPicker from "./CalendarPicker.vue";
import { Guest, PaymentType, Status } from "@/db/models/DbModels/GuestsSchema";
import { reactive, ref } from "vue";
import { convertIntoDate, getDateDifferenceInDays } from "@/lib/utils";
import { CalendarDate, today } from "@internationalized/date";
import { DateRange } from "reka-ui";

const time = today("Africa/Algiers");
let dateRange = reactive<DateRange>({
  start: new CalendarDate(time.year, time.month, time.day),
  end: new CalendarDate(time.year, time.month, time.day).add({ days: 20 }),
});

function handleDateRangeChange(daterange: DateRange) {
  dateRange = daterange;

  const dates = convertIntoDate(
    dateRange.start as CalendarDate,
    dateRange.end as CalendarDate
  );

  guest.check_in = dates.checkInDate;
  guest.check_out = dates.checkOutDate;
  guest.nights = getDateDifferenceInDays(
    dateRange.start as CalendarDate,
    dateRange.end as CalendarDate
  );
}

const dates = convertIntoDate(
  dateRange.start as CalendarDate,
  dateRange.end as CalendarDate
); // used to initialize the check in and out props
const formData = reactive({
  description: "",
  // other form fields...
});
const guest = reactive<Guest>({
  name: "",
  room: "",
  check_in: dates.checkInDate,
  check_out: dates.checkOutDate,
  nights: 0,
  status: Status.Reserved,
  paymentType: PaymentType.Other,
  notes: formData.description, //TODO: fix notes not being set
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Add Guest </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Guest</DialogTitle>
        <DialogDescription> Add a guest to the list. </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-4 py-4">
        <div class="flex flex-row justify-between">
          <Select
            title="Status"
            id="status"
            :values="Object.values(Status)"
            v-model="guest.status"
          ></Select>
          <div class="items-center gap-4">
            <CalendarPicker
              @update:dateRange="handleDateRangeChange"
            ></CalendarPicker>
          </div>
        </div>

        <div class="flex flex-row grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input
            v-model="guest.name"
            id="name"
            default-value="Pedro Duarte"
            class="col-span-3"
          />
        </div>

        <div class="flex flex-row grid-cols-4 items-center gap-4">
          <Label for="room" class="text-right"> Room </Label>
          <Input
            v-model="guest.room"
            id="username"
            default-value="@peduarte"
            class="col-span-3"
          />
        </div>

        <div class="flex flex-col w-full gap-2">
          <Label for="notes">Notes</Label>
          <Textarea
            v-model="formData.description"
            id="notes"
            placeholder="Type your notes here."
          />
        </div>
        <Select
          title="Payment Type"
          id="status"
          :values="Object.values(PaymentType)"
          v-model="guest.paymentType"
        ></Select>
      </div>
      <DialogFooter>
        <Button type="submit" @click="console.log(guest)">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<style scoped>
#notes {
  border: 1px solid;
  border-radius: 5px;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
}
</style>
