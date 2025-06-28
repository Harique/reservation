<script setup lang="ts">
import { useRoute } from 'vue-router';

const router = useRoute()

const pageName = () => {
  return router.name?.toString()
}
</script>

<template>
  <div class="container" id="Header">
    <div class="header">
      <div class="page-progress">
        <img src="/public/general.png" alt="home icon" />
        <img src="/public/right.png" alt="right arrow" />
        <H1>{{ pageName() }}</H1>
      </div>

      <h1 class="header-title">{{ pageName() }}</h1>
      <h5 class="header-info">List of all rooms with guests who are either residing or have reserved it for a later date</h5>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
  max-height: 126px;
  padding: 25px 40px;
  width: 100%;
  border-bottom: 1px solid #E1E3EA;
}
.header {
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 10px;
}
.page-progress {
  display: flex;
  flex-direction: row;
  height: 16px;
  align-items: center;
}
.page-progress h1 {
  line-height: 14px;
  font-weight: 600;
  font-size: 13px;
  color: #3f4254;
}
.header-title{
    color: #181C32;
    font-size: 26px;
    line-height: 26px;
    font-weight: 600;
}
.header-info{
    color: #A1A5B7;
    line-height: 14px;
    font-size: 14px;
    font-weight: 500;
}
</style>
