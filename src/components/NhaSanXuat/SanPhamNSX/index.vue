<template>
  <div class="container">
    <div class="card radius-10">
      <div style="max-height: 110px;" class="card-header">
        <div class="row mb-2">
          <div class="col-sm-6 text-start">
            <h4 class="text-dark mt-1">Danh Sách Sản Phẩm</h4>
          </div>
          <div class="col-sm-6 text-end border-dark">
            <button type="button" class="btn btn-sm btn-outline-primary border-dark px-5 text-dark"
              data-bs-toggle="modal" data-bs-target="#themMoiModal"><i class="bx bx-user mr-1 text-dark"></i>Thêm
              Mới</button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-9">
            <div class="input-group mb-3">
              <input v-on:keyup.enter="searchSanPhamNSX()" v-model="key_search.abc" type="text"
                class="form-control search-control border-dark" placeholder="Nhập tên sản phẩm cần tìm">
              <button v-on:click="searchSanPhamNSX()" class="btn btn-info border-dark">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div class="col-lg-3">
            <div>
              <select class="form-control border-dark" v-model="LocTheoTrangThai">
                <option value="">Tình Trạng - Tất Cả</option>
                <option value="1">Đã đăng bán</option>
                <option value="0">Dừng đăng bán</option>
                <option value="2">Chờ duyệt</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive" style="height: 600px;">
          <table class="table align-middle mb-0 ">
            <thead class="table-light" style="position: sticky; top: 0; z-index: 1000;">
              <tr class="text-center">
                <th>#</th>
                <th>Sản Phẩm</th>
                <th>Mô Tả</th>
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
              <template v-for="(v, k) in locDataTheoTrangThai" :key="k">
                <tr class="">
                  <td class="text-center">{{ k + 1 }}</td>
                  <td>{{ v.ten_san_pham }}</td>
                  <td>
                    <i style="font-size: 25px;" v-on:click="Object.assign(mo_ta_sp, v)"
                      class="fa-solid fa-circle-info ms-2" data-bs-toggle="modal" data-bs-target="#MotaModal"></i>
                  </td>
                  <td>{{ v.ten_danh_muc }}</td>
                  <td><img v-bind:src="v.hinh_anh" class="rounded-circle" width="80" height="80"></td>
                  <td class="text-center">{{ v.so_luong_ton_kho }}</td>
                  <td class="text-center text-danger">{{ formatToVND(v.gia_ban) }}</td>
                  <td class="text-center">{{ v.don_vi_tinh }}</td>
                  <td class="text-center">
                    <div>
                      <a v-on:click="doiTinhTrang(v)" v-if="v.tinh_trang == 1" type="button"
                        class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Đã đăng bán </a>
                      <a v-on:click="doiTinhTrang(v)" v-else-if="v.tinh_trang == 0" type="button"
                        class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Dừng đăng bán</a>
                      <a v-on:click="doiTinhTrang(v)" v-else-if="v.tinh_trang == 2" type="button"
                        class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                          class="bx bxs-circle align-middle me-1"></i>Chờ duyệt </a>
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
        <div class="modal fade" id="MotaModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Mô tả sản phẩm</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <b>Mã sản phẩm: </b>{{ mo_ta_sp.ma_san_pham }}
                <hr>
                <b>Thông tin sản phẩm: </b>{{ mo_ta_sp.mo_ta }}
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
                    <h4 class="mb-0 text-info">Thêm Mới</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <label for="inputtenSanPham" class="col-sm-3 col-form-label">Tên Sản Phẩm</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham_nsx.ten_san_pham" type="text" class="form-control"
                        placeholder="Nhập tên sản phẩm" id="inputtenSanPham">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputMoTa" class="col-sm-3 col-form-label">Mô Tả</label>
                    <div class="col-sm-9">
                      <textarea v-model="create_san_pham_nsx.mo_ta" class="form-control" id="inputMoTa"
                        placeholder="Nhập mô tả" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputDanhMuc" class="col-sm-3 col-form-label">Danh Mục</label>
                    <div class="col-9">
                      <select class="form-control" v-model="create_san_pham_nsx.id_danh_muc">
                        <option disabled value="">Chọn danh mục</option>
                        <template v-for="(value, index) in list_danh_muc_sp" :key="index">
                          <option v-bind:value="value.id">{{ value.ten_danh_muc }} </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputMaLoHang" class="col-sm-3 col-form-label">Hình Ảnh</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham_nsx.hinh_anh" class="form-control" placeholder="Link ảnh"
                        id="inputMaLoHang">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNSX" class="col-sm-3 col-form-label">Số Lượng Tồn Kho</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham_nsx.so_luong_ton_kho" type="text" class="form-control"
                        placeholder="Nhập số lượng tồn kho" id="inputNSX">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNSX" class="col-sm-3 col-form-label">Giá Bán </label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham_nsx.gia_ban" type="text" class="form-control"
                        placeholder="Nhập giá bán" id="inputNSX">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNSX" class="col-sm-3 col-form-label">Đơn Vị Tính</label>
                    <div class="col-sm-9">
                      <input v-model="create_san_pham_nsx.don_vi_tinh" type="text" class="form-control"
                        placeholder="Nhập đơn vị tính" id="inputNSX">
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
                      <input v-model="update_san_pham_nsx.ten_san_pham" type="text" class="form-control" id="inputNSX">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputMaDonHang" class="col-sm-3 col-form-label">Mô Tả</label>
                    <div class="col-9">
                      <input v-model="update_san_pham_nsx.mo_ta" type="text" class="form-control" id="inputNSX">
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
      LocTheoTrangThai: "",
      list_san_pham_nsx: [],
      list_danh_muc_sp: [],
      // list_san_pham: [],
      // list_nha_san_xuat: [],
      // create_san_pham_nsx: {},
      id_can_xoa: '',
      // ghi_chu_sp: {},
      update_san_pham_nsx: {},
      key_search: {},
      mo_ta_sp: {},
      create_san_pham_nsx: {
        id_danh_muc: '',
        tinh_trang: '',
      },
    }
  },
  mounted() {
    this.loadDataSanPhamNSX();
    // this.loadDataSanPham();
    // this.loadDataNhaSanXuat();S
    this.loadDataDanhMucSp();
  },
  computed: {
    locDataTheoTrangThai() {
      if (this.LocTheoTrangThai === "") {
        return this.list_san_pham_nsx; // Hiển thị tất cả nếu chưa chọn gì
      }
      return this.list_san_pham_nsx.filter(item => String(item.tinh_trang) === String(this.LocTheoTrangThai));
    },
  },
  methods:
  {
    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
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
    // loadDataSanPham() {
    //   baseRequest
    //     .get('admin/san-pham/lay-du-lieu')
    //     .then((res) => {
    //       if (res.data.status) {
    //         this.list_san_pham = res.data.san_pham;
    //       } else {
    //         toaster.error('Thông báo<br>' + res.data.message);
    //       }
    //     });
    // },

    // loadDataNhaSanXuat() {
    //   baseRequest
    //     .get('admin/nha-san-xuat/lay-du-lieu')
    //     .then((res) => {
    //       if (res.data.status) {
    //         this.list_nha_san_xuat = res.data.nha_san_xuat;
    //       } else {
    //         toaster.error('Thông báo<br>' + res.data.message);
    //       }
    //     });
    // },

    themMoiSanPhamNSX() {
      baseRequest
        .post('user/san-pham/them-moi-san-pham-cua-nsx', this.create_san_pham_nsx)
        .then((res) => {
          if (res.data.status == true) {
            toaster.success('Thông báo<br>' + res.data.message);
            this.loadDataSanPhamNSX();
            this.create_san_pham_nsx = { ten_san_pham: "" };
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

    searchSanPhamNSX() {
      baseRequest
        .post('user/san-pham/tim-san-pham-nha-san-xuat', this.key_search)
        .then((res) => {
          if (res.data.status) {
            this.list_san_pham_nsx = res.data.san_pham;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },

    deleteSanPhamNSX() {
      baseRequest
        .delete('user/san-pham/xoa-san-pham-cua-nsx/' + this.id_can_xoa)
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
        .post('user/san-pham/update-san-pham-cua-nsx', this.update_san_pham_nsx)
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
        .post('user/san-pham/doi-tinh-trang-san-pham-cua-nsx', v)
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
