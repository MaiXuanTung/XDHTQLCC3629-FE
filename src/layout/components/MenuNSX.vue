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
        <li class="nav-item">
          <router-link to="/nsx/danh-sach-san-pham">
            <a href="/nsx/danh-sach-san-pham" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-list-ul"></i>
              </div>
              <div class="menu-title">Sản Phẩm</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/nsx/danh-sach-don-hang">
            <a href="/nsx/danh-sach-don-hang" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-list-ul"></i>
              </div>
              <div class="menu-title">Đơn Hàng</div>
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