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
import {
  Date,
  Guest,
  PaymentType,
  Status,
} from "@/db/models/DbModels/GuestsSchema";
import { computed, onMounted, reactive, ref, toRaw, watch } from "vue";
import { convertIntoDate, getDateDifferenceInDays } from "@/lib/utils";
import { CalendarDate, today } from "@internationalized/date";
import Textarea from "./ui/textarea/Textarea.vue";
import { DateRange } from "reka-ui";
const props = defineProps<{
  guest: Guest;
}>();

const dateRange = ref<DateRange>({
  start: new CalendarDate(1970, 1, 1), // or use today(getLocalTimeZone())
  end: new CalendarDate(1970, 1, 1),
});

const initialDate = computed(() => dateRange.value);

onMounted(() => {
  if (props.guest.check_in && props.guest.check_out) {
    dateRange.value = {
      start: new CalendarDate(
        props.guest.check_in.year,
        props.guest.check_in.month,
        props.guest.check_in.day
      ),
      end: new CalendarDate(
        props.guest.check_out.year,
        props.guest.check_out.month,
        props.guest.check_out.day
      ),
    };
  }
});

async function updateGuest(guestInfo: Guest) {
  try {
    window.electronAPI.updateGuest(guestInfo);
  } catch (error) {
    console.error("Error updating guests:", error);
  }
}
const updatedGuest = reactive<Guest>({
  name: props.guest.name,
  room: props.guest.room,
  check_in: props.guest.check_in,
  check_out: props.guest.check_out,
  nights: props.guest.nights,
  status: props.guest.status,
  paymentType: props.guest.paymentType,
  notes: props.guest.notes,
});

const isFormValid = computed(() => {
  return (
    updatedGuest.name.trim() !== "" &&
    updatedGuest.room.trim() !== "" &&
    updatedGuest.status !== null &&
    updatedGuest.nights !== 0 &&
    updatedGuest.paymentType !== null &&
    updatedGuest.check_in !== undefined &&
    updatedGuest.check_out !== undefined &&
    updatedGuest.notes.trim() !== ""
  );
});
const handleSubmit = () => {
  if (isFormValid.value === true) {
    const plainGuest = toRaw(updatedGuest);
    updateGuest(plainGuest);
  } else {
    alert("Please fill in all required fields");
  }
};
watch(
  dateRange,
  (newVal) => {
   if (newVal.start && newVal.end) {
    const calendarDateStart = new CalendarDate(
      newVal.start.year,
      newVal.start.month,
      newVal.start.day
    );

    const calendarDateEnd = new CalendarDate(
      newVal.end.year,
      newVal.end.month,
      newVal.end.day
    );
      updatedGuest.check_in = convertIntoDate(
        calendarDateStart,
        calendarDateEnd
      ).checkInDate;
      updatedGuest.check_out = convertIntoDate(
        calendarDateStart,
        calendarDateEnd
      ).checkOutDate;
      updatedGuest.nights = getDateDifferenceInDays(
        newVal.start as CalendarDate,
        newVal.end as CalendarDate
      );
    }
  },

  { deep: true }
);
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <img src="/edit.png" alt="edit" />
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
            v-model="updatedGuest.status"
          ></Select>
          <div class="items-center gap-4">
            <CalendarPicker v-model:dateRange="dateRange" :initial-date="initialDate"></CalendarPicker>
          </div>
        </div>

        <div class="flex flex-row grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input
            v-model="updatedGuest.name"
            id="name"
            default-value="Pedro Duarte"
            class="col-span-3"
          />
        </div>

        <div class="flex flex-row grid-cols-4 items-center gap-4">
          <Label for="room" class="text-right"> Room </Label>
          <Input
            v-model="updatedGuest.room"
            id="username"
            default-value="@peduarte"
            class="col-span-3"
          />
        </div>

        <div class="flex flex-col w-full gap-2">
          <Label for="notes">Notes</Label>
          <Textarea
            v-model="updatedGuest.notes"
            id="notes"
            placeholder="Type your notes here."
          />
        </div>
        <Select
          title="Payment Type"
          id="status"
          :values="Object.values(PaymentType)"
          v-model="updatedGuest.paymentType"
        ></Select>
      </div>
      <DialogFooter>
        <Button type="submit" @click="handleSubmit" :disabled="!isFormValid">
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
