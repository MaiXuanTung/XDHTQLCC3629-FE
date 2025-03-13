<template>
    <div class="container">
        <div class="card radius-10">
            <div style="max-height: 110px;" class="card-header">
                <div class="row mb-2">
                    <div class="col-sm-6 text-start">
                        <h4 class="text-dark">Danh Sách Chi Tiết Sản Phẩm</h4>
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
                <div class="table-responsive" style="height: 600px;">
                    <table  class="table align-middle mb-0 ">
                        <thead class="table-light" style="position: sticky; top: 0; z-index: 1000;">
                            <tr>
                                <th>#</th>
                                <th>Mã Đơn Hàng</th>
                                <th>Sản Phẩm</th>
                                <th>Ghi Chú</th>
                                <th>Đơn Giá</th>
                                <th>Số Lượng</th>
                                <th>Đơn Vị Tính</th>
                                <th>Tình Trạng</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, k) in list_chi_tiet" :key="k">
                                <tr class="">
                                    <td>{{ k + 1 }}</td>
                                    <td>{{ v.ma_don_hang }}</td>
                                    <td>{{ v.ten_san_pham }}</td>
                                    <td>
                                        <i style="font-size: 25px;" v-on:click="Object.assign(ghi_chu_sp,v)" class="fa-solid fa-circle-info ms-2" data-bs-toggle="modal"
                                            data-bs-target="#MotaModal"></i>
                                    </td>
                                    <td>{{ v.don_gia }}</td>
                                    <td>{{ v.so_luong }}</td>
                                    <td>{{ v.don_vi_tinh }}</td>
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
                                                <a v-on:click="Object.assign(update_chi_tiet, v)" type="button"
                                                    title="Cập Nhật" data-bs-toggle="modal"
                                                    data-bs-target="#capNhatModal" class="ms-2 bg-light-info"><i
                                                        class="fa-solid fa-arrows-rotate text-info"></i></a>
                                                <a v-on:click="id_can_xoa = v.id" type="button" title="Xóa"
                                                    data-bs-toggle="modal" data-bs-target="#xoaModal"
                                                    class="ms-2 bg-light-danger"><i
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
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {{ ghi_chu_sp.ghi_chu }}
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
                                        <h4 class="mb-0 text-info">Thêm Mới Chi Tiết</h4>
                                    </div>
                                    <hr>
                                    <div class="row mb-3">
                                        <label for="inputMaDonHang" class="col-sm-3 col-form-label">Mã Đơn Hàng</label>
                                        <div class="col-sm-9">
                                            <input v-model="create_chi_tiet.ma_don_hang" type="text"
                                                class="form-control" id="inputMaDonHang">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputMaSanPham" class="col-sm-3 form-label">Sản Phẩm</label>
                                        <div class="col-9">
                                            <select v-model="create_chi_tiet.ma_san_pham" class="form-control">
                                                <template v-for="(value, index) in list_san_pham" :key="index">
                                                    <option v-bind:value="value.id">{{ value.ten_san_pham }} </option>
                                                </template>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputGhiChu" class="col-sm-3 col-form-label">Ghi Chú</label>
                                        <div class="col-sm-9">
                                            <input v-model="create_chi_tiet.ghi_chu" type="text"
                                                class="form-control" id="inputGhiChu">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputDonGia" class="col-sm-3 col-form-label">Đơn Giá</label>
                                        <div class="col-sm-9">
                                            <input v-model="create_chi_tiet.don_gia" class="form-control"
                                                id="inputDonGia">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputSoLuong" class="col-sm-3 col-form-label">Số Lượng</label>
                                        <div class="col-sm-9">
                                            <input v-model="create_chi_tiet.so_luong" type="text" class="form-control"
                                                id="inputSoLuong">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputDVT" class="col-sm-3 col-form-label">Đơn Vị Tính</label>
                                        <div class="col-sm-9">
                                            <input v-model="create_chi_tiet.don_vi_tinh" type="text" class="form-control"
                                                id="inputDVT">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="col-sm-3 col-form-label">Tình Trạng</label>
                                        <div class="col-sm-9">
                                            <select v-model="create_chi_tiet.tinh_trang" class="form-control">
                                                <option value="1">Hoạt Động</option>
                                                <option value="0">Tạm Dừng</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button v-on:click="themMoiChiTiet()" type="button" class="btn btn-primary"
                                    data-bs-dismiss="modal">Thêm
                                    mới</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="capNhatModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="card-body">
                                <div class="border p-4 rounded">
                                    <div class="card-title d-flex align-items-center">
                                        <h4 class="mb-0 text-info">Cập Nhật Thông Tin</h4>
                                    </div>
                                    <hr>
                                    <div class="row mb-3">
                                        <label for="inputMaDonHang" class="col-sm-3 col-form-label">Mã Đơn Hàng</label>
                                        <div class="col-sm-9">
                                            <input v-model="update_chi_tiet.ma_don_hang" type="text"
                                                class="form-control" id="inputMaDonHang">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputMaSanPham" class="col-sm-3 form-label">Mã Sản Phẩm</label>
                                        <div class="col-9">
                                            <select v-model="update_chi_tiet.ma_san_pham" class="form-control">
                                                <template v-for="(value, index) in list_san_pham" :key="index">
                                                    <option v-bind:value="value.id">{{ value.ten_san_pham }} </option>
                                                </template>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputGhiChu" class="col-sm-3 col-form-label">Ghi Chú</label>
                                        <div class="col-sm-9">
                                            <input v-model="update_chi_tiet.ghi_chu" class="form-control" id="inputGhiChu">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputDonGia" class="col-sm-3 col-form-label">Đơn Giá</label>
                                        <div class="col-sm-9">
                                            <input v-model="update_chi_tiet.don_gia" type="text" class="form-control"
                                                id="inputDonGia">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputSoLuong" class="col-sm-3 col-form-label">Số Lượng</label>
                                        <div class="col-sm-9">
                                            <input v-model="update_chi_tiet.so_luong" type="text" class="form-control"
                                                id="inputSoLuong">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputDVT" class="col-sm-3 col-form-label">Đơn Vị Tính</label>
                                        <div class="col-sm-9">
                                            <input v-model="update_chi_tiet.don_vi_tinh" type="text" class="form-control"
                                                id="inputDVT">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="col-sm-3 col-form-label">Tình Trạng</label>
                                        <div class="col-sm-9">
                                            <select v-model="update_chi_tiet.tinh_trang" class="form-control">
                                                <option value="1">Hoạt Động</option>
                                                <option value="0">Tạm Dừng</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button v-on:click="updateChiTiet()" type="button" class="btn btn-primary"
                                    data-bs-dismiss="modal">Cập
                                    Nhật</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body d-flex">
                                <div
                                    class="alert border-0 border-start border-5 border-danger alert-dismissible fade show py-2">
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
                            <button v-on:click="deleteChiTiet()" data-bs-dismiss="modal"
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
            list_chi_tiet: [],
            list_san_pham: [],
            create_chi_tiet: {},
            id_can_xoa: '',
            ghi_chu_sp: {},
            update_chi_tiet: {},
            key_search: {},
        }
    },
    mounted() {
        this.loadDataChiTiet();
        this.loadDataSanPham();
    },
    methods:
    {
        loadDataChiTiet() {
            baseRequest
                .get('admin/chi-tiet-san-pham/lay-du-lieu')
                .then((res) => {
                    if (res.data.status) {
                        this.list_chi_tiet = res.data.chi_tiet_san_pham;
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

        themMoiChiTiet() {
            baseRequest
                .post('admin/chi-tiet-san-pham/them-moi-chi-tiet-san-pham', this.create_chi_tiet)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataChiTiet();
                        this.create_chi_tiet = { ma_don_hang: "", ma_san_pham: "", ghi_chu: "" };
                    }
                    else {
                        toaster.error(); ('Thông báo<br>' + res.data.message);
                    }
                });
        },

        searchChiTiet() {
            baseRequest
                .post('admin/chi-tiet-san-pham/tim-chi-tiet-san-pham', this.key_search)
                .then((res) => {
                    if (res.data.status) {
                        this.list_chi_tiet = res.data.chi_tiet_san_pham;
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },

        deleteChiTiet() {
            baseRequest
                .delete('admin/chi-tiet-san-pham/xoa-chi-tiet-san-pham/' + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataChiTiet();
                    }
                    else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },

        updateChiTiet() {
            baseRequest
                .post('admin/chi-tiet-san-pham/cap-nhat-chi-tiet-san-pham', this.update_chi_tiet)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataChiTiet();
                    }
                    else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },

        doiTinhTrang(v) {
            baseRequest
                .post('admin/chi-tiet-san-pham/doi-tinh-trang-chi-tiet-san-pham', v)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataChiTiet();
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
