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
              <input v-on:keyup.enter="searchDVVC()" v-model="key_search.abc" type="text"
                class="form-control search-control" placeholder="Nhập tên chủ đơn hàng cần tìm">
              <button v-on:click="searchDVVC()" class="btn btn-primary ">
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
                <th>Lịch Trình</th>
                <th>Chi Tiết</th>
                <th>Người Đặt</th>
                <th>Địa Chỉ</th>
                <th>Tổng Tiền</th>
                <th>Cước Vận Chuyển</th>
                <th>Cần Thanh Toán</th>
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
                    <div v-if="v.tinh_trang_don_hang == 2" class="d-flex order-actions">
                      <a type="button" @click="moXacNhan(v)" class="ms-3 text-success" data-bs-toggle="modal"
                        data-bs-target="#xacNhanModal"><i class="fa-solid fa-check"></i></a>
                    </div>
                    <div
                      v-else-if="v.tinh_trang_don_hang == 5 || v.tinh_trang_don_hang == 3 || v.tinh_trang_don_hang == 4"
                      :disabled="v.tinh_trang_don_hang == 5 || v.tinh_trang_don_hang == 3 || v.tinh_trang_don_hang == 4"
                      class="d-flex order-actions">
                      <a type="button" class="ms-3"><i class="fa-solid fa-check" style="color: gray;"></i></a>
                    </div>
                  </td>
                  <td>
                    <div v-if="v.tinh_trang_don_hang == 2"
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Chờ vận chuyển</div>
                    <div v-else-if="v.tinh_trang_don_hang == 3"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                        class="bx bxs-circle me-1"></i>Hoàn thành</div>
                    <div v-else-if="v.tinh_trang_don_hang == 4"
                      class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đã hủy</div>
                    <div v-else-if="v.tinh_trang_don_hang == 5"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                        class="bx bxs-circle align-middle me-1"></i>Đang vận chuyển</div>
                  </td>
                  <td>
                    <div v-if="v.tinh_trang_don_hang == 5" class="d-flex order-actions">
                      <a title="Xem lịch trình vận chuyển đơn hàng" @click="handleClick(v)" class="ms-3 text-warning"><i
                          type="button" data-bs-toggle="modal" data-bs-target="#lichTrinhDonHangModal"
                          class="fa-solid fa-truck-fast"></i></a>
                    </div>
                    <div v-else class="d-flex order-actions">
                      <a title="Chưa có lịch trình vận chuyển đơn hàng" class="ms-3 text-secondary"><i type="button"
                          class="fa-solid fa-truck-fast"></i></a>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex order-actions">
                      <a title="Xem chi tiết đơn hàng" @click="xemChiTietDonHang(v.id_don_hang)"
                        class="ms-3 text-info"><i type="button" data-bs-toggle="modal"
                          data-bs-target="#chiTietDonHangModal" class="fa-solid fa-circle-info"></i></a>
                    </div>
                  </td>
                  <td>{{ v.ten_khach_hang }}</td>
                  <td>{{ v.dia_chi_dai_ly }}</td>
                  <td class="text-danger"><strong>{{ formatToVND(v.tong_tien_san_pham) }}</strong></td>
                  <td class="text-danger text-center"><strong>{{ formatToVND(v.tong_cuoc_van_chuyen) }}</strong></td>
                  <td class="text-danger"><strong>{{ formatToVND(v.tong_tien_don_hang) }}</strong></td>
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
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body d-flex">
            <div class="alert border-0 border-start border-5 border-success alert-dismissible fade show py-2">
              <div class="d-flex align-items-center">
                <div class="ms-3">

                  <h2 class="mb-0 text-success">Thông Báo</h2>
                  <div>
                    <h4 class="text-lg font-semibold mb-2">Tuyến đường vận chuyển tối ưu nhất:</h4>
                    <div class="flex flex-wrap items-center ms-4">
                      <template v-for="(dia_diem, index) in tuyen_duong_de_xuat" :key="index">
                        <span :class="getClass(dia_diem)" class="flex items-center space-x-1"
                          style="font-size: large; font-style: italic;">
                          <span>{{ getIcon(dia_diem) }}</span>
                          <span>{{ cleanText(dia_diem) }}</span>
                        </span>
                        <span v-if="index < tuyen_duong_de_xuat.length - 1" class="mx-2 text-gray-500"
                          style="font-size: large;"><i class="fa-solid fa-arrow-right"></i></span>
                      </template>
                    </div>
                    <h5>Tổng chiều dài tuyến đường: {{ chieu_dai_tuyen_duong }}</h5>
                  </div>
                  <div style="font-size: large;">Bạn chắc chắn muốn xác nhận đơn hàng này?</div>
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
                  <th>Nhà Sản Xuất</th>
                  <th>Địa Chỉ</th>
                  <th>Tình Trạng</th>
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
                    <td>{{ v.dia_chi_nsx }}</td>
                    <td>
                      <div v-if="v.tinh_trang == 0"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận</div>
                      <div v-else-if="v.tinh_trang == 1"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận</div>
                      <div v-else-if="v.tinh_trang == 2"
                        class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Chờ vận chuyển</div>
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
    <!-- modal lịch trình -->
    <div class="modal fade" id="lichTrinhDonHangModal" tabindex="-1" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h4>Lịch trình vận chuyển của đơn hàng <b>{{ this.id_don_hang_dang_xem }}:</b></h4>
            <template v-for="(dia_diem, index) in tuyen_duong_de_xuat" :key="index">
              <span :class="getClass(dia_diem)" class="flex items-center space-x-1"
                style="font-size: medium; font-style: italic;">
                <span>{{ getIcon(dia_diem) }}</span>
                <span>{{ cleanText(dia_diem) }}</span>
              </span>
              <span v-if="index < tuyen_duong_de_xuat.length - 1" class="mx-2 text-gray-500"
                style="font-size: medium;"><i class="fa-solid fa-arrow-right"></i></span>
            </template>
            <p>Chiều dài tuyến đường: <b>{{ chieu_dai_tuyen_duong }}</b></p>
            <hr>
            <table class="table mb-0">
              <thead class="table-light">
                <tr>
                  <th>#</th>
                  <th>Vị Trí Hiện Tại</th>
                  <th>Vị Trí Cần Đến</th>
                  <th>Thời Gian Đến</th>
                  <th>Thời Gian Đi</th>
                  <th>Mô Tả</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="list_lich_trinh_don_hang.length">
                <template v-for="(v, k) in visibleSteps" :key="k">
                  <tr>
                    <td>{{ v.thu_tu }}</td>
                    <td>{{ v.vi_tri_hien_tai }}</td>
                    <td>{{ v.vi_tri_tiep_theo }}</td>
                    <td>{{ formatTime(v.thoi_gian_den) }}</td>
                    <td>{{ formatTime(v.thoi_gian_di) }}</td>
                    <td>{{ v.mo_ta_trang_thai }}</td>
                    <td>
                      <div class="d-flex order-actions">
                        <!-- Nếu tình trạng là 0 và chưa có thời gian đi, hiển thị nút xác nhận đã đến -->
                        <div v-if="v.tinh_trang == 0 && !v.thoi_gian_di" class="d-flex order-actions">
                          <a @click="xacNhanDen(v.id)" type="button" title="Xác nhận đã đến" class="ms-3 text-success">
                            <i class="fa-solid fa-check"></i>
                          </a>
                        </div>

                        <!-- Nếu đã có thời gian đến nhưng chưa đi, hiển thị nút xác nhận đã đi -->
                        <div v-else-if="v.thoi_gian_den && !v.thoi_gian_di" class="d-flex order-actions">
                          <a @click="xacNhanDi(v.id)" type="button" title="Xác nhận đã đi" class="ms-3 text-success">
                            <i class="fa-solid fa-arrow-right"></i>
                          </a>
                        </div>

                        <!-- Nếu đã hoàn thành (tình trạng != 0), hiển thị nút "Đã đi đến kho tiếp theo" -->
                        <div v-else class="d-flex order-actions">
                          <a type="button" title="Đã đi đến kho tiếp theo" class="ms-3 text-secondary">
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                          </a>
                        </div>
                      </div>
                    </td>
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
import dayjs from 'dayjs'
const toaster = createToaster({ position: "top-right" });
export default {
  data() {
    return {
      list_don_hang: [],
      list_dai_ly: [],
      list_chi_tiet_don_hang: [],
      id_don_hang_dang_xem: null,
      key_search: {},
      LocTheoTenCongTy: "",
      tuyen_duong_de_xuat: null,
      chieu_dai_tuyen_duong: null,
      list_lich_trinh_don_hang: [],
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
    visibleSteps() {
      const steps = this.list_lich_trinh_don_hang;
      const visible = [];
      let daRoiGanNhat = -1;
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const vi_tri = step.ten_kho || step.dia_chi_nsx || 'Nơi gửi';
        const vi_tri_tiep_theo = steps[i + 1]?.ten_kho || steps[i + 1]?.dia_chi_dai_ly || 'Điểm đến cuối';
        // Mô tả trạng thái động
        let mo_ta_trang_thai = '';
        if (step.thoi_gian_di) {
          mo_ta_trang_thai = `Rời ${vi_tri} để đến ${vi_tri_tiep_theo}`;
        } else if (step.thoi_gian_den) {
          mo_ta_trang_thai = `Đã đến ${vi_tri}`;
        } else if (i === 0) {
          mo_ta_trang_thai = `Đang chuẩn bị rời ${vi_tri}`;
        } else {
          mo_ta_trang_thai = `Đang di chuyển đến ${vi_tri}`;
        }
        // Điều kiện hiển thị
        if (i === 0) {
          // Luôn hiển thị chặng đầu tiên bất kể trạng thái
          visible.push({ ...step, vi_tri_hien_tai: vi_tri, vi_tri_tiep_theo, mo_ta_trang_thai });
          if (step.tinh_trang === 2) daRoiGanNhat = i; // Đã rời thì cập nhật daRoiGanNhat
          continue;
        }
        if (step.tinh_trang === 2) {
          // Chặng đã rời đi → hiển thị
          visible.push({ ...step, vi_tri_hien_tai: vi_tri, vi_tri_tiep_theo, mo_ta_trang_thai });
          daRoiGanNhat = i; // Cập nhật daRoiGanNhat
          continue;
        }
        if (i === daRoiGanNhat + 1) {
          // Chặng tiếp theo sau khi đã rời gần nhất → hiển thị rồi dừng
          visible.push({ ...step, vi_tri_hien_tai: vi_tri, vi_tri_tiep_theo, mo_ta_trang_thai });
          break;
        }
        // Các chặng sau nữa → không hiển thị
        break;
      }
      // Thêm điểm cuối vào nếu đã đi qua tất cả các chặng
      const lastStep = steps[steps.length - 1];
      const vi_tri_cuoi = lastStep.ten_kho || lastStep.dia_chi_dai_ly || 'Điểm đến cuối';
      if (daRoiGanNhat === steps.length - 1) { // Nếu đã đi qua tất cả các chặng
        const mo_ta_trang_thai_cuoi = lastStep.thoi_gian_den ? `Đã đến ${vi_tri_cuoi}` : `Đang di chuyển đến ${vi_tri_cuoi}`;
        visible.push({
          ...lastStep,
          vi_tri_hien_tai: vi_tri_cuoi,
          vi_tri_tiep_theo: 'Kết thúc',
          mo_ta_trang_thai: mo_ta_trang_thai_cuoi
        });
      }
      return visible;
    }

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

    formatTime(datetime) {
      return dayjs(datetime).format('DD/MM/YYYY [lúc] HH:mm');
    },

    loadDataDonHang() {
      baseRequest
        .get('user/don-hang/don-vi-van-chuyen/lay-du-lieu-cho-dvvc')
        .then((res) => {
          if (res.data.status) {
            this.list_don_hang = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
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
    //xác nhận đơn hàng
    async moXacNhan(donHang) {
      this.donHangXacNhan = donHang;
      try {
        const res = await baseRequest.post('user/don-hang/don-vi-van-chuyen/goi-y-duong-di', {
          id_nha_san_xuat: donHang.id_nsx,
          id_dai_ly: donHang.user_id,
        });
        this.tuyen_duong_de_xuat = res.data.tuyen_duong_ten;
        this.chieu_dai_tuyen_duong = res.data.tong_khoang_cach;
      } catch (error) {
        console.error('Lỗi khi tìm đường:', error);
        this.$toast?.error?.("Không thể tạo tuyến đường, vui lòng thử lại.");
      }
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
        .post('user/don-hang/don-vi-van-chuyen/xac-nhan-don-hang', v)
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

    xemChiTietDonHang(id) {
      this.id_don_hang_dang_xem = id;
      baseRequest
        .post(`user/don-hang/don-vi-van-chuyen/chi-tiet`, { id_don_hang: id })
        .then((res) => {
          if (res.data.status) {
            this.list_chi_tiet_don_hang = res.data.data;
          } else {
            toaster.error("Không thể tải chi tiết đơn hàng.");
          }
        });
    },

    searchDVVC() {
      baseRequest
        .post('user/don-hang/don-vi-van-chuyen/tim-kiem-dvvc', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_don_hang = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    getIcon(text) {
      if (text.startsWith("Nhà sản xuất")) return "🏭";
      if (text.startsWith("Kho")) return "📦";
      if (text.startsWith("Đại lý")) return "🏪";
      return "📍";
    },

    cleanText(text) {
      // Loại bỏ phần "Nhà sản xuất: " hay "Kho: " nếu muốn ngắn gọn
      return text.replace(/^Nhà sản xuất: |^Kho: |^Đại lý: /, "");
    },

    getClass(text) {
      if (text.startsWith("Nhà sản xuất")) return "text-red-600 font-medium";
      if (text.startsWith("Kho")) return "text-blue-600";
      if (text.startsWith("Đại lý")) return "text-green-600 font-medium";
      return "text-gray-700";
    },

    xemLichTrinhDonHang(id) {
      this.id_don_hang_dang_xem = id;
      return baseRequest
        .post(`user/don-hang/don-vi-van-chuyen/lay-lich-trinh-don-hang`, { id_don_hang: id })
        .then((res) => {
          if (res.data.status) {
            this.list_lich_trinh_don_hang = res.data.data;
          } else {
            toaster.error("Không thể tải lịch trình đơn hàng.");
          }
        });
    },

    async xemTuyenDuongGoiY(donHang) {
      try {
        const res = await baseRequest.post('user/don-hang/don-vi-van-chuyen/goi-y-duong-di', {
          id_nha_san_xuat: donHang.id_nsx,
          id_dai_ly: donHang.user_id,
        });
        this.tuyen_duong_de_xuat = res.data.tuyen_duong_ten;
        this.chieu_dai_tuyen_duong = res.data.tong_khoang_cach;
      } catch (error) {
        console.error('Lỗi khi tìm đường:', error);
        this.$toast?.error?.("Không thể tạo tuyến đường, vui lòng thử lại.");
      }
    },

    handleClick(v) {
      this.xemLichTrinhDonHang(v.id_don_hang);
      this.xemTuyenDuongGoiY(v);
    },

    xacNhanDen(id) {
      if (!confirm("Bạn chắc chắn muốn xác nhận ĐÃ ĐẾN chặng này?")) return;
      baseRequest
        .post('user/don-hang/don-vi-van-chuyen/xac-nhan-da-den', { id: id })
        .then(res => {
          if (res.data.status) {
            toaster.success("Đã xác nhận đã đến.");
            this.xemLichTrinhDonHang(this.id_don_hang_dang_xem); // ✅ truyền id vào
          } else {
            toaster.error("Không thể xác nhận đã đến.");
          }
        })
        .catch(() => toaster.error("Lỗi kết nối khi xác nhận đã đến."));
    },

    xacNhanDi(id) {
      if (!confirm("Bạn chắc chắn muốn xác nhận ĐÃ ĐI chặng này?")) return;
      baseRequest
        .post('user/don-hang/don-vi-van-chuyen/xac-nhan-da-di', { id: id })
        .then(res => {
          if (res.data.status) {
            toaster.success("Đã xác nhận đã đi.");
            this.xemLichTrinhDonHang(this.id_don_hang_dang_xem); // ✅ truyền id vào
          } else {
            toaster.error("Không thể xác nhận đã đi.");
          }
        })
        .catch(() => toaster.error("Lỗi kết nối khi xác nhận đã đi."));
    },
  },
}
</script>
<style></style>