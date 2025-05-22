<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="card border-primary border-bottom border-3 border-0">
          <div style="max-height: 40px;" class="card-header">
            <h5 class="text-dark">Thêm Mới Danh Mục</h5>
          </div>
          <div class="card-body">
            <label class="mb-1 mt-1">Mã Danh Mục</label>
            <input v-model="create_danh_muc_sp.ma_danh_muc" class="form-control" type="text">
            <label class="mb-1 mt-1">Tên Danh Mục</label>
            <input v-model="create_danh_muc_sp.ten_danh_muc" class="form-control" type="text">
            <label class="mb-1 mt-2">Tình Trạng</label>
            <select v-model="create_danh_muc_sp.tinh_trang" class="form-control">
              <option value="1">Hoạt Động</option>
              <option value="0">Tạm Dừng</option>
            </select>
          </div>
          <div class="card-footer text-end">
            <button v-on:click="themMoiDanhMucSP()" class="btn btn-primary">Thêm Mới</button>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card border-primary border-bottom border-3 border-0">
          <div style="max-height: 110px;" class="card-header">
            <div class="row mb-2">
              <div class="col-sm-6 text-start">
                <h4 class="text-dark">Danh Mục Sản Phẩm</h4>
              </div>
            </div>
            <div class="input-group mb-3 ">
              <input v-on:keyup.enter="searchDaiLy()" v-model="key_search.abc" type="text"
                class="form-control search-control" placeholder="Nhập thông tin cần tìm">
              <button v-on:click="searchDaiLy()" class="btn btn-primary ">
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
                    <th>Mã Danh Mục</th>
                    <th>Tên Danh Mục</th>
                    <th>Tình Trạng</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(v, k) in list_danh_muc_sp" :key="k">
                    <tr>
                      <td>{{ k + 1 }}</td>
                      <td>{{ v.ma_danh_muc }}</td>
                      <td>{{ v.ten_danh_muc }}</td>
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
                            <a v-on:click="Object.assign(update_danh_muc_sp, v)" type="button" title="Cập Nhật"
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
            <div class="modal fade" id="capNhatModal" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="card-body">
                    <div class="border p-4 rounded">
                      <div class="card-title d-flex align-items-center">
                        <h4 class="mb-0 text-info">Cập Nhật Danh Mục</h4>
                      </div>
                      <hr>
                      <div class="row mb-3">
                        <label for="inputMaDanhMuc" class="col-sm-3 col-form-label">Mã Danh
                          Mục</label>
                        <div class="col-sm-9">
                          <input v-model="update_danh_muc_sp.ma_danh_muc" type="text" class="form-control"
                            id="inputMaDanhMuc">
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label for="inputTenDanhMuc" class="col-sm-3 col-form-label">Tên Danh
                          Mục</label>
                        <div class="col-sm-9">
                          <input v-model="update_danh_muc_sp.ten_danh_muc" type="email" class="form-control"
                            id="inputTenDanhMuc">
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-3 col-form-label">Tình Trạng</label>
                        <div class="col-sm-9">
                          <select v-model="update_danh_muc_sp.tinh_trang" class="form-control">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="updateDanhMucSP()" type="button" class="btn btn-primary"
                      data-bs-dismiss="modal">Cập
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
                          <div>Bạn chắc chắn muốn xóa danh mục này?</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button v-on:click="deleteDanhMucSP()" data-bs-dismiss="modal"
                    class="btn btn-border bg-light-danger align-middle">
                    <h5 class="text-danger mt-1">Xác Nhận</h5>
                  </button>
                </div>
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
      list_danh_muc_sp: [],
      create_danh_muc_sp: {},
      id_can_xoa: '',
      update_danh_muc_sp: {},
      key_search: {},
    }
  },
  mounted() {
    this.loadDataDanhMuc();
  },
  methods: {
    loadDataDanhMuc() {
      baseRequest
        .get('admin/danh-muc-sp/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_danh_muc_sp = res.data.ma_danh_muc;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    themMoiDanhMucSP() {
      baseRequest
        .post('admin/danh-muc-sp/them-moi-danh-muc', this.create_danh_muc_sp)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDanhMuc();
            this.create_danh_muc_sp = { ma_danh_muc: "" };
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

    searchDanhMucSP() {
      baseRequest
        .post('admin/danh-muc-sp/tim-danh-muc', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_danh_muc_sp = res.data.ma_danh_muc;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    deleteDanhMucSP() {
      baseRequest
        .delete('admin/danh-muc-sp/xoa-danh-muc/' + this.id_can_xoa)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDanhMuc();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    updateDanhMucSP() {
      baseRequest
        .post('admin/danh-muc-sp/cap-nhat-danh-muc', this.update_danh_muc_sp)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDanhMuc();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    doiTinhTrang(v) {
      baseRequest
        .post('admin/danh-muc-sp/doi-tinh-trang-danh-muc', v)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDanhMuc();
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