<script setup>
import HeaderComp from "./HeaderComp.vue";
import SideBar from "./SideBar.vue";
</script>

<template>
  <div class="container">
    <div class="Rooms">
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 1</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 2</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 3</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 4</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 5</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 6</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 7</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 8</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 9</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 10</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 11</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 12</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 13</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 14</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 15</h3>
      </div>
      <div class="room">
        <img src="/delivery-door-big.png" alt="door" />
        <h3>Room 16</h3>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

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
