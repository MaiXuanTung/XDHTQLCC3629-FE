<template>
  <div>
    <div class="page-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3"><a href="/home-page">Trang Chủ</a></div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"></a></li>
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
              <div class="col-md-5 text-start">Sản Phẩm</div>
              <div class="col-md-2">Đơn Giá</div>
              <div class="col-md-2 text-center">Số Lượng</div>
              <div class="col-md-2">Thành Tiền</div>
              <div class="col-md-1 text-end">Thao Tác</div>
            </div>
          </div>
        </div>
      </div>
      <template v-for="(shop, shopIndex) in groupedSanPham">
        <!-- Header của Nhà Bán -->
        <div class="shop-header">
          <input type="checkbox" v-model="shop.selected" @change="toggleSelectAll(shopIndex)">
          <span class="shop-name"><i class="fas fa-store"></i> {{ shop.ten_cong_ty }}</span>
        </div>
        <div v-for="(v, k) in shop.products" :key="v.id" class="product-card">
          <input type="checkbox" v-model="v.selected">
          <img :src="v.hinh_anh" alt="Hình ảnh sản phẩm">
          <div class="product-info">
            <div class="product-name">{{ v.ten_san_pham }}</div>
          </div>
          <div class="price">
            <span class="current-price">{{ formatToVND(v.don_gia) }}</span>
          </div>
          <div class="quantity">
            <button @click="giamSoLuong(shopIndex, k, v.id)">-</button>
            <input type="number" v-model="v.so_luong" readonly>
            <button @click="tangSoLuong(shopIndex, k, v.id)">+</button>
          </div>
          <div class="total-price">{{ formatToVND(v.don_gia * v.so_luong) }}</div>
          <div class="action">
            <span class="delete" @click="xoaSanPham(v.id)">Xóa</span>
          </div>
        </div>
      </template>
      <div class="cart-footer">
        <div class="total-amount">
          <span>Tổng cộng ({{ list_san_pham.length }} Sản phẩm):</span>
          <span class="amount">{{ formatToVND(tongTien) }}</span>
        </div>
        <button class="btn-buy" :disabled="tongTien === 0" @click="muaHang">Mua Hàng</button>
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
      tongTien: 0
    }
  },
  mounted() {
    this.loadDataSanPham();
  },
  computed: {
    tongTien() {
      return this.list_san_pham
        .filter(v => v.selected)
        .reduce((sum, v) => sum + v.don_gia * v.so_luong, 0);
    },
    groupedSanPham() {
      let grouped = {};
      this.list_san_pham.forEach((sp) => {
        if (!grouped[sp.ten_cong_ty]) {
          grouped[sp.ten_cong_ty] = {
            ten_cong_ty: sp.ten_cong_ty,
            selected: false,
            products: [],
          };
        }
        grouped[sp.ten_cong_ty].products.push(sp);
      });
      return Object.values(grouped);
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

    async tangSoLuong(shopIndex, productIndex, id) {
      let sanPham = this.groupedSanPham[shopIndex].products[productIndex];
      if (sanPham.so_luong < sanPham.so_luong_ton_kho) {
        sanPham.so_luong++;
        await this.capNhatSoLuong(id, sanPham.so_luong);
        this.tinhTongTien();
      } else {
        toaster.warning(`Trong kho chỉ còn ${sanPham.so_luong_ton_kho} sản phẩm`);
      }
    },

    async giamSoLuong(shopIndex, productIndex, id) {
      let sanPham = this.groupedSanPham[shopIndex].products[productIndex];
      if (sanPham.so_luong > 1) {
        sanPham.so_luong--;
        await this.capNhatSoLuong(id, sanPham.so_luong);
        this.tinhTongTien();
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

    toggleSelectAll(shopIndex) {
      this.groupedSanPham[shopIndex].products.forEach(sp => sp.selected = this.groupedSanPham[shopIndex].selected);
      this.$nextTick(() => {
        this.tinhTongTien(); // Gọi cập nhật tổng tiền sau khi Vue cập nhật reactivity
      });
    },

    async xoaSanPham(id) {
      try {
        const res = await baseRequest.post('admin/gio-hang/xoa-san-pham', { id });
        if (res.data.status) {
          // Xóa trên frontend sau khi API xử lý xong
          this.list_san_pham = this.list_san_pham.filter(sp => sp.id !== id);
          this.tinhTongTien();
          toaster.success(res.data.message);
        } else {
          toaster.error('Xóa thất bại: ' + res.data.message);
        }
      } catch (error) {
        toaster.error("Lỗi khi xóa sản phẩm");
      }
    },
    muaHang() {
      const sanPhamDaChon = this.list_san_pham.filter(sp => sp.selected);

      if (sanPhamDaChon.length === 0) {
        toaster.warning("Vui lòng chọn ít nhất một sản phẩm để mua.");
        return;
      }
      localStorage.setItem("donHangData", JSON.stringify(sanPhamDaChon));
      this.$router.push("/thanh-toan");
      console.log(localStorage.setItem("donHangData", JSON.stringify(sanPhamDaChon)))
    }
  },
}
</script>
<style scoped>
.shop-header {
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.shop-name {
  margin-left: 10px;
  font-size: 16px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
}

.product-category {
  font-size: 14px;
  color: #666;
}

.product-card {
  display: grid;
  grid-template-columns: 5% 10% 25% 15% 15% 20% 10%;
  /* Adjusted column widths */
  gap: 10px;
  /* Added spacing between columns */
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.product-card img {
  width: 80px;
  /* Fixed width */
  height: 80px;
  /* Fixed height */
  object-fit: cover;
}

.product-info {
  text-align: left;
  padding-left: 10px;
  /* Added padding for spacing */
}

.price,
.quantity,
.total-price,
.action {
  text-align: center;
}

.quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
}

.quantity button {
  width: 30px;
  height: 30px;
}

.quantity input {
  width: 50px;
  height: 30px;
  text-align: center;
}

.total-price {
  font-size: 16px;
  font-weight: bold;
  color: red;
}

.action {
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* Adjusted spacing for better readability */
  color: red;
  font-size: 14px;
  cursor: pointer;
  margin-right: 55px;
}

.action .delete:hover,
.action .find-similar:hover {
  text-decoration: underline;
}

/* Header styling adjustments */
.card-body .row>div {
  text-align: center;
  font-weight: bold;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1265px;
  padding-bottom: 55px;
}

.total-amount {
  font-size: 18px;
  font-weight: 500;
}

.amount {
  color: red;
  font-size: 22px;
  font-weight: bold;
}

.btn-buy {
  background-color: #e74c3c;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-buy:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-content {
  padding-bottom: 80px;
}
</style>
