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
import { DateObject, Guest, PaymentType, Status } from "@/db/models/DbModels/GuestsSchema";
import { computed, reactive, ref, toRaw } from "vue";
import { convertIntoDate, getDateDifferenceInDays } from "@/lib/utils";
import { CalendarDate } from "@internationalized/date";
import { DateRange } from "reka-ui";
import Textarea from "./ui/textarea/Textarea.vue";
import { useRoute } from "vue-router";

const route = useRoute()

const reloadWithHash = () => {
  // Set the hash to current route
  window.location.hash = route.fullPath
  // Reload
  window.location.reload()
}
let dateError = ref<boolean>(false)

async function addGuest(guestInfo: Guest) {
  try {
    window.electronAPI.addGuest(guestInfo);
    reloadWithHash()
  } catch (error) {
    console.error("Error adding guests:", error);
  }
}
const guest = reactive<Guest>({
  name: "",
  room: "",
  check_in: undefined,
  check_out: undefined,
  nights: 0,
  status: Status.Reserved,
  paymentType: PaymentType.Other,
  notes: "",
});

function handleDateRangeChange(dateRange: DateRange) {

  const dates = convertIntoDate(
    dateRange.start as CalendarDate,
    dateRange.end as CalendarDate
  );

  guest.check_in = dates.checkInDate;
  guest.check_out = dates.checkOutDate;
  if (dateRange.end) {
    guest.nights = getDateDifferenceInDays(
      dateRange.start as CalendarDate,
      dateRange.end as CalendarDate
    );
  }
}

const isFormValid = computed(() => {
  return (
    guest.name.trim() !== "" &&
    guest.room.trim() !== "" &&
    guest.status !== null &&
    guest.nights !== 0 &&
    guest.paymentType !== null &&
    guest.check_in !== undefined &&
    guest.check_out !== undefined &&
    guest.notes.trim() !== ""

  );
});
const handleSubmit =async () => {
  if (isFormValid.value === true) {
    const plainGuest = toRaw(guest);
    const isDateTaken = await window.electronAPI.isDateTaken(plainGuest.check_in!,plainGuest.check_out!,plainGuest.room)
    
    if (isDateTaken === true) {
      dateError.value = true
    }else{
      addGuest(plainGuest);
    }
    

  } else {
    alert("Please fill in all required fields");
  }
};
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
            <h1 v-if="dateError == true">CALENDAR ERROR</h1>
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
            v-model="guest.notes"
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
