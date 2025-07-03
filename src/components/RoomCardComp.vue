<script setup lang="ts">
import { useRouter } from "vue-router";
const props = defineProps<{
  roomName:string
}>();
const router = useRouter();
function navigate(pageName: string, params?: Record<string, any>) {
  router.push({
    name: pageName,
    params: params || {},
  });
}
</script>
<template>
  <div class="room" @click="navigate('Room Info', { roomName:props.roomName})">
    <img src="/delivery-door-big.png" alt="door" />
    <h3>Room {{ props.roomName }}</h3>
  </div>
</template>
<style scoped>
.room {
  display: flex;
  flex-direction: column;
  padding: 25px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #3f4254;
  border-radius: 18px;
  /* box-shadow: 0 4px 6px #f1f1f2; */
  box-shadow: 0 4px 6px #3f4254;
  width: 250px;
}
.room:hover {
  cursor: pointer;
}
.room h3 {
  color: #3f4254;
  line-height: 16px;
  font-size: 20px;
  font-weight: 600;
}
</style>
