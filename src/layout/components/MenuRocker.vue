<template>
  <div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
      <div>
        <router-link to="/">
          <img src="../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
        </router-link>
      </div>
      <div>
        <h4 class="logo-text">Rukada</h4>
      </div>
      <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
      </div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class='bx bx-home-circle'></i>
            </div>
            <div class="menu-title">Drop Down</div>
          </a>
          <ul class="dropdown-menu">
            <li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Default</a>
            </li>
            <li> <a class="dropdown-item" href="index2.html"><i class="bx bx-right-arrow-alt"></i>Alternate</a>
            </li>
            <li> <a class="dropdown-item" href="index3.html"><i class="bx bx-right-arrow-alt"></i>Graphical</a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <router-link to="/admin/danh-muc-sp">
            <a href="/admin/danh-muc-sp" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-layer-group"></i>
              </div>
              <div class="menu-title">Danh Mục SP</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/nha-san-xuat">
            <a href="/admin/nha-san-xuat" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-truck-field"></i>
              </div>
              <div class="menu-title">Nhà Sản Xuất</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/ql-nhan-vien">
            <a href="/admin/ql-nhan-vien" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-person-through-window"></i>
              </div>
              <div class="menu-title">QL Nhân Viên</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/dai-ly">
            <a href="/admin/dai-ly" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-store"></i>
              </div>
              <div class="menu-title">Đại Lý</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/san-pham">
            <a href="/admin/san-pham" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
              <div class="menu-title">Sản Phẩm</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/nguyen-lieu">
            <a href="/admin/nguyen-lieu" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-bullseye"></i>
              </div>
              <div class="menu-title">Nguyên Liệu</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/nguyen-lieu-san-pham">
            <a href="/admin/nguyen-lieu-san-pham" class="nav-link">
              <div class="parent-icon">
                <i class="fa-regular fa-building"></i>
              </div>
              <div class="menu-title">Nguyên Liệu Sản Phẩm </div>
              </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/phuong-tien">
            <a href="/admin/phuong-tien" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-truck-plane"></i>
              </div>
              <div class="menu-title">Phương Tiện</div>
            </a>
          </router-link>
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