<template>
  <div class="container">
    <div class="card radius-10">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark">Danh Sách Nhà Sản Xuất</h4>
          </div>
          <div class="col-sm-6 text-end">
            <button type="button" class="btn btn-sm btn-outline-primary px-5" data-bs-toggle="modal"
              data-bs-target="#themMoiModal"><i class="bx bx-user mr-1"></i>Thêm
              Mới</button>
          </div>
        </div>
        <div class="input-group mb-3 ">
          <input v-on:keyup.enter="searchNhaSanXuat()" v-model="key_search.abc" type="text"
            class="form-control search-control" placeholder="Nhập thông tin cần tìm">
          <button v-on:click="searchNhaSanXuat()" class="btn btn-primary ">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive" style="height: 390px;">
          <table class="table align-middle mb-0">
            <thead class="table-light" style="position: sticky; top: 0; z-index: 1000;">
              <tr>
                <th>#</th>
                <th>Tên Công Ty</th>
                <th>Địa Chỉ</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Doanh Thu</th>
                <th>Tình Trạng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in list_nha_san_xuat" :key="k">
                <tr>
                  <td>{{ k + 1 }}</td>
                  <td>{{ v.ten_cong_ty }}</td>
                  <td>{{ v.dia_chi }}</td>
                  <td>{{ v.so_dien_thoai }}</td>
                  <td>{{ v.email }}</td>
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
                        <a v-on:click="Object.assign(update_nha_san_xuat, v)" type="button" title="Cập Nhật"
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
              <div class="modal-body">
                <div class="card-body p-2">
                  <div class="card-title d-flex align-items-center">
                    <div><i class="bx bxs-user me-1 font-22 text-primary"></i>
                    </div>
                    <h5 class="mb-0 text-primary">Thêm Mới Nhà Sản Xuất</h5>
                  </div>
                  <hr>
                  <form class="row g-3">
                    <div class="col-md-6">
                      <label for="inputTenCongTyCreate" class="form-label">Tên Công Ty</label>
                      <input v-model="create_nha_san_xuat.ten_cong_ty" type="text" class="form-control"
                        id="inputTenCongTyCreate" placeholder="Nhập tên công ty">
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmailCreate" class="form-label">Email</label>
                      <input v-model="create_nha_san_xuat.email" type="email" class="form-control" id="inputEmailCreate"
                        placeholder="Nhập email">
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword" class="form-label">Password</label>
                      <input v-model="create_nha_san_xuat.password" type="password" class="form-control"
                        id="inputPassword" placeholder="Nhập password">
                    </div>
                    <div class="col-md-6">
                      <label for="inputSoDienThoaiCreate" class="form-label">Số Điện Thoại</label>
                      <input v-model="create_nha_san_xuat.so_dien_thoai" type="text" class="form-control"
                        id="inputSoDienThoaiCreate" placeholder="Nhập số điện thoại">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Tỉnh Thành</label>
                      <select class="form-control" v-model="create_nha_san_xuat.tinh_thanh_id">
                        <option disabled value="">-- Chọn Tỉnh Thành --</option>
                        <template v-for="(value, index) in list_tinh_thanh" :key="index">
                          <option v-bind:value="value.id">{{ value.ten_tinh_thanh }} </option>
                        </template>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Quận Huyện</label>
                      <select class="form-control" v-model="create_nha_san_xuat.quan_huyen_id">
                        <option disabled value="">-- Chọn Quận Huyện --</option>
                        <template
                          v-for="(value, index) in list_quan_huyen.filter(q => q.id_tinh_thanh === create_nha_san_xuat.tinh_thanh_id)"
                          :key="index">
                          <option v-bind:value="value.id">{{ value.ten_quan_huyen }} </option>
                        </template>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="inputAddress" class="form-label">Địa Chỉ Cụ Thể</label>
                      <input v-model="create_nha_san_xuat.dia_chi" class="form-control" id="inputAddress"
                        placeholder="Nhập địa chỉ cụ thể">
                    </div>
                    <div class="col-md-6">
                      <label for="selectTinhTrang" class="form-label">Tình Trạng</label>
                      <select v-model="create_nha_san_xuat.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>

                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="themMoiNhaSanXuat()" type="button" class="btn btn-primary"
                  data-bs-dismiss="modal">Thêm
                  Mới</button>
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
                    <h4 class="mb-0 text-info">Cập Nhật Thông Tin Nhà Sản Xuất</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputTenCongTyUpdate" class="col-sm-3 col-form-label">Tên Công Ty</label>
                    <div class="col-sm-9">
                      <input v-model="update_nha_san_xuat.ten_cong_ty" type="text" class="form-control"
                        id="inputTenCongTyUpdate">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputEmailUpdate" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                      <input v-model="update_nha_san_xuat.email" type="email" class="form-control"
                        id="inputEmailUpdate">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputSoDienThoaiUpdate" class="col-sm-3 col-form-label">Số Điện Thoại</label>
                    <div class="col-sm-9">
                      <input v-model="update_nha_san_xuat.so_dien_thoai" type="text" class="form-control"
                        id="inputSoDienThoaiUpdate">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-3">
                      <label class="form-label">Tỉnh Thành</label>
                    </div>
                    <div class="col-lg-9">
                      <select class="form-control" v-model="update_nha_san_xuat.tinh_thanh_id">
                        <option disabled value="">-- Chọn Tỉnh Thành --</option>
                        <template v-for="(value, index) in list_tinh_thanh" :key="index">
                          <option v-bind:value="value.id">{{ value.ten_tinh_thanh }} </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-3">
                      <label class="form-label">Quận Huyện</label>
                    </div>
                    <div class="col-md-9">
                      <select class="form-control" v-model="update_nha_san_xuat.quan_huyen_id">
                        <option disabled value="">-- Chọn Quận Huyện --</option>
                        <template
                          v-for="(value, index) in list_quan_huyen.filter(q => q.id_tinh_thanh === update_nha_san_xuat.tinh_thanh_id)"
                          :key="index">
                          <option v-bind:value="value.id">{{ value.ten_quan_huyen }} </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3 mb-3">
                    <label for="inputDiaChi" class="col-sm-3 col-form-label">Địa Chỉ Cụ Thể</label>
                    <div class="col-sm-9">
                      <textarea v-model="update_nha_san_xuat.dia_chi" class="form-control" id="inputDiaChi"
                        rows="3"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="updateNhaSanXuat()" type="button" class="btn btn-primary"
                  data-bs-dismiss="modal">Cập
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
      list_nha_san_xuat: [],
      list_tinh_thanh: [],
      list_quan_huyen: [],
      create_nha_san_xuat: {},
      id_can_xoa: '',
      update_nha_san_xuat: {},
      key_search: {},
    }
  },
  mounted() {
    this.loadDataNhaSanXuat();
    this.loadDataTinhThanh();
    this.loadDataQuanHuyen();
  },
  methods: {
    loadDataNhaSanXuat() {
      baseRequest
        .get('admin/nha-san-xuat/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_nha_san_xuat = res.data.nha_san_xuat;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
    loadDataTinhThanh() {
      baseRequest
        .get('admin/tinh-thanh/lay-du-lieu-tinh')
        .then((res) => {
          if (res.data.status) {
            this.list_tinh_thanh = res.data.tinh_thanh;
          } else {
            toaster.error('Thông báo<br>' + "Không tải được dữ liệu Tình Thành");
          }
        });
    },
    loadDataQuanHuyen() {
      baseRequest
        .get('admin/quan-huyen/lay-du-lieu-qh')
        .then((res) => {
          if (res.data.status) {
            this.list_quan_huyen = res.data.quan_huyen;
          } else {
            toaster.error('Thông báo<br>' + "Không tải được dữ liệu Quận Huyện");
          }
        });
    },

    themMoiNhaSanXuat() {
      baseRequest
        .post('admin/nha-san-xuat/them-moi-nha-san-xuat', this.create_nha_san_xuat)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataNhaSanXuat();
            this.create_nha_san_xuat = { ten_cong_ty: "" };
          }
          else {
            toaster.error(); ('Thông báo<br>' + res.data.message);
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            for (const key in errors) {
              errors[key].forEach(msg => {
                toaster.error('Lỗi: ' + msg);
              });
            }
          } else {
            toaster.error('Lỗi không xác định!');
          }
        });
    },

    searchNhaSanXuat() {
      baseRequest
        .post('admin/nha-san-xuat/tim-nha-san-xuat', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_nha_san_xuat = res.data.nha_san_xuat;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
    updateNhaSanXuat() {
      baseRequest
        .post('admin/nha-san-xuat/cap-nhat-nha-san-xuat', this.update_nha_san_xuat)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataNhaSanXuat();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    doiTinhTrang(v) {
      baseRequest
        .post('admin/nha-san-xuat/doi-tinh-trang-nha-san-xuat', v)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataNhaSanXuat();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
  },
}
</script>
<style></style>