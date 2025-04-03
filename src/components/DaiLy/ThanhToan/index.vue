<template>
  <div>
    <div class="page-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3"><a href="/home-page">Trang Chủ</a></div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <a class="breadcrumb-title pe-3" href="/gio-hang">Giỏ Hàng</a>
          </nav>
        </div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="/thanh-toan"></a></li>
              <li class="breadcrumb-item active" aria-current="page">Thanh Toán</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <h3 style="color: #e74c3c;">
            Thông tin nhận hàng</h3>
          <div class="row">
            <div class="col-sm-3">
              <strong>
                <p style="font-size: large;"><i class="fa-solid fa-store"></i> {{ ten_nguoi_nhan }}</p>
              </strong>
            </div>
            <div class="col-sm-3">
              <strong>
                <p style="font-size: large;"><i class="fa-solid fa-phone"></i> {{ so_dien_thoai }}</p>
              </strong>
            </div>
            <div class="col-sm-3">
              <p style="font-size: medium;"><i class="fa-solid fa-location-dot"></i> {{ dia_chi }}</p>
            </div>
          </div>
        </div>
      </div>
      <template v-for="(shop, k) in groupedSanPham" :key="k">
        <div class="shop-card mb-4">
          <div class="shop-header">
            <span class="shop-name"><i class="fas fa-store"></i> {{ shop.ten_cong_ty }}</span>
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
            <div class="row mb-3 ms-2 me-3">
              <div class="col-sm-6">
                <div class="col-sm-12">
                  <strong>Phương thức vận chuyển</strong>: tên đơn vị
                </div>
                <hr>
                <div class="col-sm-12">
                  <strong>Ngày nhận hàng (dự kiến)</strong>: {{ calculateDeliveryDate(shop.products[0].ngay_dat_hang) }}
                </div>
                <hr>
                <div class="col-sm-12">
                  <strong>Được đồng kiểm</strong>
                </div>
              </div>
              <div class="col-sm-2"></div>
              <div class="col-sm-4 text-end">
                <h5>Tổng tiền: <strong style="color: red;">{{ formatToVND(getTotalByShop(shop.products)) }}</strong>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="cart-footer">
        <div class="total-amount">
          <span>Tổng tiền cần thanh toán: </span>
          <span class="amount">{{ formatToVND(tongTien) }}</span>
        </div>
        <button class="btn-buy" @click="datHang">Đặt hàng</button>
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
      ten_nguoi_nhan: "",
      so_dien_thoai: "",
      dia_chi: "",
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
    console.log(list_san_pham)
    if (list_san_pham) {
      this.list_san_pham = JSON.parse(list_san_pham);
    }
    this.ten_nguoi_nhan = localStorage.getItem("ho_ten");
    this.so_dien_thoai = localStorage.getItem("so_dien_thoai");
    this.dia_chi = localStorage.getItem("dia_chi");
  },
  methods: {
    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 1000);
    },

    getTotalByShop(products) {
      return products.reduce((sum, v) => sum + (v.don_gia * v.so_luong), 0);
    },

    async datHang() {
      if (!this.list_san_pham.length) {
        toaster.error("Không có sản phẩm để đặt hàng!");
        return;
      }
      try {
        // Chuẩn bị dữ liệu đơn hàng
        let orderData = {
          user_id: localStorage.getItem("user_id"), // ID người dùng
          ten_nguoi_nhan: this.ten_nguoi_nhan,
          so_dien_thoai: this.so_dien_thoai,
          dia_chi: this.dia_chi,
          san_pham: this.list_san_pham.map(sp => ({
            id_san_pham: sp.id_san_pham,
            id_nha_san_xuat: sp.id_nha_san_xuat,
            so_luong: sp.so_luong,
            don_gia: sp.don_gia
          }))
        };
        let response = await baseRequest.post("dai-ly/gio-hang/dat-hang", orderData);
        if (response.data.success) {
          toaster.success("Đặt hàng thành công!");
          localStorage.removeItem("donHangData");
          this.list_san_pham = [];
          this.$router.push("/don-hang");
        } else {
          toaster.error("Đặt hàng thất bại, vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Lỗi khi đặt hàng:", error);
        toaster.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    },

    isWeekend(date) {
      const d = new Date(date);
      const day = d.getDay(); // Thứ trong tuần (0 - Chủ nhật, 6 - Thứ 7)
      return day === 0 || day === 6; // Nếu là Chủ nhật hoặc Thứ 7
    },

    // Hàm tính ngày nhận hàng dựa trên ngày làm việc
    calculateDeliveryDate(orderDate) {
      const orderDateObj = new Date(orderDate);
      let deliveryDate = new Date(orderDateObj);

      let addedDays = 0; // Số ngày làm việc cần thêm vào
      while (addedDays < 4) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        if (!this.isWeekend(deliveryDate)) { // Kiểm tra nếu không phải cuối tuần
          addedDays++;
        }
      }

      return this.formatDate(deliveryDate);
    },

    // Hàm format ngày theo định dạng dd/mm/yyyy
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }
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

.col-sm-4.text-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
