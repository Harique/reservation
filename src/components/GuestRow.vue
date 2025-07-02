<script setup lang="ts">
import { formatDate } from "@/lib/utils";
import Status from "./ui/status/Status.vue";
import { Guest } from "@/db/models/DbModels/GuestsSchema";
const props =  defineProps<{ guest: Guest }>();

const dateIn = formatDate(props.guest.check_in)
const dateOut = formatDate(props.guest.check_out)
</script>

<template>
  <div class="row-container">
    <div><Status :variant="`${props.guest.status}`"></Status></div>
    <div>{{props.guest.name}}</div>
    <div>{{props.guest.room}}</div>
    <div>{{dateIn}}</div>
    <div>{{dateOut}}</div>
    <div>{{props.guest.nights}}</div>
  </div>
</template>
<style scoped>
.row-container {
  min-height: 26px;
  justify-content: flex-start;
  gap: auto;
  display: flex;
  flex-direction: row;
  width: 100%;
}
.row-container div {
  flex: 1; /* Distribute space equally */
  padding-left: 10px;
  text-align: left; /* Align text to the left */
}
</style>
