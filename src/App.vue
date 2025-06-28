<script setup>
import HeaderComp from "./components/HeaderComp.vue";
import RoomPage from "./components/RoomPage.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div class="container">
    <SideBar />
    <div class="content-container">
      <HeaderComp />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style>
/* In your main CSS file or <style> section */

#app {
  height: 100vh;
  width: 100vw;
  font-family: "Inter", sans-serif;
}
.container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 40px 40px 40px;
}
.content-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
