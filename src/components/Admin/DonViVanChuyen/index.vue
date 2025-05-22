<template>
  <div class="container">
    <div class="card radius-10">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark">Danh Sách Đơn Vị Vận Chuyển</h4>
          </div>
          <div class="col-sm-6 text-end">
            <button type="button" class="btn btn-sm btn-outline-primary px-5" data-bs-toggle="modal"
              data-bs-target="#themMoiModal"><i class="bx bx-user mr-1"></i>Thêm
              Mới</button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-9">
            <div class="input-group mb-3 ">
              <input v-on:keyup.enter="searchDVVC()" v-model="key_search.abc" type="text"
                class="form-control search-control" placeholder="Nhập thông tin cần tìm">
              <button v-on:click="searchDVVC()" class="btn btn-primary ">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div class="col-lg-3">
            <div>
              <select class="form-control border-primary" v-model="LocTheoTrangThai">
                <option value="">Tình Trạng - Tất Cả</option>
                <option value="1">Hoạt Động</option>
                <option value="0">Tạm Dừng</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive" style="height: 390px;">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Tên Công Ty</th>
                <th>Email</th>
                <th>Số Điện Thoại</th>
                <th>Địa Chỉ</th>
                <th>Cước Vận Chuyển</th>
                <th>Doanh Thu</th>
                <th>Tình Trạng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in locDataTheoTrangThai" :key="k">
                <tr>
                  <td>{{ k + 1 }}</td>
                  <td>{{ v.ten_cong_ty }}</td>
                  <td>{{ v.email }}</td>
                  <td>{{ v.so_dien_thoai }}</td>
                  <td>{{ v.dia_chi }}</td>
                  <td class="text-danger"><b>{{ formatToVND(v.cuoc_van_chuyen) }}</b></td>
                  <td class="text-danger"><b>{{ formatToVND(v.so_du_tai_khoan) }}</b></td>
                  <td>
                    <div>
                      <a v-on:click="doiTinhTrang(v)" v-if="v.tinh_trang == 1" type="button"
                        class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Hoạt Động</a>
                      <a v-on:click="doiTinhTrang(v)" v-else type="button"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Tạm Dừng</a>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex order-actions">
                      <div class="d-flex order-actions">
                        <a v-on:click="Object.assign(update_don_vi_van_chuyen, v)" type="button" title="Cập Nhật"
                          data-bs-toggle="modal" data-bs-target="#capNhatModal" class="ms-2 bg-light-info"><i
                            class="fa-solid fa-arrows-rotate text-info"></i></a>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="modal fade" id="themMoiModal" tabindex="-1" aria-hidden="true" style="display: none;">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="card-title d-flex align-items-center">
                    <h4 class="mb-0 text-info">Thêm Mới Đơn Vị Vận Chuyển</h4>
                  </div>
                  <hr>
                  <div class="row g-3">
                    <div class="col-sm-12">
                      <label for="inputTenCongTy" class="form-label">Tên Công Ty</label>
                      <input v-model="create_don_vi_van_chuyen.ten_cong_ty" type="text" class="form-control"
                        id="inputTenCongTy" placeholder="Nhập Tên Công Ty">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputEmail" class="form-label">Email</label>
                      <input v-model="create_don_vi_van_chuyen.email" type="text" class="form-control" id="inputEmail"
                        placeholder="Nhập Email">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputMatKhau" class="col-sm-3 form-label">Mật Khẩu</label>
                      <input v-model="create_don_vi_van_chuyen.password" type="text" class="form-control"
                        id="inputMatKhau" placeholder="Nhập Mật Khẩu">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputSoDienThoai" class="form-label">Số Điện Thoại</label>
                      <input v-model="create_don_vi_van_chuyen.so_dien_thoai" type="text" class="form-control"
                        id="inputSoDienThoai" placeholder="Nhập Số Điện Thoại">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputDiaChi" class="form-label">Địa Chỉ</label>
                      <input v-model="create_don_vi_van_chuyen.dia_chi" type="text" class="form-control"
                        id="inputDiaChi" placeholder="Nhập Địa Chỉ">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputCuocVanChuyen" class="form-label">Cước Vận Chuyển - Nghìn Đồng</label>
                      <input v-model="create_don_vi_van_chuyen.cuoc_van_chuyen" type="text" class="form-control"
                        id="inputCuocVanChuyen" placeholder="Nhập Cước Vận Chuyển">
                    </div>
                    <div class="col-sm-6">
                      <label class="form-label">Tình Trạng</label>
                      <select v-model="create_don_vi_van_chuyen.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="themMoiDVVC()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm
                  mới</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="capNhatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="card-title d-flex align-items-center">
                    <h4 class="mb-0 text-info">Cập Nhật Thông Tin Phương Tiện</h4>
                  </div>
                  <hr>
                  <div class="row g-3">
                    <div class="col-sm-12">
                      <label for="inputTenCongTy2" class="form-label">Tên Công Ty</label>
                      <input v-model="update_don_vi_van_chuyen.ten_cong_ty" type="text" class="form-control"
                        id="inputTenCongTy2">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputEmail2" class="form-label">Email</label>
                      <input v-model="update_don_vi_van_chuyen.email" type="text" class="form-control" id="inputEmail2">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputSoDienThoai2" class="form-label">Số Điện Thoại</label>
                      <input v-model="update_don_vi_van_chuyen.so_dien_thoai" type="text" class="form-control"
                        id="inputSoDienThoai2">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputDiaChi2" class="form-label">Địa Chỉ</label>
                      <input v-model="update_don_vi_van_chuyen.dia_chi" type="text" class="form-control"
                        id="inputDiaChi2">
                    </div>
                    <div class="col-sm-6">
                      <label for="inputCuocVanChuyen2" class="form-label">Cước Vận Chuyển - Nghìn Đồng</label>
                      <input v-model="update_don_vi_van_chuyen.cuoc_van_chuyen" type="text" class="form-control"
                        id="inputCuocVanChuyen2">
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="updateDVVC()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                  Nhật</button>
              </div>
            </div>
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
      LocTheoTrangThai: "",
      list_don_vi_van_chuyen: [],
      create_don_vi_van_chuyen: {},
      update_don_vi_van_chuyen: {},
      key_search: {},
    }
  },
  mounted() {
    this.loadDataDVVC();
  },
  computed: {
    locDataTheoTrangThai() {
      if (this.LocTheoTrangThai === "") {
        return this.list_don_vi_van_chuyen; // Hiển thị tất cả nếu chưa chọn gì
      }
      return this.list_don_vi_van_chuyen.filter(item => String(item.tinh_trang) === String(this.LocTheoTrangThai));
    },
  },
  methods: {
    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
    loadDataDVVC() {
      baseRequest
        .get('admin/don-vi-van-chuyen/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_don_vi_van_chuyen = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    themMoiDVVC() {
      baseRequest
        .post('admin/don-vi-van-chuyen/them-moi-don-vi-van-chuyen', this.create_don_vi_van_chuyen)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDVVC();
            this.create_don_vi_van_chuyen = { ten_cong_ty: "" };
          }
          else {
            toaster.error(); ('Thông báo<br>' + res.data.message);
          }
        });
    },

    searchDVVC() {
      baseRequest
        .post('admin/don-vi-van-chuyen/tim-don-vi-van-chuyen', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_don_vi_van_chuyen = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    updateDVVC() {
      baseRequest
        .post('admin/don-vi-van-chuyen/cap-nhat-don-vi-van-chuyen', this.update_don_vi_van_chuyen)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDVVC();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    doiTinhTrang(v) {
      baseRequest
        .post('admin/don-vi-van-chuyen/doi-tinh-trang-don-vi-van-chuyen', v)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDVVC();
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