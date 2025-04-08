<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3"><a href="/home-page">Trang Chủ</a></div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item"><a href="javascript:;"></a></li>
            <li class="breadcrumb-item active" aria-current="page">Đơn Hàng</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive" style="height: 390px;">
          <table class="table mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Trạng Thái</th>
                <th>Tổng Tiền</th>
                <th>Ngày Đặt</th>
                <th>Ngày Giao (dự kiến)</th>
                <th>Tình Trạng Thanh Toán</th>
                <th>Chi Tiết</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in list_don_hang">
                <tr>
                  <td>
                    {{ k + 1 }}
                  </td>
                  <td>
                    <div v-if="v.tinh_trang == 0"
                      class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận</div>
                    <div v-else-if="v.tinh_trang == 1"
                      class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận</div>
                    <div v-else-if="v.tinh_trang == 2"
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đã xác nhận</div>
                    <div v-else-if="v.tinh_trang == 5"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đang vận chuyển</div>
                    <div v-else-if="v.tinh_trang == 3"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                        class="bx bxs-circle me-1"></i>Hoàn thành</div>
                    <div v-else-if="v.tinh_trang == 4"
                      class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đã hủy</div>
                  </td>
                  <td class="text-danger"><strong>{{ formatToVND(v.tong_tien) }}</strong></td>
                  <td>{{ formatDate(v.ngay_dat) }}</td>
                  <td>{{ formatDate(v.ngay_giao) }}</td>
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
                  <td>
                    <div class="d-flex order-actions">
                      <a title="Xem chi tiết đơn hàng" @click="xemChiTietDonHang(v.id)" class="ms-3 text-info"><i
                          type="button" data-bs-toggle="modal" data-bs-target="#chiTietDonHangModal"
                          class="fa-solid fa-circle-info"></i></a>
                    </div>
                  </td>
                  <td>
                    <div v-if="v.tinh_trang == 0 || v.tinh_trang == 1" class="d-flex order-actions">
                      <a type="button" title="Hủy đơn hàng" @click="huyDonHang(v)" class="ms-3" style="color: red;"><i
                          class="bx bxs-trash"></i></a>
                    </div>
                    <div v-else-if="v.tinh_trang == 2 || v.tinh_trang == 3 || v.tinh_trang == 4 || v.tinh_trang == 5"
                      :disabled="v.tinh_trang == 2 || v.tinh_trang == 3 || v.tinh_trang == 4 || v.tinh_trang == 5"
                      class="d-flex order-actions">
                      <a type="button" title="Hủy đơn hàng" class="ms-3" style="color: gray;"><i
                          class="bx bxs-trash"></i></a>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- modal -->
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
                  <th>Nhà Sản Xuất</th>
                  <th>Đơn Vị Vận Chuyển</th>
                  <th>Tình Trạng</th>
                  <th>Cước VC</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(v, k) in list_chi_tiet_don_hang">
                  <tr>
                    <td>{{ k + 1 }}</td>
                    <td>{{ v.ten_san_pham }}</td>
                    <td><img :src="v.hinh_anh" class="img-fluid" alt="..." style="max-width: 100px; height: auto;" />
                    </td>
                    <td><strong>{{ formatToVND(v.don_gia) }}</strong></td>
                    <td>{{ v.so_luong }} sản phẩm</td>
                    <td><strong class="text-danger">{{ formatToVND(v.don_gia * v.so_luong) }}</strong></td>
                    <td>{{ v.ten_nha_san_xuat }}</td>
                    <td>{{ v.ten_dvvc }}</td>
                    <td>
                      <div v-if="v.tinh_trang == 0"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận</div>
                      <div v-else-if="v.tinh_trang == 1"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận</div>
                      <div v-else-if="v.tinh_trang == 2"
                        class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Đã xác nhận</div>
                      <div v-else-if="v.tinh_trang == 3"
                        class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                          class="bx bxs-circle me-1"></i>Hoàn thành</div>
                      <div v-else-if="v.tinh_trang == 4"
                        class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Đã hủy</div>
                      <div v-else-if="v.tinh_trang == 5"
                        class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Đang vận chuyển</div>
                    </td>
                    <td><strong>{{ formatToVND(v.cuoc_van_chuyen) }}</strong></td>
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
      list_chi_tiet_don_hang: [],
      id_don_hang_dang_xem: null,
    }
  },
  mounted() {
    this.loadDataDonHang();
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

    loadDataDonHang() {
      baseRequest
        .get('user/don-hang/dai-ly/lay-du-lieu')
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
        .post(`user/don-hang/dai-ly/chi-tiet`, { id_don_hang: id })
        .then((res) => {
          if (res.data.status) {
            this.list_chi_tiet_don_hang = res.data.data;
          } else {
            toaster.error("Không thể tải chi tiết đơn hàng.");
          }
        });
    },

    huyDonHang(v) {
      baseRequest
        .post('user/don-hang/dai-ly/huy-don-hang', v)
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
  },
}
</script>
<style></style>