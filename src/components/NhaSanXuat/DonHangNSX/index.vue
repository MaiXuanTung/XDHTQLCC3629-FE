<template>
  <div class="page-content">
    <div class="card">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark">DANH SÁCH ĐƠN HÀNG</h4>
          </div>
          <div class="col-sm-6 text-end">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-9">
            <div class="input-group mb-3 ">
              <input v-on:keyup.enter="searchDonHang()" v-model="key_search.abc" type="text"
                class="form-control search-control" placeholder="Nhập tên sản phẩm cần tìm">
              <button v-on:click="searchDonHang()" class="btn btn-primary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div class="col-lg-3">
            <div>
              <select class="form-control" v-model="LocTheoTenCongTy">
                <option value="">Tên chủ đơn hàng - Tất Cả</option>
                <template v-for="(value, index) in list_dai_ly" :key="index">
                  <option v-bind:value="value.id">{{ value.ten_cong_ty }} </option>
                </template>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive" style="height: 390px;">
          <table class="table mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Đơn Hàng</th>
                <th class="text-center">Actions</th>
                <th>Tình Trạng</th>
                <th>Người Đặt</th>
                <th>Tổng Tiền</th>
                <th>Cước Vận Chuyển</th>
                <th>Cần Thanh Toán</th>
                <th>Chi Tiết</th>
                <th>Ngày Đặt</th>
                <th>Tình Trạng TT</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in locDataTheoTenCongTy" :key="k">
                <tr>
                  <td><strong>{{ k + 1 }}</strong></td>
                  <td><strong>ĐH {{ v.id_don_hang }}</strong></td>
                  <td>
                    <div v-if="v.tinh_trang_chi_tiet_don_hang == 1" class="d-flex order-actions">
                      <a type="button" @click="moXacNhan(v)" class="ms-3 text-success" data-bs-toggle="modal"
                        data-bs-target="#xacNhanModal"><i class="fa-solid fa-check"></i></a>
                    </div>
                    <div
                      v-else-if="v.tinh_trang_don_hang == 5 || v.tinh_trang_don_hang == 3 || v.tinh_trang_don_hang == 4 || v.tinh_trang_don_hang == 2 || v.tinh_trang_don_hang == 6 || v.tinh_trang_chi_tiet_don_hang == 5 || v.tinh_trang_chi_tiet_don_hang == 3 || v.tinh_trang_chi_tiet_don_hang == 4 || v.tinh_trang_chi_tiet_don_hang == 2 || v.tinh_trang_chi_tiet_don_hang == 6"
                      :disabled="v.tinh_trang_don_hang == 5 || v.tinh_trang_don_hang == 3 || v.tinh_trang_don_hang == 4 || v.tinh_trang_don_hang == 2 || v.tinh_trang_don_hang == 6 || v.tinh_trang_chi_tiet_don_hang == 5 || v.tinh_trang_chi_tiet_don_hang == 3 || v.tinh_trang_chi_tiet_don_hang == 4 || v.tinh_trang_chi_tiet_don_hang == 2 || v.tinh_trang_chi_tiet_don_hang == 6"
                      class="d-flex order-actions">
                      <a type="button" class="ms-3"><i class="fa-solid fa-check" style="color: gray;"></i></a>
                    </div>
                  </td>
                  <td>
                    <div v-if="v.tinh_trang_chi_tiet_don_hang == 1"
                      class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận</div>
                    <div v-else-if="v.tinh_trang_chi_tiet_don_hang == 2"
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Chờ vận chuyển</div>
                    <div v-else-if="v.tinh_trang_chi_tiet_don_hang == 3"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                        class="bx bxs-circle me-1"></i>Hoàn thành</div>
                    <div v-else-if="v.tinh_trang_chi_tiet_don_hang == 4"
                      class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đã hủy</div>
                    <div v-else-if="v.tinh_trang_chi_tiet_don_hang == 5"
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đang vận chuyển</div>
                    <div v-else-if="v.tinh_trang_chi_tiet_don_hang == 6"
                      class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Giao hàng thành công</div>
                  </td>
                  <td>{{ v.ten_khach_hang }}</td>
                  <td class="text-danger"><strong>{{ formatToVND(v.tong_tien_san_pham) }}</strong></td>
                  <td class="text-danger text-center"><strong>{{ formatToVND(v.tong_cuoc_van_chuyen) }}</strong></td>
                  <td class="text-danger"><strong>{{ formatToVND(v.tong_tien_don_hang) }}</strong></td>
                  <td>
                    <div class="d-flex order-actions">
                      <a title="Xem chi tiết đơn hàng" @click="xemChiTietDonHang(v.id_don_hang)"
                        class="ms-3 text-info"><i type="button" data-bs-toggle="modal"
                          data-bs-target="#chiTietDonHangModal" class="fa-solid fa-circle-info"></i></a>
                    </div>
                  </td>
                  <td>{{ formatDate(v.ngay_dat) }}</td>
                  <td>
                    <div v-if="v.tinh_trang_thanh_toan == 0"
                      class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Chờ thanh toán</div>
                    <div v-else-if="v.tinh_trang_thanh_toan == 1"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                        class="bx bxs-circle me-1"></i>Đã thanh toán</div>
                    <div v-else-if="v.tinh_trang_thanh_toan == 3"
                      class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đã hủy</div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- modal -->
    <!-- modal xác nhận -->
    <div class="modal fade" id="xacNhanModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body d-flex">
            <div class="alert border-0 border-start border-5 border-success alert-dismissible fade show py-2">
              <div class="d-flex align-items-center">
                <div class="font-35 text-success"><i class="bx bxs-check-circle"></i>
                </div>
                <div class="ms-3">
                  <h6 class="mb-0 text-success">Thông Báo</h6>
                  <div>Bạn chắc chắn muốn xác nhận đơn hàng này?</div>
                </div>
              </div>
            </div>
          </div>
          <button @click="xacNhan()" data-bs-dismiss="modal" class="btn btn-border bg-light-success align-middle">
            <h5 class="text-success mt-1">Xác Nhận</h5>
          </button>
        </div>
      </div>
    </div>
    <!-- modal chi tiết -->
    <div class="modal fade" id="chiTietDonHangModal" tabindex="-1" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h4>Chi tiết của đơn hàng {{ this.id_don_hang_dang_xem }}</h4>
            <hr>
            <table class="table mb-0">
              <thead class="table-light">
                <tr>
                  <th>#</th>
                  <th>Sản Phẩm</th>
                  <th>Hình Ảnh</th>
                  <th>Đơn Giá</th>
                  <th>SL</th>
                  <th>Thành Tiền</th>
                  <th>Đơn Vị Vận Chuyển</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(v, k) in list_chi_tiet_don_hang" :key="k">
                  <tr>
                    <td>{{ k + 1 }}</td>
                    <td>{{ v.ten_san_pham }}</td>
                    <td><img :src="v.hinh_anh" class="img-fluid" alt="..." style="max-width: 100px; height: auto;" />
                    </td>
                    <td><strong>{{ formatToVND(v.don_gia) }}</strong></td>
                    <td>{{ v.so_luong }} sản phẩm</td>
                    <td><strong class="text-danger">{{ formatToVND(v.don_gia * v.so_luong) }}</strong></td>
                    <td>{{ v.ten_dvvc }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
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
      list_don_hang: [],
      list_dai_ly: [],
      list_chi_tiet_don_hang: [],
      id_don_hang_dang_xem: null,
      id_can_huy: '',
      key_search: {},
      LocTheoTenCongTy: "",
    }
  },
  mounted() {
    this.loadDataDonHang();
    this.loadDataDaiLy();
  },
  computed: {
    locDataTheoTenCongTy() {
      if (this.LocTheoTenCongTy === "") {
        return this.list_don_hang; // Hiển thị tất cả nếu chưa chọn gì
      }
      return this.list_don_hang.filter(item => String(item.user_id) === String(this.LocTheoTenCongTy));
    },
  },
  methods: {
    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    //xác nhận đơn hàng
    moXacNhan(donHang) {
      this.donHangXacNhan = donHang;
    },

    xacNhan() {
      if (this.donHangXacNhan) {
        this.xacNhanDonHang(this.donHangXacNhan);
        this.donHangXacNhan = null;
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById('xacNhanModal'));
      modal.hide();
    },

    xacNhanDonHang(v) {
      baseRequest
        .post('user/don-hang/nha-san-xuat/xac-nhan-don-hang', v)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDonHang();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    searchDonHang() {
      baseRequest
        .post('user/don-hang/nha-san-xuat/tim-don-hang-nsx', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_don_hang = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    loadDataDonHang() {
      baseRequest
        .get('user/don-hang/nha-san-xuat/lay-du-lieu-cho-nsx')
        .then((res) => {
          if (res.data.status) {
            this.list_don_hang = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    xemChiTietDonHang(id) {
      this.id_don_hang_dang_xem = id;
      baseRequest
        .post(`user/don-hang/nha-san-xuat/chi-tiet`, { id_don_hang: id })
        .then((res) => {
          if (res.data.status) {
            this.list_chi_tiet_don_hang = res.data.data;
          } else {
            toaster.error("Không thể tải chi tiết đơn hàng.");
          }
        });
    },

    loadDataDaiLy() {
      baseRequest
        .get('admin/dai-ly/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_dai_ly = res.data.dai_ly;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
  },
}
</script>
<style></style>