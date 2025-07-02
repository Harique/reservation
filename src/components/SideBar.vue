<script setup lang="ts">
import { Guest, PaymentType, Status } from "@/db/models/DbModels/GuestsSchema";
import { useRouter } from "vue-router";
import { CalendarDate, today } from "@internationalized/date";
import { convertIntoDate, getDateDifferenceInDays } from "@/lib/utils";

async function findGuest() {
  const filter: Partial<Guest> = {
    status: Status.Cancelled,
  };
  const guest = await window.electronAPI.findGuests(filter);
  console.log(guest);
}
async function removeGuest() {
  try {
    const remove = window.electronAPI.removeGuest(1);
    console.log(remove);
  } catch (error) {
    console.error("Error removing guests:", error);
  }
}
async function updateGuest() {
  const time = today("Africa/Algiers");
  const check_in = new CalendarDate(time.year, time.month, time.day);
  const check_out = new CalendarDate(time.year, time.month, time.day).add({
    days: 20,
  });
  const dates = convertIntoDate(check_in, check_out);
  const nights = getDateDifferenceInDays(check_in, check_out);
  const updatedGuest: Guest = {
    id:1,
    name: "KARIM",
    room: "2_3",
    status: Status.Cancelled,
    paymentType: PaymentType.AirBnB,
    check_in: dates.checkInDate,
    check_out: dates.checkOutDate,
    nights: nights,
    notes: "HI NOTES :D",
  };
  window.electronAPI.updateGuest(updatedGuest)
}

const router = useRouter();
function navigate(pageName: string, params?: Record<string, any>) {
  router.push({
    name: pageName,
    params: params || {},
  });
}
</script>

<template>
  <div class="sideBar">
    <div class="container">
      <div class="container-top">
        <div class="title">
          <p>LE DÉCLIC RESIDENCE</p>
        </div>

        <div class="dashboard">
          <p class="title">DASHBOARD</p>
          <div class="tabs">
            <div class="tab" @click="navigate('Rooms')">
              <div class="left">
                <img src="/delivery-door.png" alt="" />
                <h1>Rooms</h1>
              </div>
              <img src="/down.png" alt="right-arrow" />
            </div>

            <div class="tab" @click="navigate('Guests')">
              <div class="left">
                <img src="/user-edit.png" alt="" />
                <h1>Guests</h1>
              </div>
              <img src="/down.png" alt="right-arrow" />
            </div>

            <button type="button" class="tab" @click="navigate('Logs')">
              <div class="left">
                <img src="/book-open.png" alt="" />
                <h1>Logs</h1>
              </div>
              <img src="/down.png" alt="right-arrow" />
            </button>
          </div>
        </div>
      </div>
      <div class="help">
        <div class="help-text">
          <img src="/rescue.png" alt="Help" />
          <h1>Help</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sideBar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 330px;
  min-width: 290px;
  position: sticky;
  top: 0;
  
  background-color: #131313;
  padding-top: 40px;
  padding-bottom: 40px;
  gap: 25px;
}
.title {
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 600;
  line-height: 18px;
  font-size: 18px;
  color: #ffffff;
  justify-content: space-between;
  padding: 0 50px 0 40px;
}
.dashboard {
  display: flex;
  flex-direction: column;
  padding: 0 50px 25px 40px;
  gap: 5px;
  height: 100%;
  max-height: 188px;
  border-bottom: 1px solid #3f4254;
}
.dashboard .title {
  padding: 0;
  font-size: 13px;
  line-height: 14px;
  font-weight: 600;
  color: #3f4254;
}
.dashboard .tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 144px;
  width: 100%;
}
.dashboard .tabs .tab {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  justify-content: space-between;
  align-items: center;
}
.dashboard .tabs .tab h1 {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  color: #e1e3ea;
}
.dashboard .tabs .tab .left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.container-top {
  gap: 25px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 40px;
}
.help {
  height: 100%;
  display: flex;
  padding: 0 50px 15px 40px;
  justify-content: flex-end;
  flex-direction: column;
  border-bottom: 1px solid #3f4254;
  position: sticky;
  bottom: 25px;
}
.tab:hover {
  cursor: pointer;
}
.help h1 {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  color: #e1e3ea;
}
.help-text {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
