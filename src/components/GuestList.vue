<script setup lang="ts">
import { Guest } from "@/db/models/DbModels/GuestsSchema";
import GuestRow from "./GuestRow.vue";
const props = defineProps<{
  guests: Guest[];
}>();
</script>
<template>
  <div class="guest-container">
    <div class="header-titles">
      <p>Status</p>
      <p>Name</p>
      <p>Room</p>
      <p>Check-in</p>
      <p>Check-out</p>
      <p>Nights</p>
      <div id="options">Options</div>
    </div>
    <div class="guest-list">
      <GuestRow
        v-for="guest in props.guests"
        :key="guest.id"
        :guest="guest"
      ></GuestRow>
    </div>
  </div>
</template>

<style scoped>
.guest-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
}
#options {
  text-align: left;
  border-bottom: 1px solid #eee;
}
.header-titles {
  display: flex;
  flex-direction: row;

  width: 100%;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
}
.header-titles p {
  flex: 1; /* Distribute space equally */
  padding: 10px; /* Consistent padding for all cells */
  text-align: left; /* Align text to the left */
  border-bottom: 1px solid #eee; /* Optional: Add a border for separation */
}
.guest-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
