import { createRouter, createWebHistory } from 'vue-router' // cài vue-router: npm install vue-router@next --save

const routes = [
  //admin
  {
    path: '/admin/nha-san-xuat',
    component: () => import('../components/Admin/NhaSanXuat/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
