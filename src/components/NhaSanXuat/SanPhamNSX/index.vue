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
        <div class="input-group mb-3">
          <input v-on:keyup.enter="searchSanPhamNSX()" v-model="key_search.abc" type="text"
            class="form-control search-control" placeholder="Nhập thông tin cần tìm">
          <button v-on:click="searchSanPhamNSX()" class="btn btn-primary">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive" style="height: 400px;">
          <table class="table align-middle mb-0 ">
            <thead class="table-light" style="position: sticky; top: 0; z-index: 1000;">
              <tr>
                <th>#</th>
                <th>Sản Phẩm</th>
                <th class="text-center">Danh Mục</th>
                <th>Hình Ảnh</th>
                <th>Số Lượng Tồn Kho</th>
                <th>Giá Bán</th>
                <th>Đơn Vị Tính</th>
                <th class="text-center">Tình Trạng</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in list_san_pham_nsx" :key="k">
                <tr class="">
                  <td>{{ k + 1 }}</td>
                  <td>{{ v.ten_san_pham }}</td>
                  <td>{{ v.ten_danh_muc }}</td>
                  <td><img v-bind:src="v.hinh_anh" class="rounded-circle" width="80" height="80"></td>
                  <td class="text-center">{{ v.so_luong_ton_kho }}</td>
                  <td class="text-center">{{ v.gia_ban }}</td>
                  <td class="text-center">{{ v.don_vi_tinh }}</td>
                  <td class="text-center">
                    <div>
                      <a v-on:click="doiTinhTrang(v)" v-if="v.tinh_trang == 1" type="button"
                        class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Đã đăng bán </a>
                      <a v-on:click="doiTinhTrang(v)" v-else type="button"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Dừng đăng bán</a>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex order-actions">
                      <div class="d-flex order-actions">
                        <a v-on:click="Object.assign(update_san_pham_nsx, v); console.log(update_san_pham_nsx.id_danh_muc)"
                          type="button" title="Cập Nhật" data-bs-toggle="modal" data-bs-target="#capNhatModal"
                          class="ms-2 bg-light-info"><i class="fa-solid fa-arrows-rotate text-info"></i></a>
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
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="card-title d-flex align-items-center">
                    <h4 class="mb-0 text-info">Thêm Mới</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputidSanPham" class="col-sm-3 col-form-label">Sản Phẩm</label>
                    <div class="col-9">
                      <select v-model="create_san_pham_nsx.id_san_pham" class="form-control">
                        <template v-for="(value, index) in list_san_pham" :key="index">
                          <option v-bind:value="value.id">{{ value.ten_san_pham }} </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputidNhaSX" class="col-sm-3 form-label">Tên Công Ty</label>
                    <div class="col-9">
                      <select v-model="create_san_pham_nsx.id_nha_san_xuat" class="form-control">
                        <template v-for="(value, index) in list_nha_san_xuat" :key="index">
                          <option v-bind:value="value.id">{{ value.ten_cong_ty }} </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputMaLoHang" class="col-sm-3 col-form-label">Mã Lô Hàng</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham_nsx.ma_lo_hang" type="text" class="form-control"
                        id="inputMaLoHang">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNSX" class="col-sm-3 col-form-label">Ngày Sản Xuất</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham_nsx.ngay_san_xuat" type="date" class="form-control" id="inputNSX">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Tình Trạng</label>
                    <div class="col-sm-9">
                      <select v-model="create_san_pham_nsx.tinh_trang" class="form-control">
                        <option value="1">Hoạt Động</option>
                        <option value="0">Tạm Dừng</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="themMoiSanPhamNSX()" type="button" class="btn btn-primary"
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
                    <h4 class="mb-0 text-info">Cập Nhật Thông Tin</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputMaDonHang" class="col-sm-3 col-form-label">Sản Phẩm</label>
                    <div class="col-9">
                      <div class="col-sm-9">
                        <input v-model="update_san_pham_nsx.ten_san_pham" type="text" class="form-control"
                          id="inputNSX">
                      </div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputMaDonHang" class="col-sm-3 col-form-label">Danh Mục</label>
                    <div class="col-9">
                      <select class="form-control" v-model="update_san_pham_nsx.id_danh_muc">
                        <template v-for="(value, index) in list_danh_muc_sp" :key="index">
                          <option v-bind:value="value.id">{{ value.ten_danh_muc }} </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputMaLoHang" class="col-sm-3 col-form-label">Hình Ảnh</label>
                    <div class="col-sm-9">
                      <input v-model="update_san_pham_nsx.hinh_anh" class="form-control" id="inputMaLoHang">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNSX" class="col-sm-3 col-form-label">Số Lượng Tồn Kho</label>
                    <div class="col-sm-9">
                      <input v-model="update_san_pham_nsx.so_luong_ton_kho" type="text" class="form-control"
                        id="inputNSX">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNSX" class="col-sm-3 col-form-label">Giá Bán </label>
                    <div class="col-sm-9">
                      <input v-model="update_san_pham_nsx.gia_ban" type="text" class="form-control" id="inputNSX">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNSX" class="col-sm-3 col-form-label">Đơn Vị Tính</label>
                    <div class="col-sm-9">
                      <input v-model="update_san_pham_nsx.don_vi_tinh" type="text" class="form-control" id="inputNSX">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Tình Trạng</label>
                    <div class="col-sm-9">
                      <select v-model="update_san_pham_nsx.tinh_trang" class="form-control">
                        <option value="1">Đã đăng bán</option>
                        <option value="0">Dừng đăng bán</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-on:click="updateSanPhamNSX()" type="button" class="btn btn-primary"
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
                      <div>Bạn chắc chắn muốn xóa mục này?</div>
                    </div>
                  </div>
                </div>
              </div>
              <button v-on:click="deleteSanPhamNSX()" data-bs-dismiss="modal"
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
      list_san_pham_nsx: [],
      list_san_pham: [],
      list_danh_muc_sp: [],
      list_nha_san_xuat: [],
      create_san_pham_nsx: {},
      id_can_xoa: '',
      ghi_chu_sp: {},
      update_san_pham_nsx: {},
      key_search: {},
    }
  },
  mounted() {
    this.loadDataSanPhamNSX();
    this.loadDataSanPham();
    // this.loadDataNhaSanXuat();S
    this.loadDataDanhMucSp();
  },
  methods:
  {
    loadDataSanPhamNSX() {
      baseRequest
        .get('user/san-pham/get-data-by-user')
        .then((res) => {
          if (res.data.status) {
            this.list_san_pham_nsx = res.data.data;
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

    themMoiSanPhamNSX() {
      baseRequest
        .post('admin/san-pham-nsx/them-moi-san-pham-nsx', this.create_san_pham_nsx)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataSanPhamNSX();
            this.create_san_pham_nsx = { id_san_pham: "", id_nha_san_xuat: "", ma_lo_hang: "" };
          }
          else {
            toaster.error(); ('Thông báo<br>' + res.data.message);
          }
        });
    },

    searchSanPhamNSX() {
      baseRequest
        .post('admin/san-pham-nha-san-xuat/tim-san-pham-nha-san-xuat', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_san_pham_nsx = res.data.san_pham; // Cập nhật dữ liệu tìm kiếm
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    deleteSanPhamNSX() {
      baseRequest
        .delete('admin/san-pham-nsx/xoa-san-pham-nsx/' + this.id_can_xoa)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataSanPhamNSX();
          }
          else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    updateSanPhamNSX() {
      baseRequest
        .post('admin/san-pham-nha-san-xuat/update-san-pham-nha-san-xuat', this.update_san_pham_nsx)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataSanPhamNSX();
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
            this.loadDataSanPhamNSX();
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
