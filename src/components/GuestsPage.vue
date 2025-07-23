<script setup lang="ts">
import SideBar from "./SideBar.vue";
import FilterBar from "./FilterBar.vue";
import GuestList from "./GuestList.vue";
import { ref, watch } from "vue";
import { Guest } from "@/db/models/DbModels/GuestsSchema";
import { sortGuestsByCheckIn } from "@/lib/utils";

let guests = ref<Guest[]>([]);
watch(guests, (newGuests) => {
  if (newGuests) {
    guests.value = sortGuestsByCheckIn(newGuests); // ✅ this is OK
  }
});
</script>

<template>
  <div class="container">
    <FilterBar :render-create-new=true type="active" v-model:filtered-guests="guests"></FilterBar>
    <GuestList :guests="guests"></GuestList>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 40px;
}
</style>
