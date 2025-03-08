<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <div class="card border-primary border-bottom border-3 border-0">
                    <div style="max-height: 40px;" class="card-header border-primary border-bottom border-3 border-0">
                        <h5 class="text-primary"><i class="fa-regular fa-building"></i> Thêm Nguyên Liệu Sản Phẩm</h5>
                    </div>
                    <div class="card-body">
                        <label class="mb-1 mt-1">Mã Sản Phẩm </label>
                        <input v-model="create_nguyen_lieu.ma_san_pham" class="form-control" type="text">
                        <label class="mb-1 mt-1">Nguyên Liệu </label>
                        <select v-model="create_nguyen_lieu.id_nguyen_lieu" class="form-control">
                            <template v-for="(value, index) in list_danh_muc" :key="index">
                                <option v-bind:value="value.id">{{ value.ten_nguyen_lieu }}</option>
                            </template>
                        </select>
                        <label class="mb-1 mt-1">Số Lượng Nguyên Liệu</label>
                        <input v-model="create_nguyen_lieu.so_luong_nguyen_lieu" class="form-control" type="text">
                        <label class="mb-1 mt-2">Tình Trạng</label>
                        <select v-model="create_nguyen_lieu.tinh_trang" class="form-control">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                        </select>
                    </div>
                    <div class="card-footer text-end">
                        <button v-on:click="themMoiSanPham()" class="btn btn-primary">Thêm Mới</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card radius-10 border-primary border-bottom border-3 border-0">
                    <div style="max-height: 110px;" class="card-header border-primary border-bottom border-3 border-0">
                        <div class="row mb-2">
                            <div class="col-sm-6 text-start">
                                <h4 class="text-primary"><i class="fa-regular fa-building"></i> Nguyên Liệu Sản Phẩm
                                </h4>
                            </div>
                        </div>
                        <div class="input-group mb-3 ">
                            <input v-on:keyup.enter="searchNguyenlieu()" v-model="key_search.abc" type="text"
                                class="form-control search-control" placeholder="Nhập mã sản phẩm để tìm">
                            <select v-model="key_search.id_nguyen_lieu" class="form-control">
                                <option value="">Chọn nguyên liệu</option>
                                <template v-for="(value, index) in list_danh_muc" :key="index">
                                    <option v-bind:value="value.id">{{ value.ten_nguyen_lieu }}</option>
                                </template>
                            </select>
                            <button v-on:click="searchNguyenlieu()" class="btn btn-primary">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body ">
                        <div class="table-responsive" style="height: 390px;">
                            <table class="table align-middle mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">Mã Sản Phẩm</th>
                                        <th class="text-center">Nguyên Liệu </th>
                                        <th>Số Lượng Nguyên Liệu</th>
                                        <th class="text-center">Tình Trạng</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(v, k) in list_nguyen_lieu_san_pham" :key="k">
                                        <tr>
                                            <td>{{ k + 1 }}</td>
                                            <td class="text-center">{{ v.ma_san_pham }}</td>
                                            <td class="text-center">{{ v.ten_nguyen_lieu }}</td>
                                            <td class="text-center">{{ v.so_luong_nguyen_lieu }}</td>
                                            <!-- <td>{{ v.transaction_hash }}</td> -->
                                            <td class="text-center">
                                                <div>
                                                    <a v-on:click="doiTinhTrang(v)" v-if="v.tinh_trang == 1"
                                                        type="button"
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
                                                        <a v-on:click="Object.assign(update_nguyen_lieu, v)"
                                                            type="button" title="Cập Nhật" data-bs-toggle="modal"
                                                            data-bs-target="#capNhatModal" class="ms-2 bg-light-info"><i
                                                                class="fa-solid fa-arrows-rotate text-info"></i></a>
                                                        <a v-on:click="Object.assign(delete_nguyen_lieu, v)"
                                                            type="button" title="Xóa" data-bs-toggle="modal"
                                                            data-bs-target="#xoaModal" class="ms-2 bg-light-danger"><i
                                                                class="fa-solid fa-xmark text-danger"></i></a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                    <!-- capnhat -->
                                    <div class="modal fade" id="capNhatModal" tabindex="-1"
                                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog ">
                                            <div class="modal-content">
                                                <div
                                                    class="modal-header  border-primary border-bottom border-3 border-0">
                                                    <h1 class="modal-title fs-5 text-primary" id="exampleModalLabel"><i
                                                            class="fa-regular fa-building"></i> Cập nhật nguyên
                                                        liệu</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body border-primary border-bottom border-3 border-0">
                                                    <label class="mb-1 mt-1">Mã Sản Phẩm </label>
                                                    <input v-model="update_nguyen_lieu.ma_san_pham" class="form-control"
                                                        type="text">
                                                    <label class="mb-1 mt-1">Nguyên Liệu </label>
                                                    <select v-model="update_nguyen_lieu.id_nguyen_lieu"
                                                        class="form-control">
                                                        <template v-for="(value, index) in list_danh_muc" :key="index">
                                                            <option v-bind:value="value.id">{{ value.ten_nguyen_lieu }}
                                                            </option>
                                                        </template>
                                                    </select>
                                                    <label class="mb-1 mt-1">Số Lượng Nguyên Liệu</label>
                                                    <input v-model="update_nguyen_lieu.so_luong_nguyen_lieu"
                                                        class="form-control" type="text">
                                                    <label class="mb-1 mt-2">Tình Trạng</label>
                                                    <select v-model="update_nguyen_lieu.tinh_trang"
                                                        class="form-control">
                                                        <option value="1">Hoạt Động</option>
                                                        <option value="0">Tạm Dừng</option>
                                                    </select>
                                                </div>
                                                <div
                                                    class="modal-footer border-primary border-bottom border-3 border-0">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Thoát</button>
                                                    <button v-on:click="updateNguyenLieu()" type="button"
                                                        class="btn btn-primary" data-bs-dismiss="modal">Cập
                                                        nhật</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- xoa -->
                                    <div class="modal fade" id="xoaModal" tabindex="-1"
                                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div
                                                    class="modal-header  border-danger border-bottom border-3 border-0">
                                                    <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel"><i
                                                            class="fa-regular fa-building"></i> Xóa Nguyên Liệu
                                                    </h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body ">
                                                    Bạn có chắc chắn muốn xóa nguyên liệu <b>{{
                                                        delete_nguyen_lieu.ten_nguyen_lieu
                                                    }}</b> này
                                                    không?
                                                </div>
                                                <div class="modal-footer ">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Thoát</button>
                                                    <button v-on:click="accpectDel()" type="button"
                                                        class="btn btn-danger " data-bs-dismiss="modal">Xác
                                                        nhận</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </tbody>
                            </table>
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
            list_nguyen_lieu_san_pham: [],
            list_danh_muc: [],
            create_nguyen_lieu: {},
            update_nguyen_lieu: {},
            delete_nguyen_lieu: {},
            key_search: {
                abc: '',
                id_nguyen_lieu: '',
            },
        }
    },
    mounted() {
        this.loadDataNguyenLieuSanPham();
        this.loadDataDanhMucNguyenLieu();
    },
    methods: {
        loadDataNguyenLieuSanPham() {
            baseRequest
                .get('admin/nguyen-lieu-san-pham/lay-du-lieu')
                .then((res) => {
                    if (res.data.status) {
                        this.list_nguyen_lieu_san_pham = res.data.san_pham;
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        loadDataDanhMucNguyenLieu() {
            baseRequest
                .get('admin/nguyen-lieu-san-pham/lay-du-lieu-nguyen-lieu-san-pham')
                .then((res) => {
                    if (res.data.status) {
                        this.list_danh_muc = res.data.danh_muc;
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        themMoiSanPham() {
            baseRequest
                .post('admin/nguyen-lieu-san-pham/them-moi-nguyen-lieu-san-pham', this.create_nguyen_lieu)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataNguyenLieuSanPham();
                    }
                    else {
                        toaster.error(); ('Thông báo<br>' + res.data.message);
                    }
                });
        },
        updateNguyenLieu() {
            baseRequest
                .post('admin/nguyen-lieu-san-pham/cap-nhat-nguyen-lieu-san-pham', this.update_nguyen_lieu)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataNguyenLieuSanPham();
                    }
                    else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        accpectDel() {
            baseRequest
                .delete('admin/nguyen-lieu-san-pham/xoa-nguyen-lieu-san-pham/' + this.delete_nguyen_lieu.id)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataNguyenLieuSanPham();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        doiTinhTrang(v) {
            baseRequest
                .post('admin/nguyen-lieu-san-pham/doi-tinh-trang', v)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataNguyenLieuSanPham();
                    }
                    else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        searchNguyenlieu() {
            const searchData = {
                abc: this.key_search.abc,
                id_nguyen_lieu: this.key_search.id_nguyen_lieu,
            };

            console.log('Searching with:', searchData); // Kiểm tra xem dữ liệu có được gửi đúng không

            baseRequest
                .post('admin/nguyen-lieu-san-pham/tim-nguyen-lieu-san-pham', searchData)
                .then((res) => {
                    if (res.data.status) {
                        this.list_nguyen_lieu_san_pham = res.data.nguyen_lieu;
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        }
    }
}
</script>
<style>
table thead th {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
}
</style>