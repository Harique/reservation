import { createRouter,createWebHashHistory  } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Rooms",
    desc:'efefe',
    component: () => import("../components/RoomPage.vue"),
  },
  {
    path: "/Guests",
    name: "Guests",
    desc:'efefe',
    component: () => import("../components/GuestsPage.vue"),
  },
  {
    path: "/Logs",
    name: "Logs",
    desc:'efefe',
    component: () => import("../components/LogsPage.vue"),
  },
  {
    path: "/AvailableDatesRoom",
    name: "Available Dates Room",
    desc:'efefe',
    component: () => import("../components/AvailableDatesRoom.vue"),
  },
  {
    path: "/Room/:roomName",
    name: "Room Info",
    desc:'efefe',
    component: () => import("../components/RoomInfo.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
