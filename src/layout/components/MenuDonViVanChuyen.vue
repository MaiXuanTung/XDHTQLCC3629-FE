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
            <router-link to="/home-page">
              <a href="/home-page" class="nav-link">
                <div class="parent-icon">
                  <i class="fa-solid fa-home"></i>
                </div>
                <div class="menu-title">Trang Chủ</div>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">
              <a href="/" class="nav-link">
                <div class="parent-icon">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div class="menu-title">Quản lú</div>
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