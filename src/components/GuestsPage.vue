<script setup lang="ts">
import SideBar from "./SideBar.vue";
import FilterBar from "./FilterBar.vue";
import GuestList from "./GuestList.vue";
import { ref } from "vue";
import { Guest } from "@/db/models/DbModels/GuestsSchema";

let guests = ref<Guest[]>([]);
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
