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
                      <a title="Xác nhận vận chuyển" type="button" @click="xemChiTietVaXacNhanDonHang(v)"
                        class="ms-3 text-success" data-bs-toggle="modal" data-bs-target="#xacNhanModal">
                        <i class="fa-solid fa-check"></i>
                      </a>
                    </div>
                    <div
                      v-else-if="v.tinh_trang_don_hang == 5 || v.tinh_trang_don_hang == 3 || v.tinh_trang_don_hang == 4 || v.tinh_trang_don_hang == 6"
                      :disabled="v.tinh_trang_don_hang == 5 || v.tinh_trang_don_hang == 3 || v.tinh_trang_don_hang == 4 || v.tinh_trang_don_hang == 6"
                      class="d-flex order-actions">
                      <a type="button" class="ms-3">
                        <i class="fa-solid fa-check" style="color: gray;"></i>
                      </a>
                    </div>
                  </td>
                  <td>
                    <div v-if="v.tinh_trang_don_hang == 2"
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Chờ vận chuyển
                    </div>
                    <div v-else-if="v.tinh_trang_don_hang == 3"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                      <i class="bx bxs-circle me-1"></i>Hoàn thành
                    </div>
                    <div v-else-if="v.tinh_trang_don_hang == 4"
                      class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Đã hủy
                    </div>
                    <div v-else-if="v.tinh_trang_don_hang == 5"
                      class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Đang vận chuyển
                    </div>
                    <div v-else-if="v.tinh_trang_don_hang == 6"
                      class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Giao hàng thành công
                    </div>
                  </td>
                  <td>
                    <div v-if="v.tinh_trang_don_hang == 5 || v.tinh_trang_don_hang == 3 || v.tinh_trang_don_hang == 6"
                      class="d-flex order-actions">
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
                  <td class="text-danger"><strong>{{ formatToVND(v.tong_tien_san_pham) }}</strong>
                  </td>
                  <td class="text-danger text-center"><strong>{{ formatToVND(v.tong_cuoc_van_chuyen)
                      }}</strong></td>
                  <td class="text-danger"><strong>{{ formatToVND(v.tong_tien_don_hang) }}</strong>
                  </td>
                  <td>{{ formatDate(v.ngay_dat) }}</td>
                  <td>
                    <div v-if="v.tinh_trang_thanh_toan == 0"
                      class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Chờ thanh toán
                    </div>
                    <div v-else-if="v.tinh_trang_thanh_toan == 1"
                      class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                      <i class="bx bxs-circle me-1"></i>Đã thanh toán
                    </div>
                    <div v-else-if="v.tinh_trang_thanh_toan == 3"
                      class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Đã hủy
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
    <!-- modal xác nhận -->
    <div class="modal fade" id="xacNhanModal" tabindex="-1" aria-labelledby="xacNhanModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content shadow rounded-4 overflow-hidden">
          <!-- Body: có scroll nếu dài -->
          <div class="modal-body" style="max-height: 500px; overflow-y: auto;">
            <!-- Loading -->
            <div v-if="isLoading" class="d-flex justify-content-center flex-column align-items-center py-4">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Đang tải tuyến đường...</p>
            </div>
            <!-- Khi đã tải xong -->
            <div v-else>
              <div class="alert border-0 border-start border-5 border-success bg-light p-4 mb-4">
                <h5 class="text-success mb-3">🚚 Các tuyến đường vận chuyển tối ưu:</h5>
                <!-- Danh sách tuyến -->
                <template v-for="(tuyen, indexTuyen) in tuyen_duong_de_xuat" :key="indexTuyen">
                  <div class="ps-3 mb-4">
                    <h6 class="fw-bold mb-2">Tuyến từ nhà sản xuất {{ tuyen.nha_san_xuat_name }}:</h6>
                    <div class="d-flex flex-wrap align-items-center mb-2">
                      <template v-for="(dia_diem, index) in tuyen.path_names" :key="index">
                        <span :class="getClass(dia_diem)" class="d-flex align-items-center me-2">
                          <span class="me-1">{{ getIcon(dia_diem) }}</span>
                          <span class="fst-italic">{{ cleanText(dia_diem) }}</span>
                        </span>
                        <span v-if="index < tuyen.path_names.length - 1" class="text-muted mx-1">
                          <i class="fa-solid fa-arrow-right"></i>
                        </span>
                      </template>
                    </div>
                    <div class="text-muted mb-2">Chiều dài tuyến: {{ tuyen.distance }}</div>
                    <hr class="my-2">
                  </div>
                </template>
                <div class="fw-semibold text-dark fs-5 mt-3">
                  ❓ Bạn có chắc chắn muốn xác nhận đơn hàng này?
                </div>
              </div>
            </div>
          </div>
          <!-- Footer -->
          <div class="modal-footer border-0">
            <button v-if="!isLoading" @click="xacNhan()" data-bs-dismiss="modal" class="btn btn-outline-success">
              Xác Nhận
            </button>
            <button v-if="!isLoading" type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal chi tiết -->
    <div class="modal fade" id="chiTietDonHangModal" tabindex="-1" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h4>Chi tiết đơn hàng</h4>
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
                    <td>
                      <strong class="text-danger">{{ formatToVND(v.don_gia * v.so_luong) }}</strong>
                    </td>
                    <td>{{ v.ten_nha_san_xuat }}</td>
                    <td>{{ v.dia_chi_nsx }}</td>
                    <td>
                      <div v-if="v.tinh_trang == 0"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3">
                        <i class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận
                      </div>
                      <div v-else-if="v.tinh_trang == 1"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3">
                        <i class="bx bxs-circle align-middle me-1"></i>Chờ xác nhận
                      </div>
                      <div v-else-if="v.tinh_trang == 2"
                        class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3">
                        <i class="bx bxs-circle align-middle me-1"></i>Chờ vận chuyển
                      </div>
                      <div v-else-if="v.tinh_trang == 3"
                        class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                        <i class="bx bxs-circle me-1"></i>Hoàn thành
                      </div>
                      <div v-else-if="v.tinh_trang == 4"
                        class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3">
                        <i class="bx bxs-circle align-middle me-1"></i>Đã hủy
                      </div>
                      <div v-else-if="v.tinh_trang == 5"
                        class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3">
                        <i class="bx bxs-circle align-middle me-1"></i>Đang vận chuyển
                      </div>
                      <div v-else-if="v.tinh_trang == 6"
                        class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3">
                        <i class="bx bxs-circle align-middle me-1"></i>Giao hàng thành công
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
    <!-- modal lịch trình -->
    <div class="modal fade" id="lichTrinhDonHangModal" tabindex="-1" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div v-if="isLoading" class="d-flex justify-content-center flex-column align-items-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Đang tải...</p>
            </div>
            <div v-else>
              <h4>Lịch trình vận chuyển:</h4>
              <!-- Tabs -->
              <ul class="nav nav-tabs mb-3" id="tuyenTabs" role="tablist">
                <li v-for="(tuyen, indexTuyen) in tuyen_duong_de_xuat" :key="indexTuyen" class="nav-item"
                  role="presentation" v-on:click="tuyen_hien_tai = tuyen.tuyen_so">
                  <button class="nav-link" :class="{ active: indexTuyen === 0 }" :id="'tab-' + indexTuyen"
                    data-bs-toggle="tab" :data-bs-target="'#content-' + indexTuyen" type="button" role="tab">
                    Tuyến số {{ tuyen.tuyen_so }} - NSX {{ tuyen.nha_san_xuat_name }}
                  </button>
                </li>
              </ul>
              <!-- Tab Contents -->
              <div class="tab-content" id="tuyenTabsContent">
                <div v-for="(tuyen, indexTuyen) in tuyen_duong_de_xuat" :key="'content-' + indexTuyen"
                  class="tab-pane fade" :class="{ show: indexTuyen === 0, active: indexTuyen === 0 }"
                  :id="'content-' + indexTuyen" role="tabpanel" :aria-labelledby="'tab-' + indexTuyen">
                  <!-- Nội dung tuyến -->
                  <h5 class="mb-1">Tuyến từ nhà sản xuất {{ tuyen.nha_san_xuat_name }}:</h5>
                  <div class="flex flex-wrap items-center mb-3">
                    <template v-for="(dia_diem, index) in tuyen.path_names" :key="index">
                      <span :class="getClass(dia_diem)" class="flex items-center space-x-1"
                        style="font-size: large; font-style: italic;">
                        <span>{{ getIcon(dia_diem) }}</span>
                        <span>{{ cleanText(dia_diem) }}</span>
                      </span>
                      <span v-if="index < tuyen.path_names.length - 1" class="mx-2 text-gray-500"
                        style="font-size: large;">
                        <i class="fa-solid fa-arrow-right"></i>
                      </span>
                    </template>
                  </div>
                  <h6 class="mb-3">Chiều dài tuyến: {{ tuyen.distance }}</h6>
                  <!-- Table Scroll -->
                  <div style="max-height: 260px; overflow-y: auto;">
                    <table class="table mb-0" style="margin-bottom: 0;">
                      <thead class="table-light sticky-top bg-white" style="top: 0; z-index: 1;">
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
                      <tbody v-if="tuyen_hien_tai">
                        <template v-for="(v, k) in visibleSteps" :key="k">
                          <tr>
                            <td>{{ k + 1 }}</td>
                            <td>{{ v.vi_tri_hien_tai }}</td>
                            <td>{{ v.vi_tri_tiep_theo }}</td>
                            <td>{{ formatTime(v.thoi_gian_den) }}</td>
                            <td>{{ formatTime(v.thoi_gian_di) }}</td>
                            <td>{{ v.mo_ta_trang_thai }}</td>
                            <td>
                              <div class="d-flex order-actions">
                                <!-- Nếu là chặng cuối -->
                                <template v-if="isLastStep(v)">
                                  <div v-if="v.tinh_trang == 0" class="d-flex order-actions">
                                    <a @click="xacNhanDen(v.id)" type="button" title="Xác nhận đã đến"
                                      class="ms-3 text-success">
                                      <i class="fa-solid fa-check"></i>
                                    </a>
                                  </div>
                                  <div v-else-if="v.tinh_trang == 1" class="d-flex order-actions">
                                    <a type="button" title="Đã đến điểm giao hàng. Chờ đại lý xác nhận"
                                      class="ms-3 text-warning">
                                      <i class="fa-solid fa-clock"></i>
                                    </a>
                                  </div>
                                  <div v-else-if="v.tinh_trang == 2" class="d-flex order-actions">
                                    <a type="button" title="Hoàn thành giao hàng" class="ms-3 text-primary">
                                      <i class="fa-solid fa-flag-checkered"></i>
                                    </a>
                                  </div>
                                </template>
                                <!-- Nếu không phải chặng cuối -->
                                <template v-else>
                                  <div v-if="v.tinh_trang == 0" class="d-flex order-actions">
                                    <a @click="xacNhanDen(v.id)" type="button" title="Xác nhận đã đến"
                                      class="ms-3 text-success">
                                      <i class="fa-solid fa-check"></i>
                                    </a>
                                  </div>
                                  <div v-else-if="v.tinh_trang == 1" class="d-flex order-actions">
                                    <a @click="xacNhanDi(v.id)" type="button" title="Xác nhận đã đi"
                                      class="ms-3 text-success">
                                      <i class="fa-solid fa-arrow-right"></i>
                                    </a>
                                  </div>
                                  <div v-else-if="v.tinh_trang == 2" class="d-flex order-actions">
                                    <a type="button" title="Đã đi đến kho tiếp theo" class="ms-3 text-secondary">
                                      <i class="fa-solid fa-arrow-right-to-bracket"></i>
                                    </a>
                                  </div>
                                </template>
                              </div>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                  <!-- Ghim phần này bên dưới table -->
                  <hr>
                  <div class="mt-4 text-center">
                    <template v-if="isLastStep(visibleSteps[visibleSteps.length - 1]) &&
                      [1, 2].includes(visibleSteps[visibleSteps.length - 1].tinh_trang) &&
                      !visibleSteps[0].transaction_hash">
                      <button type="button" class="btn btn-warning" @click="addToBlockChain(visibleSteps)"
                        :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                        <span v-if="!isLoading">Add to Blockchain</span>
                        <span v-else class="ms-2">Đang xử lý...</span>
                      </button>
                    </template>
                    <template v-if="visibleSteps[0].transaction_hash">
                      <h6>
                        <a :href="'https://shasta.tronscan.org/#/transaction/' + visibleSteps[0].transaction_hash"
                          target="_blank">
                          <i><u>Click để xem thông tin giao dịch ở blockchain</u></i>
                        </a>
                      </h6>
                      <h6>
                        <a :href="visibleSteps[0].metadata_uri" target="_blank">
                          <i><u>Click để xem chi tiết hợp đồng</u></i>
                        </a>
                      </h6>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!isLoading" class="modal-footer">
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
      tuyen_duong_de_xuat: [],
      chieu_dai_tuyen_duong: null,
      list_lich_trinh_don_hang: [],
      isLoading: false,
      tuyen_hien_tai: 1,
      transaction_hash: null,
      metadata_uri: null,
      showHash: false,
    }
  },
  mounted() {
    this.loadDataDonHang();
    this.loadDataDaiLy();
    this.tuyen_hien_tai;
    // this.xemLichTrinhDonHang(1);
  },
  computed: {
    locDataTheoTenCongTy() {
      if (this.LocTheoTenCongTy === "") {
        return this.list_don_hang; // Hiển thị tất cả nếu chưa chọn gì
      }
      return this.list_don_hang.filter(item => String(item.user_id) === String(this.LocTheoTenCongTy));
    },
    visibleSteps() {
      const allSteps = this.list_lich_trinh_don_hang || [];
      const steps = allSteps.filter(step => step.tuyen_so === this.tuyen_hien_tai);
      const visible = [];

      if (steps.length === 0) return visible;

      // Luôn hiển thị chặng đầu tiên
      const firstStep = steps[0];
      const nextStep = steps[1];
      const vi_tri_first = firstStep.ten_kho || firstStep.dia_chi_nsx || firstStep.dia_chi_dai_ly || 'Vị trí không xác định';
      const vi_tri_tiep_theo_first = nextStep?.ten_kho || nextStep?.dia_chi_kho || nextStep?.dia_chi_dai_ly || 'Điểm đến tiếp theo';

      let mo_ta_trang_thai = '';
      if (firstStep.tinh_trang === 2) {
        mo_ta_trang_thai = `Rời ${vi_tri_first} để đến ${vi_tri_tiep_theo_first}`;
      } else if (firstStep.tinh_trang === 1) {
        mo_ta_trang_thai = `Đã đến ${vi_tri_first}`;
      } else {
        mo_ta_trang_thai = `Đang chuẩn bị rời ${vi_tri_first}`;
      }

      visible.push({
        ...firstStep,
        vi_tri_hien_tai: vi_tri_first,
        vi_tri_tiep_theo: vi_tri_tiep_theo_first,
        mo_ta_trang_thai
      });

      // Hiển thị các chặng tiếp theo nếu chặng trước đã đi
      for (let i = 1; i < steps.length; i++) {
        const prevStep = steps[i - 1];
        const step = steps[i];
        const isLast = i === steps.length - 1;
        const nextStep = steps[i + 1];

        if (prevStep.tinh_trang !== 2) break;

        const vi_tri = step.ten_kho || step.dia_chi_dai_ly || step.dia_chi_nsx || 'Vị trí không xác định';
        const vi_tri_tiep_theo = isLast
          ? 'Kết thúc'
          : nextStep?.ten_kho || nextStep?.dia_chi_kho || nextStep?.dia_chi_dai_ly || 'Điểm đến tiếp theo';

        if (isLast && step.dia_chi_dai_ly && !step.ten_kho) {
          if (step.tinh_trang === 1) {
            mo_ta_trang_thai = `Đã đến ${vi_tri}. Và đợi chủ đơn hàng xác nhận đã nhận được hàng.`;
          } else if (step.tinh_trang === 2) {
            mo_ta_trang_thai = `Chủ đơn hàng đã nhận được hàng.`;
          } else {
            mo_ta_trang_thai = `Đang di chuyển đến ${vi_tri}`;
          }
        } else {
          if (step.tinh_trang === 2) {
            mo_ta_trang_thai = `Rời ${vi_tri} để đến ${vi_tri_tiep_theo}`;
          } else if (step.tinh_trang === 1) {
            mo_ta_trang_thai = `Đã đến ${vi_tri}`;
          } else {
            mo_ta_trang_thai = `Đang di chuyển đến ${vi_tri}`;
          }
        }

        visible.push({
          ...step,
          vi_tri_hien_tai: vi_tri,
          vi_tri_tiep_theo,
          mo_ta_trang_thai
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
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    formatTime(datetime) {
      return dayjs(datetime).format('DD/MM/YYYY [lúc] HH:mm');
    },

    isLastStep(step) {
      if (!step.id_kho_hang && !step.thoi_gian_den && !step.thoi_gian_di) {
        return true;
      }
      const stepsCurrentTuyen = (this.list_lich_trinh_don_hang || []).filter(s => s.tuyen_so === this.tuyen_hien_tai);
      return stepsCurrentTuyen[stepsCurrentTuyen.length - 1]?.id === step.id;
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
    async xemChiTietVaXacNhanDonHang(id) {
      try {
        this.isLoading = true;
        // 1. Lấy chi tiết đơn hàng
        await this.xemChiTietDonHang(id);
        if (!this.list_chi_tiet_don_hang || !Array.isArray(this.list_chi_tiet_don_hang) || this.list_chi_tiet_don_hang.length === 0) {
          throw new Error("Không có dữ liệu chi tiết đơn hàng.");
        }
        // 2. Lấy danh sách nhà sản xuất từ chi tiết đơn hàng
        const danh_sach_nha_san_xuat = [
          ...new Set(this.list_chi_tiet_don_hang.map(sp => sp.id_nsx))
        ];
        const id_dai_ly = this.list_chi_tiet_don_hang[0]?.user_id;
        // 3. Gọi API lấy tuyến đường gợi ý cho nhiều nhà sản xuất
        const res = await baseRequest
          .post('user/don-hang/don-vi-van-chuyen/goi-y-duong-di', {
            id_dai_ly,
            danh_sach_nha_san_xuat
          });

        // 4. Gán dữ liệu tuyến đường vào biến
        this.tuyen_duong_de_xuat = res.data.data.map(tuyen => {
          const distance = tuyen.distance;
          const nha_san_xuat_name = tuyen.nha_san_xuat_name;
          const tuyen_so = tuyen.tuyen_so;
          const pathFormatted = tuyen.path_names.map(name => {
            if (name.includes("Nhà sản xuất")) return name;
            if (name.includes("Kho")) return name;
            if (name.includes("Đại lý")) return name;

            // Nếu không có prefix thì thêm thủ công
            if (name.toLowerCase().includes("nsx") || name.toLowerCase().includes("nhà sản xuất")) {
              return "Nhà sản xuất: " + name;
            }
            if (name.toLowerCase().includes("kho")) {
              return "Kho: " + name;
            }
            if (name.toLowerCase().includes("đại lý")) {
              return "Đại lý: " + name;
            }
            return name; // fallback
          });

          return {
            nha_san_xuat_id: tuyen.nha_san_xuat_id,
            path_names: pathFormatted,
            distance: distance + ' km',
            nha_san_xuat_name: nha_san_xuat_name,
            tuyen_so: tuyen_so,
          };
        });
        this.chieu_dai_tuyen_duong = res.data.total_distance;
        this.moXacNhan({ id_don_hang: id, id_dai_ly });
        this.isLoading = false;
      } catch (error) {
        console.error("Lỗi khi thực hiện xem chi tiết và xác nhận đơn hàng:", error);
        this.$toast?.error?.("Không thể tạo tuyến đường, vui lòng thử lại.");
      }
    },

    async moXacNhan(donHang) {
      this.donHangXacNhan = donHang;
      try {
        console.log('Đã set donHangXacNhan:', this.donHangXacNhan);
      } catch (error) {
        console.error("Lỗi khi xử lý:", error);
        this.$toast?.error?.("Không thể xử lý dữ liệu đơn hàng.");
      }
    },

    xemChiTietDonHang(id) {
      this.id_don_hang_dang_xem = id;
      return baseRequest
        .post(`user/don-hang/don-vi-van-chuyen/chi-tiet`, { id_don_hang: id })
        .then((res) => {
          if (res.data.status) {
            this.list_chi_tiet_don_hang = res.data.data;
          } else {
            toaster.error("Không thể tải chi tiết đơn hàng.");
          }
        });
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

    xacNhan() {
      console.log(this.donHangXacNhan)
      if (this.donHangXacNhan) {
        this.xacNhanDonHang(this.donHangXacNhan);
        this.donHangXacNhan = null;
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById('xacNhanModal'));
      modal.hide();
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
      if (typeof text !== 'string') return "📍";

      if (text.startsWith("Nhà sản xuất")) return "🏭";
      if (text.startsWith("Kho")) return "📦";
      if (text.startsWith("Đại lý")) return "🏪";
      return "📍"; // Trường hợp mặc định
    },

    cleanText(text) {
      if (typeof text !== 'string') return '';
      return text.replace(/^Nhà sản xuất: |^Kho: |^Đại lý: /, "");
    },

    getClass(text) {
      if (typeof text !== 'string') return "text-gray-700";
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

    async xemTuyenDuongGoiY(id) {
      try {
        this.isLoading = true;
        // 1. Lấy chi tiết đơn hàng
        await this.xemChiTietDonHang(id);
        if (!this.list_chi_tiet_don_hang || !Array.isArray(this.list_chi_tiet_don_hang) || this.list_chi_tiet_don_hang.length === 0) {
          throw new Error("Không có dữ liệu chi tiết đơn hàng.");
        }
        // 2. Lấy danh sách nhà sản xuất từ chi tiết đơn hàng
        const danh_sach_nha_san_xuat = [
          ...new Set(this.list_chi_tiet_don_hang.map(sp => sp.id_nsx))
        ];
        const id_dai_ly = this.list_chi_tiet_don_hang[0]?.user_id;
        // 3. Gọi API lấy tuyến đường gợi ý cho nhiều nhà sản xuất
        const res = await baseRequest
          .post('user/don-hang/don-vi-van-chuyen/goi-y-duong-di', {
            id_dai_ly,
            danh_sach_nha_san_xuat,
          });

        // 4. Gán dữ liệu tuyến đường vào biến
        this.tuyen_duong_de_xuat = res.data.data.map(tuyen => {
          const distance = tuyen.distance;
          const nha_san_xuat_name = tuyen.nha_san_xuat_name;
          const tuyen_so = tuyen.tuyen_so;
          const pathFormatted = tuyen.path_names.map(name => {
            if (name.includes("Nhà sản xuất")) return name;
            if (name.includes("Kho")) return name;
            if (name.includes("Đại lý")) return name;

            // Nếu không có prefix thì thêm thủ công
            if (name.toLowerCase().includes("nsx") || name.toLowerCase().includes("nhà sản xuất")) {
              return "Nhà sản xuất: " + name;
            }
            if (name.toLowerCase().includes("kho")) {
              return "Kho: " + name;
            }
            if (name.toLowerCase().includes("đại lý")) {
              return "Đại lý: " + name;
            }
            return name; // fallback
          });

          return {
            nha_san_xuat_id: tuyen.nha_san_xuat_id,
            path_names: pathFormatted,
            distance: distance + ' km',
            nha_san_xuat_name: nha_san_xuat_name,
            tuyen_so: tuyen_so,
          };
        });
        this.chieu_dai_tuyen_duong = res.data.total_distance;
        this.isLoading = false;
      } catch (error) {
        console.error("Lỗi khi thực hiện xem chi tiết và xác nhận đơn hàng:", error);
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
            this.xemLichTrinhDonHang(this.id_don_hang_dang_xem);
            this.loadDataDonHang();
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
            this.xemLichTrinhDonHang(this.id_don_hang_dang_xem);
          } else {
            toaster.error("Không thể xác nhận đã đi.");
          }
        })
        .catch(() => toaster.error("Lỗi kết nối khi xác nhận đã đi."));
    },

    addToBlockChain(steps) {
      this.isLoading = true;
      const diaChiVi = localStorage.getItem('dia_chi_vi');
      baseRequest
        .post('user/don-hang/don-vi-van-chuyen/dvvc-mint',
          {
            routes: steps,
            dia_chi_vi: diaChiVi
          })
        .then((res) => {
          if (res.data.success) {
            toaster.success("Mint thành công")
            this.xemLichTrinhDonHang(this.id_don_hang_dang_xem);
          } else {
            toaster.error("Lỗi mint: " + res.data.error)
          }
        })
        .catch((err) => {
          toaster.error("Lỗi hệ thống khi gửi dữ liệu: " + err.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
<style></style>