<script setup>
import SideBar from "./SideBar.vue";
import FilterBar from "./FilterBar.vue";
</script>

<template>
  <div class="container">
    <FilterBar></FilterBar>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
