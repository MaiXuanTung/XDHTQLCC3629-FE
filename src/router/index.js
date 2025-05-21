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
    path: '/admin/danh-sach-dai-ly',
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
    path: '/admin/chi-tiet-san-pham',
    component: () => import('../components/Admin/ChiTietSanPham/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/admin/don-vi-van-chuyen',
    component: () => import('../components/Admin/DonViVanChuyen/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/admin/danh-sach-don-hang',
    component: () => import('../components/Admin/DonHang/index.vue'),
    beforeEnter: checkLogin,
  },
  //dùng chung
  {
    path: '/danh-sach-san-pham',
    component: () => import('../components/DungChung/TrangChu/index.vue'),
    beforeEnter: checkLogin,
  },
  //đại lý
  {
    path: '/chi-tiet-san-pham/:id',
    component: () =>
      import('../components/DaiLy/ChiTietSanPhamDaiLy/index.vue'),
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
  //auth user
  {
    path: '/dang-nhap',
    component: () => import('../components/DungChung/DangNhap/index.vue'),
    meta: { layout: 'auth' },
  },
  //nhà sản xuất
  {
    path: '/nsx/danh-sach-san-pham',
    component: () => import('../components/NhaSanXuat/SanPhamNSX/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/nsx/nguyen-lieu',
    component: () => import('../components/NhaSanXuat/NguyenLieuNSX/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/nsx/danh-sach-don-hang',
    component: () => import('../components/NhaSanXuat/DonHangNSX/index.vue'),
    beforeEnter: checkLogin,
  },
  //đon vị vận chuyển
  {
    path: '/dvvc/danh-sach-phuong-tien',
    component: () =>
      import('../components/DonViVanChuyen/PhuongTien/index.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/dvvc/danh-sach-don-hang',
    component: () =>
      import('../components/DonViVanChuyen/DonHangDVVC/index.vue'),
    beforeEnter: checkLogin,
  },

  //home page
  {
    path: '/',
    component: () => import('../components/DaiLy/HomePage/index.vue'),
    beforeEnter: checkLogin,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
