<script setup>
import HeaderComp from "./components/HeaderComp.vue";
import RoomPage from "./components/RoomPage.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <SideBar />
  <div class="content-container">
    <HeaderComp />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
/* In your main CSS file or <style> section */

#app {
  display: flex;
  flex-direction: row;
  font-family: "Inter", sans-serif;
  height: 100%;
}
html {
  scroll-behavior: smooth;
}
body {
  overflow-x: hidden; /* Prevent horizontal scroll */
  word-wrap: break-word; /* Handle long text */
}
.container-main {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.content {
  border-top: 1px solid #e1e3ea;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 40px 40px 40px;
}
.content-container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  height: 100%;
}
</style>
