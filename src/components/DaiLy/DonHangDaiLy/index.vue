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
        <div class="table-responsive">
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
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đang vận chuyển</div>
                    <div v-else-if="v.tinh_trang == 2"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                        class="bx bxs-circle me-1"></i>Hoàn thành</div>
                    <div v-else-if="v.tinh_trang == 3"
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
                      <a href="javascript:;" class="ms-3 text-info"><i type="button"
                          class="fa-solid fa-circle-info"></i></a>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex order-actions">
                      <a href="javascript:;" class="ms-3" style="color: red;"><i class="bx bxs-trash"></i></a>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
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
    }
  },
  mounted() {
    this.loadDataDonHang();
  },
  methods: {
    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 1000);
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
        .get('user/don-hang/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_don_hang = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
  },
}
</script>
<style></style>