<template>
  <div>
    <div class="page-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3"><a href="/home-page">Trang Chủ</a></div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Giỏ Hàng</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--end breadcrumb-->
      <div class="card mb-1" style="height: 55px;">
        <div class="row g-0">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <dl class="row">
                  <dd class="col-sm-6">Sản Phẩm</dd>
                </dl>
              </div>
              <div class="col-md-3">
                <dl class="row">
                  <dd class="col-sm-6"></dd>
                </dl>
              </div>
              <div class="col-md-2">
                <dl class="row">
                  <dd class="col-sm-6">Đơn Giá</dd>
                </dl>
              </div>
              <div class="col-md-2 text-end">
                <dl class="row">
                  <dd class="col-sm-6">Số Lượng</dd>
                </dl>
              </div>
              <div class="col-md-2">
                <dl class="row">
                  <dd class="col-sm-6">Thành Tiền</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-for="(v, k) in list_san_pham">
        <div class="card mb-1">
          <div class="row g-0">
            <div class="card-header">
              <h5><input type="checkbox" style="width: 20px; height: 20px;" v-model="v.selected" /> {{ v.ten_cong_ty }}
              </h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <dl class="row">
                    <img :src="v.hinh_anh" alt="">
                  </dl>
                </div>
                <div class="col-md-4">
                  <dl class="row">
                    <dd class="col-sm-6">{{ v.ten_san_pham }}</dd>
                  </dl>
                </div>
                <div class="col-md-2">
                  <dl class="row">
                    <dd class="col-sm-6"><b>{{ formatToVND(v.don_gia) }}</b></dd>
                  </dl>
                </div>
                <div class="col-md-2">
                  <div class="custom-quantity">
                    <button type="button" class="btn btn-outline-secondary" @click="giamSoLuong(k, v.id)">-</button>
                    <input type="number" class="form-control text-center" v-model.number="v.so_luong" min="1"
                      :max="v.so_luong_ton_kho" readonly>
                    <button type="button" class="btn btn-outline-secondary" @click="tangSoLuong(k, v.id)">+</button>
                  </div>
                </div>
                <div class="col-md-2">
                  <dl class="row">
                    <dd class="col-sm-6 text-danger">{{ formatToVND(v.don_gia * v.so_luong) }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="card fixed-footer">
        <div class="row g-0">
          <div class="card-body">
            <div class="row">
              <div class="col-md-2">
                <dl class="row">
                  <dd class="col-sm-6 text-danger"></dd>
                </dl>
              </div>
              <div class="col-md-2">
                <dl class="row">
                  <dd class="col-sm-6 text-danger"></dd>
                </dl>
              </div>
              <div class="col-md-2">
                <dl class="row">
                  <dd class="col-sm-6 text-danger"></dd>
                </dl>
              </div>
              <div class="col-md-1">
                <dl class="row">
                  <dd class="col-sm-6 text-danger"></dd>
                </dl>
              </div>
              <div class="col-md-2 text-end">
                <dl class="row">
                  <dd class="col-sm-6 text-danger"><b>Tổng Tiền</b></dd>
                </dl>
              </div>
              <div class="col-md-3 text-end">
                <dl class="row">
                  <dd class="col-sm-6 text-danger">{{ formatToVND(tongTien) }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    }
  },
  mounted() {
    this.loadDataSanPham();
  },
  computed: {
    tongTien() {
      return this.list_san_pham
        .filter((v) => v.selected)
        .reduce((sum, v) => sum + v.don_gia * v.so_luong, 0);
    },
  },
  methods: {
    loadDataSanPham() {
      baseRequest
        .get('admin/gio-hang/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_san_pham = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    async capNhatSoLuong(id, so_luong) {
      await baseRequest
        .post('admin/gio-hang/cap-nhat-so-luong', { id, so_luong })
        .then((res) => {
          toaster.success(res.data.message);
        })
        .catch(() => {
          toaster.error("Cập nhật số lượng thất bại");
        });
    },

    async tangSoLuong(index, id) {
      let sanPham = this.list_san_pham[index];
      if (sanPham.so_luong < sanPham.so_luong_ton_kho) {
        sanPham.so_luong++;
        await this.capNhatSoLuong(id, sanPham.so_luong);
      } else {
        toaster.warning("Trong kho chỉ còn " + sanPham.so_luong_ton_kho + " sản phẩm");
      }
    },

    async giamSoLuong(index, id) {
      let sanPham = this.list_san_pham[index];
      if (sanPham.so_luong > 1) {
        sanPham.so_luong--;
        await this.capNhatSoLuong(id, sanPham.so_luong);
      } else {
        toaster.warning("Số lượng tối thiểu là 1");
      }
    },

    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 1000);
    },

    tinhTongTien() {
      this.tongTien = this.list_san_pham
        .filter(v => v.selected) // Lọc sản phẩm được tick
        .reduce((sum, v) => sum + v.don_gia * v.so_luong, 0);
    },
  },
}
</script>
<style scoped>
.custom-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-quantity button {
  width: 35px;
  height: 35px;
  padding: 0;
  text-align: center;
}

.custom-quantity input {
  width: 60px;
  height: 35px;
  text-align: center;
  margin: 0 0px;
}

.fixed-footer {
  position: fixed;
  bottom: 13px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1265px;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  height: 80px;
}

.page-content {
  padding-bottom: 80px;
}
</style>
