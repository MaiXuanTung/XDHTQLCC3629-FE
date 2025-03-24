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
      </ul>
    </nav>
  </div>
</template>
<script>
export default {

}
</script>
<style></style>