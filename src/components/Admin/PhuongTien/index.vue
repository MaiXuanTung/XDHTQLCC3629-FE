<template>
  <div class="container">
    <div class="card radius-10">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark">Danh Sách Phương Tiện</h4>
          </div>
          <div class="col-sm-6 text-end">
            <button type="button" class="btn btn-sm btn-outline-primary px-5" data-bs-toggle="modal"
              data-bs-target="#themMoiModal"><i class="bx bx-user mr-1"></i>Thêm
              Mới</button>
          </div>
        </div>
        <div class="input-group mb-3 ">
          <input v-on:keyup.enter="searchPhuongTien()" v-model="key_search.abc" type="text"
            class="form-control search-control" placeholder="Nhập thông tin cần tìm">
          <button v-on:click="searchPhuongTien()" class="btn btn-primary ">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive" style="height: 390px;">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Mã Phương Tiện</th>
                <th>Tên Phương Tiện</th>
                <th>Tình Trạng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in list_phuong_tien">
                <tr>
                  <td>{{ k+1 }}</td>
                  <td>{{ v.ma_phuong_tien }}</td>
                  <td>{{ v.ten_phuong_tien }}</td>
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
                        <a v-on:click="Object.assign(update_phuong_tien, v)" type="button" title="Cập Nhật"
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
          <!-- <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-body">
                <div class="card-body p-2">
                  <div class="card-title d-flex align-items-center">
                    <div><i class="bx bxs-user me-1 font-22 text-primary"></i>
                    </div>
                    <h5 class="mb-0 text-primary">Thêm Mới Đại Phương Tiện</h5>
                  </div>
                  <hr>
                  <form class="row g-3">
                    <div class="col-md-6">
                      <label for="inputMaPhuongTien" class="form-label">Mã Phương Tiện</label>
                      <input v-model="create_phuong_tien.ma_phuong_tien" type="text" class="form-control"
                        id="inputMaPhuongTien" placeholder="Nhập mã phương tiện">
                    </div>
                    <div class="col-md-6">
                      <label for="inputTenPhuongTien" class="form-label">Tên Phương Tiện</label>
                      <input v-model="create_phuong_tien.ten_phuong_tien" type="text" class="form-control"
                        id="inputTenPhuongTien" placeholder="Nhập tên phương tiện">
                    </div>
                    <div class="col-md-6">
                      <label for="selectTinhTrang" class="form-label">Tình Trạng</label>
                      <select v-model="create_phuong_tien.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="themMoiPhuongTien()" type="button" class="btn btn-primary"
                  data-bs-dismiss="modal">Thêm
                  Mới</button>
              </div>
            </div>
          </div> -->
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="card-title d-flex align-items-center">
                    <h4 class="mb-0 text-info">Thêm Mới Phương Tiện</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputMaPhuongTien" class="col-sm-3 form-label">Mã Phương Tiện</label>
                    <div class="col-sm-9">
                      <input v-model="create_phuong_tien.ma_phuong_tien" type="text" class="form-control"
                        id="inputMaPhuongTien" placeholder="Nhập mã phương tiện">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputTenPhuongTien" class="col-sm-3 form-label">Tên Phương Tiện</label>
                    <div class="col-sm-9">
                      <input v-model="create_phuong_tien.ten_phuong_tien" type="text" class="form-control"
                        id="inputTenPhuongTien" placeholder="Nhập tên phương tiện">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-col-sm-3 form-label">Tình Trạng</label>
                    <div class="col-sm-9">
                      <select v-model="create_phuong_tien.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="themMoiPhuongTien()" type="button" class="btn btn-primary"
                  data-bs-dismiss="modal">Thêm
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
                  <div class="row mb-3">
                    <label for="inputMaPhuongTien" class="col-sm-3 col-form-label">Mã Phương Tiện</label>
                    <div class="col-sm-9">
                      <input v-model="update_phuong_tien.ma_phuong_tien" type="text" class="form-control"
                        id="inputMaPhuongTien">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputTenPhuongTien" class="col-sm-3 col-form-label">Tên Phương Tiện</label>
                    <div class="col-sm-9">
                      <input v-model="update_phuong_tien.ten_phuong_tien" type="text" class="form-control"
                        id="inputTenPhuongTien">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Tình Trạng</label>
                    <div class="col-sm-9">
                      <select v-model="update_phuong_tien.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="updatePhuongTien()" type="button" class="btn btn-primary"
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
                      <div>Bạn chắc chắn muốn xóa phương tiện này?</div>
                    </div>
                  </div>
                </div>
              </div>
              <button v-on:click="deletePhuongTien()" data-bs-dismiss="modal"
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
      list_phuong_tien: [],
      create_phuong_tien: {},
      id_can_xoa: '',
      update_phuong_tien: {},
      key_search: {},
    }
  },
  mounted() {
    this.loadDataPhuongTien();
  },
  methods: {
    loadDataPhuongTien() {
      baseRequest
        .get('admin/phuong-tien/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_phuong_tien = res.data.phuong_tien;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    themMoiPhuongTien() {
      baseRequest
        .post('admin/phuong-tien/them-moi-phuong-tien', this.create_phuong_tien)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataPhuongTien();
          }
          else {
            toaster.error(); ('Thông báo<br>' + res.data.message);
          }
        });
    },

    searchPhuongTien() {
      baseRequest
        .post('admin/phuong-tien/tim-phuong-tien', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_phuong_tien = res.data.phuong_tien;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    deletePhuongTien() {
      baseRequest
        .delete('admin/phuong-tien/xoa-phuong-tien/' + this.id_can_xoa)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataPhuongTien();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    updatePhuongTien() {
      baseRequest
        .post('admin/phuong-tien/cap-nhat-phuong-tien', this.update_phuong_tien)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataPhuongTien();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    doiTinhTrang(v) {
      baseRequest
        .post('admin/phuong-tien/doi-tinh-trang-phuong-tien', v)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataPhuongTien();
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