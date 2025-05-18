<template>
  <div class="container">
    <div class="card radius-10">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark">Danh Sách Đại Lý</h4>
          </div>
          <div class="col-sm-6 text-end">
            <button type="button" class="btn btn-sm btn-outline-primary px-5" data-bs-toggle="modal"
              data-bs-target="#themMoiModal"><i class="bx bx-user mr-1"></i>Thêm
              Mới</button>
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
                <th>Tên Công Ty</th>
                <th>Email</th>
                <th>Địa Chỉ</th>
                <th>Số Điện Thoại</th>
                <th>Tình Trạng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in list_dai_ly" :key="k">
                <tr>
                  <td>{{ k + 1 }}</td>
                  <td>{{ v.ten_cong_ty }}</td>
                  <td>{{ v.email }}</td>
                  <td>{{ v.dia_chi }}</td>
                  <td>{{ v.so_dien_thoai }}</td>
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
                        <a v-on:click="Object.assign(update_dai_ly, v)" type="button" title="Cập Nhật"
                          data-bs-toggle="modal" data-bs-target="#capNhatModal" class="ms-2 bg-light-info"><i
                            class="fa-solid fa-arrows-rotate text-info"></i></a>
                        <!-- <a v-on:click="id_can_xoa = v.id" type="button" title="Xóa" data-bs-toggle="modal"
                          data-bs-target="#xoaModal" class="ms-2 bg-light-danger"><i
                            class="fa-solid fa-xmark text-danger"></i></a> -->
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
                    <h5 class="mb-0 text-primary">Thêm Mới Đại Lý</h5>
                  </div>
                  <hr>
                  <form class="row g-3">
                    <div class="col-md-6">
                      <label for="inputTenCongTy" class="form-label">Tên Công Ty</label>
                      <input v-model="create_dai_ly.ten_cong_ty" type="text" class="form-control" id="inputTenCongTy"
                        placeholder="Nhập tên công ty">
                    </div>
                    <div class="col-md-6">
                      <label for="selectLoaiDoiTac" class="form-label">Email</label>
                      <input v-model="create_dai_ly.email" type="email" class="form-control" id="inputEmail"
                        placeholder="Nhập email">
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword" class="form-label">Password</label>
                      <input v-model="create_dai_ly.password" type="password" class="form-control" id="inputPassword"
                        placeholder="Nhập password">
                    </div>
                    <div class="col-6">
                      <label for="inputAddress" class="form-label">Địa Chỉ</label>
                      <input v-model="create_dai_ly.dia_chi" class="form-control" id="inputAddress"
                        placeholder="Nhập địa chỉ">
                    </div>
                    <div class="col-md-6">
                      <label for="inputSoDienThoai" class="form-label">Số Điện Thoại</label>
                      <input v-model="create_dai_ly.so_dien_thoai" type="text" class="form-control"
                        id="inputSoDienThoai" placeholder="Nhập số điện thoại">
                    </div>
                    <div class="col-md-6">
                      <label for="selectTinhTrang" class="form-label">Tình Trạng</label>
                      <select v-model="create_dai_ly.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="themMoiDaiLy()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm
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
                    <h4 class="mb-0 text-info">Cập Nhật Thông Tin Đại Lý</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputTenCongTy" class="col-sm-3 col-form-label">Tên Công Ty</label>
                    <div class="col-sm-9">
                      <input v-model="update_dai_ly.ten_cong_ty" type="text" class="form-control" id="inputTenCongTy">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputEmail" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                      <input v-model="update_dai_ly.email" type="email" class="form-control" id="inputEmail">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputDiaChi" class="col-sm-3 col-form-label">Địa Chỉ</label>
                    <div class="col-sm-9">
                      <input v-model="update_dai_ly.dia_chi" class="form-control" id="inputDiaChi">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputSoDienThoai" class="col-sm-3 col-form-label">Số Điện
                      Thoại</label>
                    <div class="col-sm-9">
                      <input v-model="update_dai_ly.so_dien_thoai" type="text" class="form-control"
                        id="inputSoDienThoai">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Tình Trạng</label>
                    <div class="col-sm-9">
                      <select v-model="update_dai_ly.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="updateDaiLy()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                  Nhật</button>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body d-flex">
                <div class="alert border-0 border-start border-5 border-danger alert-dismissible fade show py-2">
                  <div class="d-flex align-items-center">
                    <div class="font-35 text-danger"><i class="bx bxs-message-square-x"></i>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-0 text-danger">Thông Báo</h6>
                      <div>Bạn chắc chắn muốn xóa đại lý này?</div>
                    </div>
                  </div>
                </div>
              </div>
              <button v-on:click="deleteDaiLy()" data-bs-dismiss="modal"
                class="btn btn-border bg-light-danger align-middle">
                <h5 class="text-danger mt-1">Xác Nhận</h5>
              </button>
            </div>
          </div>
        </div> -->
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
      list_dai_ly: [],
      create_dai_ly: {},
      id_can_xoa: '',
      update_dai_ly: {},
      key_search: {},
      //create_dai_ly: {},
    }
  },
  mounted() {
    this.loadDataDaiLy();
  },
  methods: {
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

    themMoiDaiLy() {
      baseRequest
        .post('admin/dai-ly/them-moi-dai-ly', this.create_dai_ly)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDaiLy();
            this.create_dai_ly = { ten_cong_ty: "", email: "", mat_khau: "", dia_chi: "", so_dien_thoai: "", tinh_trang: "" };
          }
          else {
            toaster.error(); ('Thông báo<br>' + res.data.message);
          }
        });
    },

    searchDaiLy() {
      baseRequest
        .post('admin/dai-ly/tim-dai-ly', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_dai_ly = res.data.dai_ly;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    deleteDaiLy() {
      baseRequest
        .delete('admin/dai-ly/xoa-dai-ly/' + this.id_can_xoa)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDaiLy();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    updateDaiLy() {
      baseRequest
        .post('admin/dai-ly/cap-nhat-dai-ly', this.update_dai_ly)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDaiLy();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    doiTinhTrang(v) {
      baseRequest
        .post('admin/dai-ly/doi-tinh-trang-dai-ly', v)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataDaiLy();
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
