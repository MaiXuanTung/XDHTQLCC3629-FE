<template>
  <div class="container">
    <div class="card radius-10">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark">Danh Sách Sản Phẩm</h4>
          </div>
          <div class="col-sm-6 text-end">
            <button type="button" class="btn btn-sm btn-outline-primary px-5" data-bs-toggle="modal"
              data-bs-target="#themMoiModal"><i class="bx bx-user mr-1"></i>Thêm
              Mới</button>
          </div>
        </div>
        <div class="input-group mb-3 ">
          <input v-on:keyup.enter="searchSanPham()" v-model="key_search.abc" type="text"
            class="form-control search-control" placeholder="Nhập thông tin cần tìm">
          <button v-on:click="searchSanPham()" class="btn btn-primary ">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive" style="height: 470px;">
          <table class="table align-middle mb-0 ">
            <thead class="table-light" style="position: sticky; top: 0; z-index: 1000;">
              <tr>
                <th>#</th>
                <th>Mã Sản Phẩm</th>
                <th>Tên Sản Phẩm</th>
                <th>Nhà Sản Xuất</th>
                <th>Mô Tả</th>
                <th>Hình ảnh</th>
                <th>Tên Danh Mục</th>
                <!-- <th>Transaction hash</th> -->
                <th>Tình Trạng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in list_san_pham" :key="k">
                <tr class="">
                  <td>{{ k + 1 }}</td>
                  <td>{{ v.ma_san_pham }}</td>
                  <td>{{ v.ten_san_pham }}</td>
                  <td>{{ v.ten_cong_ty }}</td>
                  <td>
                    <i style="font-size: 25px;" v-on:click="Object.assign(mo_ta_sp, v)"
                      class="fa-solid fa-circle-info ms-2" data-bs-toggle="modal" data-bs-target="#MotaModal"></i>
                  </td>
                  <!-- <td>{{ v.mo_ta }}</td> -->
                  <td>
                    <img v-bind:src="v.hinh_anh" class="rounded-circle" width="80" height="80">
                  </td>
                  <td>{{ v.ten_danh_muc }}</td>
                  <!-- <td>{{ v.transaction_hash }}</td> -->
                  <td>
                    <div>
                      <a v-on:click="doiTinhTrang(v)" v-if="v.tinh_trang == 1" type="button"
                        class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Đã Duyệt</a>
                      <a v-on:click="doiTinhTrang(v)" v-else type="button"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Chưa Duyệt</a>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex order-actions">
                      <div class="d-flex order-actions">
                        <a v-on:click="Object.assign(update_san_pham, v)" type="button" title="Cập Nhật"
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
        <div class="modal fade" id="MotaModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Mô tả sản phẩm</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {{ mo_ta_sp.mo_ta }}
                <!-- {{ mo_ta_sp.mo_ta }} -->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="themMoiModal" tabindex="-1" aria-hidden="true" style="display: none;">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="card-title d-flex align-items-center">
                    <h4 class="mb-0 text-info">Thêm Mới Sản Phẩm</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputMaSanPham" class="col-sm-3 form-label">Mã Sản Phẩm</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham.ma_san_pham" type="text" class="form-control" id="inputMaSanPham"
                        placeholder="Nhập mã sản phẩm">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputTenSanPham" class="col-sm-3 col-form-label">Tên Sản
                      Phẩm</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham.ten_san_pham" type="text" class="form-control"
                        id="inputTenSanPham" placeholder="Nhập tên sản phẩm">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputMoTa" class="col-sm-3 col-form-label">Mô Tả</label>
                    <div class="col-sm-9">
                      <textarea v-model="create_san_pham.mo_ta" class="form-control" id="inputMoTa"
                        placeholder="Nhập mô tả" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputTenDanhMuc" class="col-sm-3 form-label">Tên Danh Mục</label>
                    <div class="col-9">
                      <select v-model="create_san_pham.id_danh_muc" class="form-control">
                        <template v-for="(value, index) in list_danh_muc_sp" :key="index">
                          <option v-bind:value="value.id">{{ value.ten_danh_muc }} </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputHinhAnh" class="col-sm-3 col-form-label">Hình ảnh</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham.hinh_anh" type="text" class="form-control" id="inputHinhAnh"
                        placeholder="Link hình ảnh">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Tình Trạng</label>
                    <div class="col-sm-9">
                      <select v-model="create_san_pham.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="themMoiSanPham()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm
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
                    <h4 class="mb-0 text-info">Cập Nhật Thông Tin Sản Phẩm</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputMaSanPham" class="col-sm-3 col-form-label">Mã Sản Phẩm</label>
                    <div class="col-sm-9">
                      <input v-model="update_san_pham.ma_san_pham" type="text" class="form-control" id="inputMaSanPham">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputTenSanPham" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                      <input v-model="update_san_pham.ten_san_pham" type="text" class="form-control"
                        id="inputTenSanPham">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputMoTa" class="col-sm-3 col-form-label">Mô Tả</label>
                    <div class="col-sm-9">
                      <input v-model="update_san_pham.mo_ta" class="form-control" id="inputMoTa">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputTenDanhMuc" class="col-sm-3 col-form-label">Địa Chỉ</label>
                    <div class="col-9">
                      <select v-model="update_san_pham.id_danh_muc" class="form-control">
                        <template v-for="(value, index) in list_danh_muc_sp" :key="index">
                          <option v-bind:value="value.id">{{ value.ten_danh_muc }}</option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputHinhAnh" class="col-sm-3 col-form-label">Hình ảnh</label>
                    <div class="col-sm-9">
                      <input v-model="update_san_pham.hinh_anh" type="text" class="form-control" id="inputHinhAnh"
                        placeholder="Link hình ảnh">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Tình Trạng</label>
                    <div class="col-sm-9">
                      <select v-model="update_san_pham.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="updateSanPham()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
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
                      <div>Bạn chắc chắn muốn xóa sản phẩm này?</div>
                    </div>
                  </div>
                </div>
              </div>
              <button v-on:click="deleteSanPham()" data-bs-dismiss="modal"
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
      list_san_pham: [],
      list_danh_muc_sp: [],
      create_san_pham: {},
      id_can_xoa: '',
      mo_ta_sp: {},
      update_san_pham: {},
      key_search: {},
    }
  },
  mounted() {
    this.loadDataSanPham();
    this.loadDataDanhMucSp();
  },
  methods:
  {
    loadDataSanPham() {
      baseRequest
        .get('admin/san-pham/lay-du-lieu')
        .then((res) => {
          if (res.data.status) {
            this.list_san_pham = res.data.san_pham;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
    loadDataDanhMucSp() {
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

    themMoiSanPham() {
      baseRequest
        .post('admin/san-pham/them-moi-san-pham', this.create_san_pham)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataSanPham();
            this.create_san_pham = { ma_san_pham: "", ten_san_pham: "", mo_ta: "" };
          }
          else {
            toaster.error(); ('Thông báo<br>' + res.data.message);
          }
        });
    },

    searchSanPham() {
      baseRequest
        .post('admin/san-pham/tim-san-pham', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_san_pham = res.data.san_pham;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    deleteSanPham() {
      baseRequest
        .delete('admin/san-pham/xoa-san-pham/' + this.id_can_xoa)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataSanPham();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    updateSanPham() {
      baseRequest
        .post('admin/san-pham/cap-nhat-san-pham', this.update_san_pham)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataSanPham();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    doiTinhTrang(v) {
      baseRequest
        .post('admin/san-pham/doi-tinh-trang-san-pham', v)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataSanPham();
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