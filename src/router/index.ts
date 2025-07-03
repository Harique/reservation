import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Rooms',
    component: () => import('../components/RoomPage.vue'),
  },
  {
    path: '/Guests',
    name:'Guests',
    component: () => import("../components/GuestsPage.vue")
  },
  {
    path: '/Logs',
    name:'Logs',
    component: () => import("../components/LogsPage.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router