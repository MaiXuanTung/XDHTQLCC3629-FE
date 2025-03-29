<template>
  <div>
    <h2>DANH SÁCH SẢN PHẨM</h2>
    <hr>

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
      <template v-for="(san_phams, ten_cong_ty) in filtered_san_pham" :key="ten_cong_ty">
        <div class="col-12">
          <h3 class="mt-3">Sản Phẩm Của <b>{{ ten_cong_ty }}</b></h3>
          <div class="row row-cols-1 row-cols-md-2 g-3">
            <div class="col" v-for="sp in san_phams" :key="sp.id">
              <div class="card h-100">
                <div class="row g-0 h-100">
                  <div class="col-md-4">
                    <a v-bind:href="'/chi-tiet-san-pham/' + sp.id">
                      <img :src="sp.hinh_anh" alt="Hình ảnh sản phẩm" class="card-img">
                    </a>
                  </div>
                  <div class="col-md-8 d-flex flex-column">
                    <div class="card-body flex-grow-1">
                      <h5 class="card-title">{{ sp.ten_san_pham }}</h5>
                      <p class="card-text">Sản phẩm của <b>{{ ten_cong_ty }}</b></p>
                      <p class="card-text">Số lượng còn: <b>{{ sp.so_luong_ton_kho }}</b></p>
                      <p class="card-text">Đơn giá: <b>{{ sp.gia_ban }} đ</b></p>
                      <p class="card-text">Đơn vị tính: <b>{{ sp.don_vi_tinh }}</b></p>
                    </div>
                  </div>
                </div>
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
      filtered_san_pham: [],
      searchQuery: "",
      showPopup: false,
      so_luong_choose: 0
    };
  },

  mounted() {
    this.loadDataSanPham();
  },

  methods: {
    loadDataSanPham() {
      baseRequest.get('admin/san-pham/get-data-by-user').then((res) => {
        if (res.data.status) {
          this.list_san_pham = res.data.data;
          this.filtered_san_pham = res.data.data;
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
  }
}
</script>
<style>
/* Card có hiệu ứng nổi khi hover */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
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
</style>
