<template>
  <div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
      <div>
        <router-link to="/">
          <img src="../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
        </router-link>
      </div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class='bx bx-home-circle'></i>
            </div>
            <div class="menu-title">Home</div>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class="fa-solid fa-boxes-packing"></i>
            </div>
            <div class="menu-title">Hàng Hóa</div>
          </a>
          <ul class="dropdown-menu">
            <li> <a class="dropdown-item" href="/admin/danh-muc-sp"><i class="bx bx-right-arrow-alt"></i>Danh Mục Sản
                Phẩm</a>
            </li>
            <li> <a class="dropdown-item" href="/admin/san-pham"><i class="bx bx-right-arrow-alt"></i>Sản
                Phẩm</a>
            </li>
            <li> <a class="dropdown-item" href="/admin/nguyen-lieu"><i class="bx bx-right-arrow-alt"></i>Nguyên Liệu</a>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class="fa-solid fa-user-group"></i>
            </div>
            <div class="menu-title">Đối Tác</div>
          </a>
          <ul class="dropdown-menu">
            <li> <a class="dropdown-item" href="/admin/nha-san-xuat"><i class="bx bx-right-arrow-alt"></i>Nhà Sản
                Xuất</a>
            </li>
            <li> <a class="dropdown-item" href="/admin/danh-sach-dai-ly"><i class="bx bx-right-arrow-alt"></i>Đại Lý</a>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class="fa-solid fa-address-card"></i>
            </div>
            <div class="menu-title">Quản Lý Nhân Sự</div>
          </a>
          <ul class="dropdown-menu">
            <li> <a class="dropdown-item" href="/admin/nhan-vien"><i class="bx bx-right-arrow-alt"></i>Nhân Viên</a>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class="fa-solid fa-truck-plane"></i>
            </div>
            <div class="menu-title">Vận Chuyển</div>
          </a>
          <ul class="dropdown-menu">
            <li> <a class="dropdown-item" href="/admin/don-vi-van-chuyen"><i class="bx bx-right-arrow-alt"></i>Đơn vị
                vận chuyển</a>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class="fa-solid fa-file-invoice-dollar"></i>
            </div>
            <div class="menu-title">Chứng Từ</div>
          </a>
          <ul class="dropdown-menu">
            <li> <a class="dropdown-item" href="/admin/danh-sach-don-hang"><i class="bx bx-right-arrow-alt"></i>Đơn
                Hàng</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {

}
</script>
<style></style>