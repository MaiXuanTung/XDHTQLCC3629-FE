<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
      </div>
      <div class="col-lg-6 text-end">
        <select class="select-css" v-model="LocTheoNSX">
          <option value="">Nhà Sản Xuất - Tất Cả</option>
          <template v-for="(value, index) in list_nha_san_xuat" :key="index">
            <option v-bind:value="value.id">{{ value.ten_cong_ty }} </option>
          </template>
        </select>
      </div>
    </div>

    <!-- Nút tìm kiếm cố định góc phải dưới -->
    <button @click="showPopup = true" class="search-button"><i class="fa-solid fa-magnifying-glass"></i></button>

    <!-- Popup tìm kiếm -->
    <div v-if="showPopup" class="search-popup" @click.self="closePopup">
      <div class="popup-content">
        <button @click="closePopup" class="close-btn">❌</button>
        <h4>Tìm kiếm sản phẩm</h4>
        <input type="text" v-model="searchQuery" @input="searchProduct" @keyup.enter="handleEnterKey"
          placeholder="Nhập tên sản phẩm hoặc nhà sản xuất..." class="form-control" ref="searchInput" />
      </div>
    </div>

    <div class="row">
      <template v-for="(san_phams, ten_cong_ty) in locDataTheoNSX" :key="ten_cong_ty">
        <div class="col-12">
          <h2 class="mt-3 text-center mb-4"><b>{{ ten_cong_ty }}</b></h2>
          <div class="row row-cols-1 row-cols-md-2 g-3">
            <div class="col" v-for="sp in san_phams" :key="sp.id">
              <div class="card card-home-page h-100">
                <a v-bind:href="'/chi-tiet-san-pham/' + sp.id" style="color: black;">
                  <div class="row g-0 h-100">
                    <div class="col-md-4">
                      <img :src="sp.hinh_anh" alt="Hình ảnh sản phẩm" class="card-img">
                    </div>
                    <div class="col-md-8 d-flex flex-column">
                      <div class="card-body flex-grow-1">
                        <h5 class="card-title mb-4 text-primary">{{ sp.ten_san_pham }}</h5>
                        <p class="card-text">Sản phẩm của <b>{{ ten_cong_ty }}</b></p>
                        <p class="card-text text-danger">Giá: <b>{{ formatToVND(sp.gia_ban) }}</b></p>
                        <p class="card-text">Đơn vị tính: <b>{{ sp.don_vi_tinh }}</b></p>
                        <a v-bind:href="'/chi-tiet-san-pham/' + sp.id" class="btn-view-detail mt-2">Xem chi tiết</a>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <hr>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from "../../../core/baseRequest";
const toaster = createToaster({ position: "top-right" });
export default {
  data() {
    return {
      list_san_pham: [],
      list_nha_san_xuat: [],
      LocTheoNSX: "",
      filtered_san_pham: [],
      searchQuery: "",
      showPopup: false,
      so_luong_choose: 0
    };
  },

  mounted() {
    this.loadDataSanPham();
    this.loadDataNhaSanXuat();
  },
  computed: {
    locDataTheoNSX() {
      if (this.LocTheoNSX === "") {
        return this.filtered_san_pham; // Nếu không lọc, trả về tất cả
      }
      const result = {};
      for (const ten_cong_ty in this.filtered_san_pham) {
        const spList = this.filtered_san_pham[ten_cong_ty].filter(sp => String(sp.id_nha_san_xuat) === String(this.LocTheoNSX));
        if (spList.length > 0) {
          result[ten_cong_ty] = spList;
        }
      }
      return result;
    },
  },
  methods: {
    loadDataSanPham() {
      baseRequest.get('user/san-pham/get-data-by-user').then((res) => {
        if (res.data.status) {
          this.list_san_pham = res.data.data;
          this.filtered_san_pham = res.data.data;
        } else {
          toaster.error('Thông báo<br>' + res.data.message);
        }
      });
    },
    loadDataNhaSanXuat() {
      baseRequest
        .get('user/don-hang/nha-san-xuat/lay-du-lieu-nsx-cho-trang-chu')
        .then((res) => {
          if (res.data.status) {
            this.list_nha_san_xuat = res.data.nha_san_xuat_for_homepage;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    searchProduct() {
      if (!this.searchQuery) {
        this.filtered_san_pham = this.list_san_pham;
        return;
      }

      const keyword = this.searchQuery.toLowerCase();
      this.filtered_san_pham = {};

      for (const ten_cong_ty in this.list_san_pham) {
        const filtered = this.list_san_pham[ten_cong_ty].filter(sp =>
          sp.ten_san_pham.toLowerCase().includes(keyword) ||
          ten_cong_ty.toLowerCase().includes(keyword)
        );

        if (filtered.length) {
          this.filtered_san_pham[ten_cong_ty] = filtered;
        }
      }
    },

    closePopup() {
      this.showPopup = false;
    },

    handleEnterKey() {
      this.searchProduct();
      this.closePopup();
    },

    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
  }
}
</script>
<style>
/* Card có hiệu ứng nổi khi hover */
.card-home-page {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-home-page:hover {
  transform: translateY(-10px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

/* Nút tìm kiếm cố định góc phải dưới */
.search-button {
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #5bc0de;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
}

/* Popup tìm kiếm */
.search-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}


/* Toàn bộ trang */
body {
  background-color: #e3f5fcbd;
  font-family: 'Roboto', sans-serif;
  padding: 15px;
}

/* Hình ảnh sản phẩm */
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Giữ tỉ lệ ảnh, không méo */
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}


.select-css {
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
  inline-size: 50%;
}

.select-css::-ms-expand {
  display: none;
}

.select-css:hover {
  border-color: #888;
}

.select-css:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}

.select-css option {
  font-weight: normal;
}

/* css nút xem chi tiết */
.btn-view-detail {
  display: inline-block;
  margin-top: 5px;
  padding: 8px 16px;
  background-color: #8a8c8d;
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-view-detail:hover {
  background-color: #ebeef1;
}

/* testttttttttttttttttttttttttttttt csssssssssssssssssssssssssssssssss */
</style>
