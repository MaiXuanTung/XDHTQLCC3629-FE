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
          <h3 style="color: #e74c3c;">Thông tin nhận hàng</h3>
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
              <div class="price"><span class="current-price">Đơn giá</span></div>
              <div class="quantity"><span class="current-price">Số lượng</span></div>
              <div class="total-price">Thành tiền</div>
            </div>
            <template v-for="(v, k2) in shop.products" :key="k2">
              <div class="product-card">
                <img :src="v.hinh_anh" alt="Hình ảnh sản phẩm">
                <div class="product-info">
                  <div class="product-name">{{ v.ten_san_pham }}</div>
                </div>
                <div class="price"><span class="current-price">{{ formatToVND(v.don_gia) }}</span></div>
                <div class="quantity"><span class="current-price">{{ v.so_luong }}</span></div>
                <div class="total-price">{{ formatToVND(v.so_luong * v.don_gia) }}</div>
              </div>
            </template>
            <div class="row mb-3 ms-2 me-3">
              <div class="col-sm-6">
                <div class="col-sm-12 mt-2">
                  <div class="col-sm-12 mt-2">
                    <strong>Đơn vị vận chuyển: </strong>
                    <select v-model="shop.selectedDVVC" @change="handleChonDVVC(shop)" class="custom-select mt-1">
                      <option disabled value="">-- Chọn đơn vị vận chuyển --</option>
                      <option v-for="dv in list_don_vi_van_chuyen" :key="dv.id" :value="dv">
                        {{ dv.ten_cong_ty }} ({{ formatToVND(dv.cuoc_van_chuyen) }})
                      </option>
                    </select>
                  </div>
                </div>
                <hr>
                <div class="col-sm-12" v-if="shop.selectedDVVC">
                  <strong>Phí vận chuyển</strong>: <a class="text-danger"> {{
                    formatToVND(shop.selectedDVVC.cuoc_van_chuyen) }}</a>
                </div>
                <hr>
                <div class="col-sm-12">
                  <strong>Ngày nhận hàng (dự kiến)</strong>: {{ calculateDeliveryDate(shop.products[0].ngay_dat_hang) }}
                </div>
                <hr>
                <div class="col-sm-12"><strong>Được đồng kiểm</strong></div>
              </div>
              <div class="col-sm-2"></div>
              <div class="col-sm-4 text-end mt-2">
                <h5>Tổng tiền:
                  <strong style="color: red;">
                    {{ formatToVND(getTotalByShop(shop.products) + (shop.cuoc_van_chuyen || 0)) }}
                  </strong>
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
        <button class="btn-buy" :disabled="isLoading" @click="datHang">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isLoading ? "Đang xử lý..." : "Đặt hàng" }}
        </button>
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
      list_don_vi_van_chuyen: [],
      groupedSanPham: [],
      isLoading: false,
    };
  },
  computed: {
    tongTien() {
      let productTotal = this.list_san_pham.reduce((sum, v) => {
        return sum + (Number(v.don_gia) * Number(v.so_luong));
      }, 0);
      let shippingTotal = this.groupedSanPham.reduce((sum, shop) => {
        return sum + (Number(shop.cuoc_van_chuyen) || 0);
      }, 0);
      return productTotal + shippingTotal;
    }
  },
  mounted() {
    const list_san_pham = localStorage.getItem("donHangData");
    if (list_san_pham) {
      this.list_san_pham = JSON.parse(list_san_pham);
      this.groupSanPhamByShop();
    }
    this.ten_nguoi_nhan = localStorage.getItem("ho_ten");
    this.so_dien_thoai = localStorage.getItem("so_dien_thoai");
    this.dia_chi = localStorage.getItem("dia_chi");
    this.loadDataDVVC();
  },
  methods: {
    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },

    getTotalByShop(products) {
      return products.reduce((sum, v) => sum + (Number(v.don_gia) * Number(v.so_luong)), 0);
    },

    async datHang() {
      if (!Array.isArray(this.list_san_pham) || this.list_san_pham.length === 0) {
        toaster.error("Không có sản phẩm để đặt hàng!");
        return;
      }
      for (let shop of this.groupedSanPham) {
        if (!shop.selectedDVVC) {
          toaster.error(`Vui lòng chọn đơn vị vận chuyển cho nhà sản xuất: ${shop.ten_cong_ty}`);
          return;
        }
      }
      this.isLoading = true;
      try {
        let dsCuocVanChuyen = this.groupedSanPham.map(shop => ({
          id_nha_san_xuat: shop.id_nha_san_xuat,
          id_don_vi_van_chuyen: shop.selectedDVVC.id,
          cuoc_van_chuyen: shop.cuoc_van_chuyen
        }));
        let tongTienSanPham = this.list_san_pham.reduce((sum, sp) => {
          return sum + sp.don_gia * sp.so_luong;
        }, 0);
        let cuocVanChuyen = this.groupedSanPham.reduce((sum, shop) => {
          return sum + (shop.cuoc_van_chuyen || 0);
        }, 0);
        let tongTien = tongTienSanPham + cuocVanChuyen;
        let orderData = {
          user_id: localStorage.getItem("user_id"),
          dia_chi_vi: localStorage.getItem("dia_chi_vi"),
          loai_tai_khoan: localStorage.getItem("loai_tai_khoan"),
          ten_nguoi_nhan: this.ten_nguoi_nhan,
          so_dien_thoai: this.so_dien_thoai,
          dia_chi: this.dia_chi,
          tong_tien: tongTien,
          cuoc_van_chuyen: cuocVanChuyen,
          san_pham: this.list_san_pham.map(sp => ({
            id_san_pham: sp.id_san_pham,
            id_nha_san_xuat: sp.id_nha_san_xuat,
            so_luong: sp.so_luong,
            don_gia: sp.don_gia
          })),
          don_vi_van_chuyen: this.groupedSanPham.map(shop => ({
            id_nha_san_xuat: shop.id_nha_san_xuat,
            id_don_vi_van_chuyen: shop.selectedDVVC.id
          })),
          chi_tiet_cuoc_vc: dsCuocVanChuyen
        };
        console.log(orderData)
        let response = await baseRequest.post("user/gio-hang/dat-hang", orderData);
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
      } finally {
        this.isLoading = false; // tắt spinner
      }
    },

    isWeekend(date) {
      const d = new Date(date);
      return d.getDay() === 0 || d.getDay() === 6;
    },

    calculateDeliveryDate(orderDate) {
      let deliveryDate = new Date(orderDate);
      let addedDays = 0;
      while (addedDays < 4) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        if (!this.isWeekend(deliveryDate)) {
          addedDays++;
        }
      }
      return this.formatDate(deliveryDate);
    },

    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    },

    loadDataDVVC() {
      baseRequest.get("user/don-vi-van-chuyen/lay-du-lieu").then(res => {
        if (res.data.status) {
          this.list_don_vi_van_chuyen = res.data.data;
        } else {
          toaster.error("Thông báo<br>" + res.data.message);
        }
      });
    },

    handleChonDVVC(shop) {
      if (shop.selectedDVVC) {
        shop.cuoc_van_chuyen = Number(shop.selectedDVVC.cuoc_van_chuyen);
      } else {
        shop.cuoc_van_chuyen = 0;
      }
      this.groupedSanPham = [...this.groupedSanPham]; // Trigger reactivity
    },

    groupSanPhamByShop() {
      let grouped = {};
      this.list_san_pham.forEach(sp => {
        if (!grouped[sp.ten_cong_ty]) {
          grouped[sp.ten_cong_ty] = {
            ten_cong_ty: sp.ten_cong_ty,
            products: [],
            selectedDVVC: null,
            cuoc_van_chuyen: 0,
            id_nha_san_xuat: sp.id_nha_san_xuat,
          };
        }
        grouped[sp.ten_cong_ty].products.push(sp);
      });
      this.groupedSanPham = Object.values(grouped);
    },

    getSelectedDVVCForProduct(sp) {
      // Tìm đơn vị vận chuyển đã được chọn cho sản phẩm này
      let selectedShop = this.groupedSanPham.find(shop =>
        shop.products.some(product => product.id_san_pham === sp.id_san_pham)
      );
      if (selectedShop && selectedShop.selectedDVVC) {
        return selectedShop.selectedDVVC.id;
      }
      return null;
    },

  }
};
</script>

<style scoped>
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
  background: #e3f2fd;
  /* Màu xanh nhạt */
  padding: 15px;
  border-radius: 8px;
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

.custom-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  background-color: #fff;
  font-size: 1rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.custom-select:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}
</style>
