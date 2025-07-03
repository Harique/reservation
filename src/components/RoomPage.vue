<script setup lang="ts">
import RoomCardComp from "./RoomCardComp.vue";
const rooms = [
  '1-1', '1-2', '1-3', '1-4',
  '2-1', '2-2', '2-3', '2-4',
  '3-1', '3-2', '3-3', '3-4',
  '4-1', '4-2', '4-3', '4-4'
]
</script>

<template>
  <div class="container">
    <div class="Rooms">
      <RoomCardComp v-for="(room) in rooms"
      :room-name="room"
      ></RoomCardComp>
      
      
    </div>
  </div>
</template>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
.Rooms {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  height: 100%;
  width: 100%;
  padding: 40px 0px 40px 40px;
  justify-content: space-between;
}
.container {
  display: flex;
  flex-direction: column;
}

</style>
