<script setup lang="ts">

const navigate = (pageName:string) =>{

}


</script>

<template>
  <div class="sideBar">
    <div class="title">
      <P>LE DÉCLIC RESIDENCE</P>
      <img src="/left-square.png" alt="left-square">
    </div>
    <div class="dashboard">
      <p class="title">DASHBOARD</p>
      <div class="tabs">

        <div class="tab">
          <div class="left">
            <img src="delivery-door.png" alt="">
            <h1>Rooms</h1>
          </div>
          <img src="/down.png" alt="right-arrow">
        </div>

        <div class="tab">
          <div class="left">
            <img src="user-edit.png" alt="">
            <h1>Guests</h1>
          </div>
          <img src="/down.png" alt="right-arrow">
        </div>

        <div class="tab">
          <div class="left">
            <img src="book-open.png" alt="">
            <h1>Logs</h1>
          </div>
          <img src="/down.png" alt="right-arrow">
        </div>
        

      </div>
    </div>
    <div class="help">
      <div class="help-text">
        <img src="rescue.png" alt="Help">
        <h1>Help</h1>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.sideBar{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 330px;
  background-color: #131313;
  padding-top: 40px;
  padding-bottom: 40px;
  gap: 25px;
}
.title{
  display: flex;
  align-items: center;
  max-height: 30px;
  width: 100%;
  font-weight: 600;
  line-height: 18px;
  font-size: 18px;
  color: #FFFFFF;
  justify-content: space-between;
  padding: 0 50px 0 40px;
}
.dashboard{
  display: flex;
  flex-direction: column;
  padding: 0 50px 25px 40px;
  gap: 5px;
  height: 100%;
  max-height: 188px;
  border-bottom: 1px solid #3F4254;

}
.dashboard .title{
  padding: 0;
  font-size: 13px;
  line-height: 14px;
  font-weight: 600;
  color: #3F4254;
}
.dashboard .tabs{
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 144px;
  width: 100%;
}
.dashboard .tabs .tab{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  justify-content: space-between;
  align-items: center;
}
.dashboard .tabs .tab h1{
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  color: #E1E3EA;
}
.dashboard .tabs .tab .left{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}
.help{
  height: 100%;
  display: flex;
  padding: 0 50px 15px 40px;
  justify-content: flex-end;
  flex-direction: column;
  border-bottom: 1px solid #3F4254;
}
.help h1{
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  color: #E1E3EA;

}
.help-text{
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
