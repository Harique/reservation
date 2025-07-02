<script setup lang="ts">
import Select from "./Select.vue";
import { Input } from "@/components/ui/input";
import CalendarPicker from "./CalendarPicker.vue";
import Button from "./ui/button/Button.vue";
import { CalendarDate, today } from "@internationalized/date";
import { convertIntoDate, getDateDifferenceInDays } from "@/lib/utils";
import { Guest, Status} from "@/db/models/DbModels/GuestsSchema";
import Dialog from "./Dialog.vue";

async function addGuest(guestInfo:Guest) {
  try {
    const time = today("Africa/Algiers");
    const check_in = new CalendarDate(time.year, time.month, time.day);
    const check_out = new CalendarDate(time.year, time.month, time.day).add({
      days: 20,
    });
    const dates = convertIntoDate(check_in, check_out);
    const nights = getDateDifferenceInDays(check_in, check_out);
    const guest: Guest = {
      name: guestInfo.name,
      room: guestInfo.room,
      status: guestInfo.status,
      paymentType: guestInfo.paymentType,
      check_in: dates.checkInDate,
      check_out: dates.checkOutDate,
      nights: nights,
      notes: guestInfo.notes,
    };

    window.electronAPI.addGuest(guest);
  } catch (error) {
    console.error("Error adding guests:", error);
  }
  
}

</script>

<template>
  <div class="header-buttons">
    <div class="filter-buttons">
      <Select id="status" title="Status" :values=Object.values(Status)></Select>
      <Input class="filter-input" placeholder="Name" id="name" />
      <Input class="filter-input" placeholder="Nights" id="nights" />
      <Input class="filter-input" placeholder="Room" id="room" />
      <CalendarPicker class="calendar"></CalendarPicker>
      <Button class="button" id="filter"> Filter </Button>
    </div>
    <div class="create-new">
      <Dialog class="button" > Create New </Dialog>
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
