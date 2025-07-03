<script setup lang="ts">
import Select from "./Select.vue";
import { Input } from "@/components/ui/input";
import CalendarPicker from "./CalendarPicker.vue";
import Button from "./ui/button/Button.vue";
import {
  Status,
  PaymentType,
  GuestFilter,
  Guest,
} from "@/db/models/DbModels/GuestsSchema";
import Dialog from "./Dialog.vue";
import { onMounted, reactive, ref, toRaw, watch } from "vue";
import {
  convertIntoDate,
  filterGuests,
  getDateDifferenceInDays,
} from "@/lib/utils";
import { CalendarDate } from "@internationalized/date";
const props = defineProps<{
  renderCreateNew: boolean;
  type: string;
  roomName?: string;
}>();
const emit = defineEmits<{
  "update:filteredGuests": [guests: Guest[]];
}>();

let guests = ref<Guest[]>([]);

const dateRange = ref({ start: undefined, end: undefined });
const guestFilter: GuestFilter = reactive<GuestFilter>({
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
  guestFilter.name = undefined;
  guestFilter.status = undefined;
  guestFilter.room = undefined;
  guestFilter.nights = undefined;
  guestFilter.check_in = undefined;
  guestFilter.check_out = undefined;
  guestFilter.paymentType = undefined;
  guestFilter.notes = undefined;
  dateRange.value.start = undefined;
  dateRange.value.end = undefined;
}

async function handleFilter() {
  try {
    const plainGuest = toRaw(guestFilter);
    Number(plainGuest.nights)
    console.log(plainGuest)
    const guestList = await filterGuests(guests.value, plainGuest);
    emit("update:filteredGuests", guestList);
  } catch (error) {
    console.log(error);
  }
}
watch(
  dateRange,
  (newVal) => {
    if (newVal.start && newVal.end) {
      guestFilter.check_in = convertIntoDate(
        newVal.start,
        newVal.end
      ).checkInDate;
      guestFilter.check_out = convertIntoDate(
        newVal.start,
        newVal.end
      ).checkOutDate;
      guestFilter.nights = getDateDifferenceInDays(
        newVal.start as CalendarDate,
        newVal.end as CalendarDate
      );
    }
  },

  { deep: true }
);
onMounted(async () => {
  try {
    let fetchedGuests: Guest[] = await window.electronAPI.getGuests(props.type);
    if (props.roomName) {
      fetchedGuests = await fetchedGuests.filter(
        (g) => g.room === props.roomName
      );
    }
    guests.value = fetchedGuests;
    emit("update:filteredGuests", fetchedGuests);
  } catch (error) {
    console.log("error fetching guests", error);
  }
});
</script>

<template>
  <div class="header-buttons">
    <div class="filter-buttons">
      <Select
        :values="Object.values(Status)"
        v-model="guestFilter.status"
        id="status"
        title="Status"
      ></Select>
      <Input
        v-model="guestFilter.name"
        class="filter-input"
        placeholder="Name"
        id="name"
      />
      <Input
        v-model="guestFilter.nights"
        class="filter-input"
        placeholder="Nights"
        id="nights"
      />
      <Input
        v-if="roomName == undefined"
        v-model="guestFilter.room"
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
        v-model="guestFilter.paymentType"
      ></Select>
      <Button class="button" id="filter" @click="handleFilter"> Filter </Button>
      <Button class="button" id="clear" @click="filterReset"> Clear </Button>
    </div>
    <div v-if="props.renderCreateNew == true" class="create-new">
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
