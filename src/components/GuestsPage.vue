<script setup>
import SideBar from "./SideBar.vue";
import FilterBar from "./FilterBar.vue";
import GuestList from "./GuestList.vue";
</script>

<template>
  <div class="container">
    <FilterBar></FilterBar>
    <GuestList></GuestList>
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
