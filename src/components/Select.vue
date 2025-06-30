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
</script>

<template>
  <Select >
    <SelectTrigger class="status-select">
      <SelectValue placeholder="Status" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Status</SelectLabel>
        <SelectItem value="Active"> Active </SelectItem>
        <SelectItem value="Reserved"> Reserved </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style>
.status-select {
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #7e8299;
  height: 100% !important;
  width: fit-content;

  background-color: #f1f1f2;
  border-radius: 6px !important;
}
</style>
