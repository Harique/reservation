<script setup lang="ts">
import Select from "./Select.vue";
import { Input } from "@/components/ui/input";
import CalendarPicker from "./CalendarPicker.vue";
import Button from "./ui/button/Button.vue";
import {
  Guest,
  Status,
  PaymentType,
  GuestFilter,
} from "@/db/models/DbModels/GuestsSchema";
import Dialog from "./Dialog.vue";
import { reactive, ref, toRaw, watch } from "vue";
import { convertIntoDate, getDateDifferenceInDays } from "@/lib/utils";
import { CalendarDate } from "@internationalized/date";
const dateRange = ref({ start: undefined, end: undefined });

const guest = reactive<GuestFilter>({
  name: undefined,
  room: undefined,
  check_in: undefined,
  check_out: undefined,
  nights: undefined,
  status: undefined,
  paymentType: undefined,
  notes: undefined,
});

async function filterReset() {
  guest.name = undefined;
  guest.status = undefined;
  guest.room = undefined;
  guest.nights = undefined;
  guest.check_in = undefined;
  guest.check_out = undefined;
  guest.paymentType = undefined;
  guest.notes = undefined;
  dateRange.value.start = undefined;
  dateRange.value.end = undefined;
}

async function handleFilter() {
  try {
    const plainGuest = toRaw(guest);
    const guestList = await window.electronAPI.findGuests(plainGuest);
    console.log(guestList);
  } catch (error) {
    console.log(error);
  }
}
watch(
  dateRange,
  (newVal) => {
    if (newVal.start && newVal.end) {
      guest.check_in = convertIntoDate(newVal.start, newVal.end).checkInDate;
      guest.check_out = convertIntoDate(newVal.start, newVal.end).checkOutDate;
      guest.nights = getDateDifferenceInDays(
        newVal.start as CalendarDate,
        newVal.end as CalendarDate
      );
    }
  },

  { deep: true }
);
</script>

<template>
  <div class="header-buttons">
    <div class="filter-buttons">
      <Select
        :values="Object.values(Status)"
        v-model="guest.status"
        id="status"
        title="Status"
      ></Select>
      <Input
        v-model="guest.name"
        class="filter-input"
        placeholder="Name"
        id="name"
      />
      <Input
        v-model="guest.nights"
        class="filter-input"
        placeholder="Nights"
        id="nights"
      />
      <Input
        v-model="guest.room"
        class="filter-input"
        placeholder="Room"
        id="room"
      />
      <CalendarPicker
        v-model:dateRange="dateRange"
        class="calendar"
      ></CalendarPicker>
      <Select
        title="Payment Type"
        id="status"
        :values="Object.values(PaymentType)"
        v-model="guest.paymentType"
      ></Select>
      <Button class="button" id="filter" @click="handleFilter"> Filter </Button>
      <Button class="button" id="clear" @click="filterReset"> Clear </Button>
    </div>
    <div class="create-new">
      <Dialog class="button"> Create New </Dialog>
    </div>
  </div>
</template>

<style scoped>
.button {
  background-color: #3e97ff;
  width: 100%;
  font-weight: 600;
  font-size: 13px;
  line-height: 14px;
  color: #ffffff;
}
.button:hover {
  cursor: pointer;
}

#filter {
  max-height: 38px;
  width: 100%;
  max-width: 76px;
}
#clear {
  max-height: 38px;

  max-width: 76px;
}
#nights {
  width: 100%;
  max-width: 100px;
  font-weight: 600;
  font-size: 13px;
  line-height: 13px;
  color: #7e8299;
}
#room {
  width: 100%;
  max-width: 100px;
  font-weight: 600;
  font-size: 13px;
  line-height: 13px;
  color: #7e8299;
}
#name {
  font-weight: 600;
  font-size: 13px;
  line-height: 13px;
  color: #7e8299;
  max-width: 180px;
}

.header-buttons {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.filter-buttons {
  min-height: 94px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 15px;
  max-width: 790px;
}
.filter-input {
  height: 38px !important;
  background-color: #f9f9f9;
  border-color: #e1e3ea !important;
  border-radius: 6px !important;
}
.create-new {
  height: 100%;
  max-height: 38px;
  width: 100%;
  max-width: 106px;
}
</style>
