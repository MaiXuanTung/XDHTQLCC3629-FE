<template>
  <div class="container">
    <div class="card radius-10">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark">Danh Sách Nhân Viên</h4>
          </div>
          <div class="col-sm-6 text-end">
            <button type="button" class="btn btn-sm btn-outline-primary px-5" data-bs-toggle="modal"
              data-bs-target="#themMoiModal"><i class="bx bx-user mr-1"></i>Thêm
              Mới</button>
          </div>
        </div>
        <div class="input-group mb-3 ">
          <input v-on:keyup.enter="searchNhanVien()" v-model="key_search.abc" type="text"
            class="form-control search-control" placeholder="Nhập thông tin cần tìm">
          <button v-on:click="searchNhanVien()" class="btn btn-primary ">
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
                <th>Họ Tên</th>
                <th>Email</th>
                <th>Chức vụ</th>
                <th>Tình Trạng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in list_nhan_vien" :key="k">
                <tr>
                  <td>{{ k + 1 }}</td>
                  <td>{{ v.ho_ten }}</td>
                  <td>{{ v.email }}</td>
                  <td>{{ v.id_chuc_vu }}</td>
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
                        <a v-on:click="Object.assign(update_nhan_vien, v)" type="button" title="Cập Nhật"
                          data-bs-toggle="modal" data-bs-target="#capNhatModal" class="ms-2 bg-light-info"><i
                            class="fa-solid fa-arrows-rotate text-info"></i></a>
                        <a v-on:click="id_can_xoa = v.id" type="button" title="Xóa" data-bs-toggle="modal"
                          data-bs-target="#xoaModal" class="ms-2 bg-light-danger"><i
                            class="fa-solid fa-xmark text-danger"></i></a>
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
                    <h5 class="mb-0 text-primary">Thêm Mới Nhân Viên</h5>
                  </div>
                  <hr>
                  <form class="row g-3">
                    <div class="col-md-6">
                      <label for="inputTenNhanVien" class="form-label">Tên Nhân Viên</label>
                      <input v-model="create_nhan_vien.ho_ten" type="text" class="form-control" id="inputTenNhanVien"
                        placeholder="Nhập Tên NV">
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail" class="form-label">Email</label>
                      <input v-model="create_nhan_vien.email" type="email" class="form-control" id="inputEmail"
                        placeholder="Nhập email">
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword" class="form-label">Password</label>
                      <input v-model="create_nhan_vien.password" type="password" class="form-control" id="inputPassword"
                        placeholder="Nhập password">
                    </div>
                    <div class="col-md-6">
                      <label for="selectChucVu" class="form-label">Chức Vụ - chưa làm</label>
                      <input v-model="create_nhan_vien.id_chuc_vu" type="text" class="form-control">
                    </div>
                    <div class="col-md-6">
                      <label for="selectTinhTrang" class="form-label">Tình Trạng</label>
                      <select v-model="create_nhan_vien.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="themMoiNhanVien()" type="button" class="btn btn-primary"
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
                    <h4 class="mb-0 text-info">Cập Nhật Nhân Viên</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputTenNhanVien" class="col-sm-3 col-form-label">Họ Và Tên</label>
                    <div class="col-sm-9">
                      <input v-model="update_nhan_vien.ho_ten" type="text" class="form-control" id="inputTenNhanVien">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputEmail" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                      <input v-model="update_nhan_vien.email" type="email" class="form-control" id="inputEmail">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="selectChucVu" class="col-sm-3 col-form-label">Chức Vụ</label>
                    <div class="col-sm-9">
                      <input v-model="update_nhan_vien.id_chuc_vu" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Tình Trạng</label>
                    <div class="col-sm-9">
                      <select v-model="update_nhan_vien.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="updateNhanVien()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                  Nhật</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body d-flex">
                <div class="alert border-0 border-start border-5 border-danger alert-dismissible fade show py-2">
                  <div class="d-flex align-items-center">
                    <div class="font-35 text-danger"><i class="bx bxs-message-square-x"></i>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-0 text-danger">Thông Báo</h6>
                      <div>Bạn chắc chắn muốn xóa nhân viên này?</div>
                    </div>
                  </div>
                </div>
              </div>
              <button v-on:click="deleteNhanVien()" data-bs-dismiss="modal"
                class="btn btn-border bg-light-danger align-middle">
                <h5 class="text-danger mt-1">Xác Nhận</h5>
              </button>
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
      list_nhan_vien: [],
      create_nhan_vien: {},
      id_can_xoa: '',
      update_nhan_vien: {},
      key_search: {},
      create_nhan_vien: {},
    }
  },
  mounted() {
    this.loadDataNhanVien();
  },
  methods: {
    loadDataNhanVien() {
      baseRequest
        .get('admin/nhan-vien/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_nhan_vien = res.data.nhan_vien;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    themMoiNhanVien() {
      baseRequest
        .post('admin/nhan-vien/them-moi-nhan-vien', this.create_nhan_vien)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataNhanVien();
            this.create_nhan_vien = { ho_ten: "", email: "", so_dien_thoai: "", dia_chi: "" };
          }
          else {
            toaster.error(); ('Thông báo<br>' + res.data.message);
          }
        });
    },

    searchNhanVien() {
      baseRequest
        .post('admin/nhan-vien/tim-nhan-vien', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_nhan_vien = res.data.nhan_vien;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    deleteNhanVien() {
      baseRequest
        .delete('admin/nhan-vien/xoa-nhan-vien/' + this.id_can_xoa)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataNhanVien();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    updateNhanVien() {
      baseRequest
        .post('admin/nhan-vien/cap-nhat-nhan-vien', this.update_nhan_vien)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataNhanVien();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    doiTinhTrang(v) {
      baseRequest
        .post('admin/nhan-vien/doi-tinh-trang-nhan-vien', v)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataNhanVien();
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