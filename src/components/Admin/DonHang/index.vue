<template>
  <div class="page-content">
    <div class="card">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2 mt-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark">DANH SÁCH ĐƠN HÀNG</h4>
          </div>
          <div class="col-sm-6 text-end">
            <button v-on:click="CheckThanhToan()" class="btn btn-danger">
              <i class="bx bxs-circle align-middle me-1"></i>Check Thanh Toán
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-9">
            <div class="input-group mb-3 ">
              <input v-on:keyup.enter="searchDonHang()" v-model="key_search.abc" type="text"
                class="form-control search-control" placeholder="Nhập khách hàng cần tìm">
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
                <th>Mã Đơn Hàng</th>
                <th>Chủ Đơn Hàng</th>
                <th>Trạng Thái</th>
                <th>Chi Tiết</th>
                <th class="text-center">Actions</th>
                <th class="text-center">Truy Xuất</th>
                <th>Tổng Tiền</th>
                <th>Ngày Đặt</th>
                <th>Ngày Giao (dự kiến)</th>
                <th>Tình Trạng Thanh Toán</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in locDataTheoTenCongTy" :key="k">
                <tr>
                  <td>{{ k + 1 }}</td>
                  <td>{{ v.ma_don_hang }}</td>
                  <td>{{ v.ten_dai_ly }}</td>
                  <td>
                    <div v-if="v.tinh_trang == 0"
                      class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận</div>
                    <div v-else-if="v.tinh_trang == 1"
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đã xác nhận</div>
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
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đang vận chuyển</div>
                    <div v-else-if="v.tinh_trang == 6"
                      class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Giao hàng thành công</div>
                  </td>
                  <td>
                    <div class="d-flex order-actions">
                      <a title="Xem chi tiết đơn hàng" @click="xemChiTietDonHang(v.id)" class="ms-3 text-info"><i
                          type="button" data-bs-toggle="modal" data-bs-target="#chiTietDonHangModal"
                          class="fa-solid fa-circle-info"></i></a>
                    </div>
                  </td>
                  <td>
                    <div v-if="v.tinh_trang == 0" class="d-flex order-actions">
                      <a type="button" @click="moXacNhan(v)" title="Xác nhận đơn hàng" class="ms-3 text-success"
                        data-bs-toggle="modal" data-bs-target="#xacNhanModal"><i class="fa-solid fa-check"></i></a>
                      <a type="button" @click="moXacNhanHuy(v)" title="Hủy đơn hàng" class="ms-3" style="color: red;"
                        data-bs-toggle="modal" data-bs-target="#huyModal"><i class="bx bxs-trash"></i></a>
                    </div>
                    <div v-if="v.tinh_trang == 4" :disabled="v.tinh_trang == 4" class="d-flex order-actions">
                      <a type="button" title="Xác nhận đơn hàng" class="ms-3"><i class="fa-solid fa-check"
                          style="color: gray;"></i></a>
                      <a type="button" title="Hủy đơn hàng" class="ms-3" style="color: gray;"><i
                          class="bx bxs-trash"></i></a>
                    </div>
                    <div
                      v-if="v.tinh_trang == 2 || v.tinh_trang == 3 || v.tinh_trang == 1 || v.tinh_trang == 5 || v.tinh_trang == 6"
                      :disabled="v.tinh_trang == 2 || v.tinh_trang == 3 || v.tinh_trang == 1 || v.tinh_trang == 5 || v.tinh_trang == 6"
                      class="d-flex order-actions">
                      <a type="button" title="Xác nhận đơn hàng" class="ms-3"><i class="fa-solid fa-check"
                          style="color: gray;"></i></a>
                      <a type="button" title="Hủy đơn hàng" class="ms-3" style="color: gray;"><i
                          class="bx bxs-trash"></i></a>
                    </div>
                  </td>
                  <td>
                    <div v-if="v.tinh_trang == 6 || v.tinh_trang == 3" class="d-flex order-actions">
                      <a type="button" title="Smart contract vận chuyển" class="ms-3"><i
                          class="fa-solid fa-truck-fast text-warning" data-bs-toggle="modal"
                          data-bs-target="#xemLSVCBlockChain" @click="xemLichSuVanChuyenOnBlockChain(v.id)"></i></a>
                      <a type="button" title="Smart contract đơn hàng" class="ms-3"><i
                          class="fa-solid fa-layer-group text-primary" data-bs-toggle="modal"
                          data-bs-target="#xemInfoBlockChain" @click="xemDonHangOnBlockChain(v.id)"></i></a>
                    </div>
                    <div
                      v-else-if="v.tinh_trang == 2 || v.tinh_trang == 1 || v.tinh_trang == 4 || v.tinh_trang == 5 || v.tinh_trang == 0"
                      class="d-flex order-actions">
                      <a type="button" title="Smart contract vận chuyển" class="ms-3"
                        :class="{ 'disabled text-secondary': true }" @click.prevent>
                        <i class="fa-solid fa-truck-fast"></i>
                      </a>
                      <a type="button" title="Smart contract đơn hàng" class="ms-3"><i
                          class="fa-solid fa-layer-group text-primary" data-bs-toggle="modal"
                          data-bs-target="#xemInfoBlockChain" @click="xemDonHangOnBlockChain(v.id)"></i></a>
                    </div>
                  </td>
                  <td class="text-danger"><strong>{{ formatToVND(v.tong_tien) }}</strong></td>
                  <td class="text-center">{{ formatDate(v.ngay_dat) }}</td>
                  <td class="text-center">{{ formatDate(v.ngay_giao) }}</td>
                  <td class="text-center">
                    <div v-if="v.tinh_trang_thanh_toan == 0" class="badge rounded-pill text-primary bg-light-primary p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Chờ thanh toán
                      </div>
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
    <!-- modal xem chi tiết -->
    <div class="modal fade" id="chiTietDonHangModal" tabindex="-1" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h4>Chi tiết đơn hàng</h4>
            <i class="text-danger">*Cước vận chuyển được tính 1 lần cho mỗi đơn vị vận chuyển</i>
            <hr>
            <table class="table mb-0">
              <thead class="table-light">
                <tr>
                  <th>#</th>
                  <th>Sản Phẩm</th>
                  <th>Hình Ảnh</th>
                  <th>Đơn Giá</th>
                  <th>Số Lượng</th>
                  <th>Thành Tiền</th>
                  <th>Nhà Sản Xuất</th>
                  <th>Đơn Vị Vận Chuyển</th>
                  <th>Cước VC</th>
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
                    <td>{{ v.ten_nha_san_xuat }}</td>
                    <td>{{ v.ten_dvvc }}</td>
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
    <!-- modal hủy -->
    <div class="modal fade" id="huyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body d-flex">
            <div class="alert border-0 border-start border-5 border-danger alert-dismissible fade show py-2">
              <div class="d-flex align-items-center">
                <div class="font-35 text-danger"><i class="bx bxs-message-square-x"></i>
                </div>
                <div class="ms-3">
                  <h6 class="mb-0 text-danger">Thông Báo</h6>
                  <div>Bạn chắc chắn muốn hủy đơn hàng này?</div>
                </div>
              </div>
            </div>
          </div>
          <button @click="xacNhanHuy()" data-bs-dismiss="modal" class="btn btn-border bg-light-danger align-middle">
            <h5 class="text-danger mt-1">Xác Nhận</h5>
          </button>
        </div>
      </div>
    </div>
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
    <!-- modal xem đơn hàng blockchain -->
    <div class="modal fade" id="xemInfoBlockChain" tabindex="-1" aria-labelledby="xemInfoBlockChainLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content shadow rounded-4 overflow-hidden">
          <!-- Phần đầu modal: luôn hiển thị -->
          <div class="modal-header bg-info bg-opacity-10 border-0 py-3">
            <div>
              <h4 class="mb-1">📦 Truy xuất thông tin đơn hàng</h4>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
          </div>
          <!-- Phần nội dung cuộn -->
          <div class="modal-body" style="max-height: 500px; overflow-y: auto; background-color: #fdfdfd;">
            <!-- Loading spinner khi đang tải -->
            <div v-if="isLoading" class="text-center my-5">
              <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Đang tải...</span>
              </div>
              <div class="mt-2">Đang tải dữ liệu từ blockchain...</div>
            </div>
            <!-- Hiển thị nội dung khi đã có dữ liệu -->
            <div v-else>
              <template v-for="(v, k) in list_info_blockchain" :key="k">
                <div
                  style="border: 1px solid #e0e0e0; border-left: 4px solid #0dcaf0; border-radius: 8px; padding: 16px; margin-bottom: 16px; background-color: #ffffff;">
                  <h5 class="mb-2">🕘 Lịch sử thay đổi</h5>
                  <p class="mb-1"><strong>Hành động:</strong> {{ v.action }}</p>
                  <p class="mb-1"><strong>Người thực hiện:</strong> {{ v.nguoi_thuc_hien }}</p>
                  <p class="mb-1"><strong>Loại người dùng:</strong> {{ v.loai_tai_khoan }}</p>
                  <p class="mb-1 fst-italic">
                    Giao dịch blockchain:
                    <a :href="'https://shasta.tronscan.org/#/transaction/' + v.transaction_hash" target="_blank"
                      class="text-info text-decoration-underline ms-1">
                      Xem chi tiết <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </p>
                  <p class="mb-0 fst-italic">
                    Chi tiết hợp đồng:
                    <a :href="v.metadata_uri" target="_blank" class="text-info text-decoration-underline ms-1">
                      Xem thêm <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </p>
                </div>
              </template>
            </div>
          </div>
          <!-- Footer -->
          <div class="modal-footer border-0">
            <button class="btn btn-outline-info" data-bs-dismiss="modal">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal xem lịch sử vận chuyển blockchain -->
    <div class="modal fade" id="xemLSVCBlockChain" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-body d-flex">
            <div class="alert border-0 border-start border-5 border-warning alert-dismissible fade show py-2">
              <div class="d-flex align-items-center">
                <div class="font-35 text-warning">
                  <i class="fa-solid fa-circle-info"></i>
                </div>
                <div class="ms-3 w-100">
                  <!-- Loading spinner khi đang tải -->
                  <div v-if="isLoading" class="text-center my-5">
                    <div class="spinner-border text-info" role="status">
                      <span class="visually-hidden">Đang tải...</span>
                    </div>
                    <div class="mt-2">Đang tải dữ liệu từ blockchain...</div>
                  </div>
                  <!-- Nếu có dữ liệu -->
                  <div v-else-if="list_lsvc_blockchain.length > 0">
                    <h2 class="mb-0 mb-2">Truy xuất lịch sử vận chuyển đơn hàng</h2>
                    <h6 class="mb-0 mb-2 ms-3">
                      Mã đơn hàng: <i>{{ list_lsvc_blockchain[0].ma_don_hang }}</i>
                    </h6>
                    <template v-for="(v, k) in list_lsvc_blockchain" :key="k">
                      <p style="font-size: large;">
                      <div class="ms-3">
                        <b>Tuyến số #{{ v.tuyen_so }}</b>
                      </div>
                      <div class="ms-5">
                        <i>Thông tin giao dịch ở blockchain: </i>
                        <a :href="'https://shasta.tronscan.org/#/transaction/' + v.transaction_hash" target="_blank">
                          <i><u>Click <i style="font-style: italic;"
                                class="fa-solid fa-arrow-up-right-from-square"></i></u></i>
                        </a>
                      </div>
                      <div class="ms-5">
                        <i>Chi tiết lịch sử vận chuyển: </i>
                        <a :href="v.metadata_uri" target="_blank">
                          <i><u>Click <i style="font-style: italic;"
                                class="fa-solid fa-arrow-up-right-from-square"></i></u></i>
                        </a>
                      </div>
                      </p>
                    </template>
                  </div>
                  <!-- Nếu không có dữ liệu -->
                  <div v-else class="text-danger text-center mt-3">
                    <h5>Chưa có lịch sử vận chuyển</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button data-bs-dismiss="modal" class="btn btn-border bg-light-warning align-middle">
            <h5 class="mt-1">Đóng</h5>
          </button>
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
      key_search: {},
      id_can_huy: '',
      LocTheoTenCongTy: "",
      loai_tai_khoan: "",
      list_info_blockchain: [],
      list_lsvc_blockchain: [],
      isLoading: false,
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

    loadDataDonHang() {
      baseRequest
        .get('admin/don-hang/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_don_hang = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
    //hủy đơn hàng
    moXacNhanHuy(donHang) {
      this.donHangHuy = donHang;
    },

    xacNhanHuy() {
      if (this.donHangHuy) {
        this.huyDonHang(this.donHangHuy);
        this.donHangHuy = null;
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById('huyModal'));
      modal.hide();
    },

    huyDonHang(v) {
      let orderData = {
        loai_tai_khoan: localStorage.getItem('loai_tai_khoan'),
        nguoi_thuc_hien: localStorage.getItem('ho_ten'),
        dia_chi_vi: localStorage.getItem('dia_chi_vi'),
      }
      baseRequest
        .post('admin/don-hang/huy-don-hang',
          {
            v,
            orderData
          }
        )
        .then((res) => {
          if (res.data.success == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDonHang();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    xemChiTietDonHang(id) {
      this.id_don_hang_dang_xem = id;
      baseRequest
        .post(`admin/don-hang/chi-tiet`, { id_don_hang: id })
        .then((res) => {
          if (res.data.status) {
            this.list_chi_tiet_don_hang = res.data.data;
          } else {
            toaster.error("Không thể tải chi tiết đơn hàng.");
          }
        });
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
      let orderData = {
        loai_tai_khoan: localStorage.getItem('loai_tai_khoan'),
        nguoi_thuc_hien: localStorage.getItem('ho_ten'),
        dia_chi_vi: localStorage.getItem('dia_chi_vi'),
      }
      baseRequest
        .post('admin/don-hang/xac-nhan-don-hang',
          {
            v,
            orderData
          }
        )
        .then((res) => {
          if (res.data.success == true) {
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
        .post('admin/don-hang/tim-don-hang', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_don_hang = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    xemDonHangOnBlockChain(id) {
      this.id_don_hang_dang_xem = id;
      this.isLoading = true;
      baseRequest
        .post(`user/don-hang/dai-ly/lay-thong-tin-don-hang-blockchain`, { id_don_hang: id })
        .then((res) => {
          if (res.data.status) {
            this.list_info_blockchain = res.data.data;
          } else {
            toaster.error("Không thể tải dữ liệu blockchain.");
          }
        })
        .catch(() => {
          toaster.error("Đã xảy ra lỗi khi gọi dữ liệu blockchain.");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    xemLichSuVanChuyenOnBlockChain(id) {
      this.id_don_hang_dang_xem = id;
      this.isLoading = true;
      this.list_lsvc_blockchain = [];

      baseRequest
        .post(`user/don-hang/dai-ly/lay-lich-su-van-chuyen-blockchain`, { id_don_hang: id })
        .then((res) => {
          if (res.data.status) {
            this.list_lsvc_blockchain = res.data.data;
          } else {
            toaster.error("Không thể tải dữ liệu blockchain.");
          }
        })
        .catch(() => {
          toaster.error("Đã xảy ra lỗi khi gọi dữ liệu blockchain.");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CheckThanhToan() {
      baseRequest
        .get('check-giao-dich')
        .then((res) => {
          if (res.data.status) {
            this.loadDataDonHang();
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
  },
}
</script>
<style></style>