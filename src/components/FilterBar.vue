<script setup lang="ts">

import Select from "./Select.vue";
import { Input } from "@/components/ui/input";
import CalendarPicker from "./CalendarPicker.vue";
</script>

<template>
  <div class="header-buttons">
    <div class="filter-buttons">
      <Select></Select>
      <Input class="filter-input" placeholder="Name" id="name" />
      <Input class="filter-input" placeholder="Nights" id="nights" />
      <Input class="filter-input" placeholder="Room" id="room" />
      <CalendarPicker></CalendarPicker>
      <CalendarPicker></CalendarPicker>
      <CalendarPicker></CalendarPicker>
      <CalendarPicker></CalendarPicker>
      

    </div>
    <div class="create-new"></div>
  </div>
</template>

<style scoped>
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
#name{
  font-weight: 600;
  font-size: 13px;
  line-height: 13px;
  color: #7e8299;
}

.header-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.filter-buttons {
  display: flex;
  flex-direction: row;
  height: 38px;
  width: fit-content;
  gap: 15px;
}
.filter-input {
  height: 38px !important;
  background-color: #f9f9f9;
  border-color: #e1e3ea !important;
  border-radius: 6px !important;
}
.create-new {
}
.create-new button {
}

</style>
