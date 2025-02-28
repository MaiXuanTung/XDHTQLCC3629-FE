import { createRouter, createWebHistory } from 'vue-router' // cài vue-router: npm install vue-router@next --save
import checkLogin from './checkLogin'
const routes = [
  //admin
  {
    path: '/admin/nha-san-xuat',
    component: () => import('../components/Admin/NhaSanXuat/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/admin/ql-nhan-vien',
    component: () => import('../components/Admin/NhanVien/index.vue'),
    beforeEnter: checkLogin,
  },

  //client
  {
    path: '/test',
    component: () => import('../components/Client/Test/index.vue'),
    meta: { layout: 'client' },
  },

  //auth admin
  {
    path: '/admin/dang-nhap',
    component: () => import('../components/Admin/DangNhap/index.vue'),
    meta: { layout: 'auth' },
  },
  {
    path: '/admin/dang-ky',
    component: () => import('../components/Admin/DangKy/index.vue'),
    meta: { layout: 'auth' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
