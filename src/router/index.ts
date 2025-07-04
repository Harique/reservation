import { createRouter,createWebHashHistory  } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Rooms",
    component: () => import("../components/RoomPage.vue"),
  },
  {
    path: "/Guests",
    name: "Guests",
    component: () => import("../components/GuestsPage.vue"),
  },
  {
    path: "/Logs",
    name: "Logs",
    component: () => import("../components/LogsPage.vue"),
  },
  {
    path: "/Room/:roomName",
    name: "Room Info",
    component: () => import("../components/RoomInfo.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
