<script>
import RoomPage from "./components/RoomPage.vue";

export default {
  name: "App",
  components: {
    RoomPage,
  },
};
</script>

<template>
  <div class="container">
    
    <RoomPage />
  </div>
</template>

<style>
/* In your main CSS file or <style> section */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
}

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
</style>
