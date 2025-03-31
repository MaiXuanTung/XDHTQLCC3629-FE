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
              <li class="breadcrumb-item active" aria-current="page">Thanh Toán</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <h3 style="color: #e74c3c;"><i class="fa-solid fa-location-dot"></i> Địa chỉ nhận hàng</h3>
          <div class="row">
            <div class="col-sm-3">
              <h5>tên</h5>
            </div>
            <div class="col-sm-3">
              <h5>số điện thoại</h5>
            </div>
            <div class="col-sm-3">
              <p>địa chỉ</p>
            </div>
          </div>
        </div>
      </div>
      <template v-for="(shop, k) in groupedSanPham" :key="k">
        <div class="shop-card">
          <div class="shop-header">
            <h5>{{ shop.ten_cong_ty }}</h5>
          </div>
          <div class="shop-body">
            <div class="product-card-custom">
              <div class="product-info">
                <p>Sản Phẩm</p>
              </div>
              <div class="price">
                <span class="current-price">Đơn giá</span>
              </div>
              <div class="quantity">
                <span class="current-price">Số lượng</span>
              </div>
              <div class="total-price">Thành tiền</div>
            </div>
            <template v-for="(v, k) in shop.products" :key="k">
              <div class="product-card">
                <img :src="v.hinh_anh" alt="Hình ảnh sản phẩm">
                <div class="product-info">
                  <div class="product-name">{{ v.ten_san_pham }}</div>
                </div>
                <div class="price">
                  <span class="current-price">{{ formatToVND(v.don_gia) }}</span>
                </div>
                <div class="quantity">
                  <span class="current-price">{{ v.so_luong }}</span>
                </div>
                <div class="total-price">{{ formatToVND(v.so_luong * v.don_gia) }}</div>
              </div>
            </template>
            <div class="row">
              <div class="col-sm-6">
                <div class="col-sm-12">
                  Phương thức vận chuyển: tên đơn vị
                </div>
                <hr>
                <div class="col-sm-12">
                  Ngày nhận hàng: tính bằng cách lấy ngày đặt hàng cộng thêm 4
                </div>
                <hr>
                <div class="col-sm-12">
                  Được đồng kiểm
                </div>
              </div>
              <div class="col-sm-2"></div>
              <div class="col-sm-4 text-center">
                Tổng tiền(2 sản phẩm):
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="cart-footer">
        <div class="total-amount">
          <span>Tổng số tiền({{ list_san_pham.length }} sản phẩm): </span>
          <span class="amount">{{ formatToVND(tongTien) }}</span>
        </div>
        <button class="btn-buy">Đặt hàng</button>
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
      list_san_pham: []
    }
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
    tongTien() {
      return this.list_san_pham.reduce((sum, v) => sum + (v.don_gia * v.so_luong), 0);
    }
  },
  mounted() {
    const list_san_pham = localStorage.getItem("donHangData");
    if (list_san_pham) {
      this.list_san_pham = JSON.parse(list_san_pham);
    }
  },
  methods: {
    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 1000);
    },
  },
}
</script>

<style>
.card-header {
  background-color: #f8f9fa;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.card-body p {
  margin: 5px 0;
}

.shop-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
}

.shop-header {
  background-color: #f8f9fa;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.shop-body {
  padding: 10px;
}

.product-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.product-card-custom {
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid #ddd;
}

.product-card img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.product-info {
  flex-grow: 1;
  padding-left: 10px;
}

.price,
.quantity,
.total-price {
  text-align: center;
  width: 100px;
}

.total-price {
  font-size: 16px;
  font-weight: bold;
  color: red;
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
</style>
