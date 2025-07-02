<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
defineProps<{ values: string[],title:string }>();
</script>

<template>
  <Select>
    <SelectTrigger class="status-select">
      <SelectValue :placeholder="title" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{title}}</SelectLabel>
        <SelectItem
          v-for="(value, index) in values"
          :key="index"
          :value="value"
        >
          {{ value }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped>
.status-select {
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #7e8299;
  min-height: 38px !important;
  width: fit-content;
  background-color: #f1f1f2;
  border-radius: 6px !important;
}
.status-select:hover {
  cursor: pointer;
}
</style>
