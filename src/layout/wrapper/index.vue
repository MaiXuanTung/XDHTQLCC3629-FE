<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <TopRocker></TopRocker>
      <div v-if="isLoading">Đang tải...</div>
      <template v-else>
        <MenuRocker v-if="is_nguoi_dung === 0"></MenuRocker>
        <MenuNSX v-else-if="is_nguoi_dung === 1"></MenuNSX>
        <!-- <MenuDaiLy v-else-if="is_nguoi_dung === 2"></MenuDaiLy> -->
        <template v-else-if="is_nguoi_dung === 2">
          <MenuDaiLy></MenuDaiLy>
        </template>
        <MenuDonViVanChuyen v-else-if="is_nguoi_dung === 3"></MenuDonViVanChuyen>
      </template>
    </div>
    <div class="page-wrapper">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>
    <div class="overlay toggle-icon"></div>
    <a href="javaScript:;" class="back-to-top">
      <i class='bx bxs-up-arrow-alt'></i>
    </a>
    <div v-if="isLoading">Đang tải...</div>
    <template v-else-if="is_nguoi_dung === 2">
      <FooterDaiLy></FooterDaiLy>
    </template>
    <template v-else>
      <BotRocker></BotRocker>
    </template>
  </div>
</template>
<script>
import TopRocker from "../components/TopRocker.vue";
import MenuRocker from "../components/MenuRocker.vue";
import BotRocker from "../components/BotRocker.vue";
import FooterDaiLy from "../components/FooterDaiLy.vue";

import "../../assets/js/pace.min.js";
import "../../assets/js/bootstrap.bundle.min.js";
import "../../assets/js/jquery.min.js";
import "../../assets/plugins/simplebar/js/simplebar.min.js";
import "../../assets/plugins/metismenu/js/metisMenu.min.js";
import "../../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";
import "../../assets/js/index.js";
import "../../assets/js/app.js";
import axios from "axios";
import MenuDaiLy from "../components/MenuDaiLy.vue";
import MenuNSX from "../components/MenuNSX.vue";
import MenuDonViVanChuyen from "../components/MenuDonViVanChuyen.vue";
export default {
  name: "app",
  data() {
    return {
      is_nguoi_dung: 0,
      isLoading: true,
    }
  },
  components: {
    TopRocker, MenuRocker, BotRocker, MenuDaiLy, MenuNSX, MenuDonViVanChuyen, FooterDaiLy
  },
  mounted() {
    this.checkNguoiDung();
  },
  methods: {
    checkNguoiDung() {
      axios
        .get('http://127.0.0.1:8000/api/check-nguoi-dung', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.is_nguoi_dung = res.data.data;
        }).finally(() => {
          this.isLoading = false; // Tắt trạng thái loading khi API hoàn thành
        });
    }
  },
}
</script>
<style>
@import "../../assets/plugins/vectormap/jquery-jvectormap-2.0.2.css";
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/bootstrap-extended.css";
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";
@import "../../assets/css/dark-theme.css";
@import "../../assets/css/semi-dark.css";
@import "../../assets/css/header-colors.css";
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
</style>