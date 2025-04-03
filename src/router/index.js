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
    path: '/admin/nhan-vien',
    component: () => import('../components/Admin/NhanVien/index.vue'),
    beforeEnter: checkLogin,
  },

  {
    path: '/admin/dai-ly',
    component: () => import('../components/Admin/DaiLy/index.vue'),
    beforeEnter: checkLogin,
  },

  {
    path: '/admin/danh-muc-sp',
    component: () => import('../components/Admin/DanhMucSP/index.vue'),
    beforeEnter: checkLogin,
  },

  {
    path: '/admin/san-pham',
    component: () => import('../components/Admin/SanPham/index.vue'),
    beforeEnter: checkLogin,
  },

  {
    path: '/admin/nguyen-lieu',
    component: () => import('../components/Admin/NguyenLieu/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/admin/nguyen-lieu-san-pham',
    component: () => import('../components/Admin/NguyenLieuSanPham/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/admin/phuong-tien',
    component: () => import('../components/Admin/PhuongTien/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/admin/chi-tiet-san-pham',
    component: () => import('../components/Admin/ChiTietSanPham/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/admin/san-pham-nsx',
    component: () => import('../components/Admin/SanPhamNSX/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/admin/don-vi-van-chuyen',
    component: () => import('../components/Admin/DonViVanChuyen/index.vue'),
    beforeEnter: checkLogin,
  },
  //dùng chung
  {
    path: '/home-page',
    component: () => import('../components/DungChung/TrangChu/index.vue'),
    beforeEnter: checkLogin,
  },
  //đại lý
  {
    path: '/chi-tiet-san-pham/:id',
    component: () =>
      import('../components/Admin/ChiTietSanPhamDaiLy/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/gio-hang',
    component: () => import('../components/DaiLy/GioHang/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/thanh-toan',
    component: () => import('../components/DaiLy/ThanhToan/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/don-hang',
    component: () => import('../components/DaiLy/DonHangDaiLy/index.vue'),
    beforeEnter: checkLogin,
  },
  //client


  //auth admin

  //auth user

  {
    path: '/dang-nhap',
    component: () => import('../components/DungChung/DangNhap/index.vue'),
    meta: { layout: 'auth' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
