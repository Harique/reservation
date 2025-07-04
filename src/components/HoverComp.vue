<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
</script>

<template>
  <HoverCard>
    <HoverCardTrigger class="title">
      <img src="/rescue.png" alt="Help" />
      Help
    </HoverCardTrigger>

    <HoverCardContent>
      <h4 class="text-sm font-semibold">Email:</h4>
      <p class="text-sm">
        loiza2330@gmail.com
      </p>
       <h4 class="text-sm font-semibold">Phone:</h4>
      <p class="text-sm">
        776667279
      </p>
    </HoverCardContent>
  </HoverCard>
</template>
<style scoped>
.title {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  color: #e1e3ea;
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
}
.help-container {
}
</style>
