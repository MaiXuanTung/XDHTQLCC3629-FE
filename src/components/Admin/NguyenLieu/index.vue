<template>
    <div class="container">
        <div class="card radius-10">
            <div style="max-height: 110px;" class="card-header">
                <div class="row mb-2">
                    <div class="col-sm-6 text-start">
                        <h4 class="text-primary"><i class="fa-solid fa-bullseye"></i> Danh Sách Nguyên Liệu</h4>
                    </div>
                    <div class="col-sm-6 text-end">
                        <button type="button" class="btn btn-sm btn-outline-primary px-5" data-bs-toggle="modal"
                            data-bs-target="#themMoiModal"><i class="bx bx-user mr-1"></i>Thêm
                            Mới +</button>
                    </div>
                    <!-- themmoi -->
                    <div class="modal fade" id="themMoiModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 text-primary" id="exampleModalLabel"><i
                                            class="fa-solid fa-bullseye"></i> Thêm Nguyên Liệu</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body container">
                                    <div class="row ">
                                        <div class="col-lg-6">
                                            <label class="mb-2">Mã nguyên liệu </label>
                                            <input v-model="create_nguyen_lieu.ma_nguyen_lieu" type="text"
                                                class="form-control mb-2" placeholder="Nhập mã nguyên liệu ">
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="mb-2">Tên nguyên liệu </label>
                                            <input v-model="create_nguyen_lieu.ten_nguyen_lieu" type="text"
                                                class="form-control mb-2" placeholder="Nhập tên nguyên liệu ">
                                        </div>
                                    </div>
                                    <label class="mb-2">Mã lô hàng </label>
                                    <input v-model="create_nguyen_lieu.ma_lo_hang" type="text" class="form-control mb-2"
                                        placeholder="Nhập mã lô hàng ">
                                    <label class="mb-2">Mã nhà cung cấp </label>
                                    <input v-model="create_nguyen_lieu.ma_nha_cung_cap" type="text"
                                        class="form-control mb-2" placeholder="Nhập mã nhà cung cấp ">
                                    <label class="mb-2">Tình trạng</label>
                                    <select v-model="create_nguyen_lieu.tinh_trang" class="form-control">
                                        <option value="1">Hoạt Động</option>
                                        <option value="0">Tạm Dừng</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát
                                    </button>
                                    <button v-on:click="themMoiNguyenLieu()" type="button" class="btn btn-primary"
                                        data-bs-dismiss="modal">Thêm
                                        Mới</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3 ">
                    <input v-on:keyup.enter="searchNguyenlieu()" v-model="key_search.abc" type="text"
                        class="form-control search-control" placeholder="Nhập thông tin cần tìm">
                    <button v-on:click="searchNguyenlieu()" class="btn btn-primary ">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive" style="height: 390px;">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Mã Nguyên Liệu</th>
                                <th class="text-center">Tên Nguyên Liệu</th>
                                <th class="text-center">Mã Lô Hàng</th>
                                <th class="text-center">Tình Trạng</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, k) in list_nguyen_lieu" :key="k">
                                <tr>
                                    <td class="text-center">{{ k + 1 }}</td>
                                    <td class="text-center">{{ v.ma_nguyen_lieu }}</td>
                                    <td class="text-center">{{ v.ten_nguyen_lieu }}</td>
                                    <td class="text-center">{{ v.ma_lo_hang }}</td>
                                    <td class="text-center">
                                        <div>
                                            <a v-on:click="doiTinhTrang(v)" v-if="v.tinh_trang == 1" type="button"
                                                class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3"><i
                                                    class="bx bxs-circle align-middle me-1"></i>Hoạt Động</a>
                                            <a v-on:click="doiTinhTrang(v)" v-else type="button"
                                                class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i
                                                    class="bx bxs-circle align-middle me-1"></i>Tạm Dừng</a>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div class="d-flex order-actions text-center">
                                            <div class="d-flex order-actions ">
                                                <a v-on:click="Object.assign(update_nguyen_lieu, v)" type="button"
                                                    title="Cập Nhật" data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal1" class="ms-2 bg-light-info"><i
                                                        class="fa-solid fa-arrows-rotate text-info"></i></a>
                                                <a v-on:click="Object.assign(delete_nguyen_lieu, v)" type="button"
                                                    title="Xóa" data-bs-toggle="modal" data-bs-target="#xoaModal"
                                                    class="ms-2 bg-light-danger"><i
                                                        class="fa-solid fa-xmark text-danger"></i></a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <!-- capnhat -->
                    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 text-primary" id="exampleModalLabel"><i
                                            class="fa-solid fa-bullseye"></i>
                                        Cập nhật
                                        nguyên
                                        liệu</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row ">
                                        <div class="col-lg-6">
                                            <label class="mb-2">Mã nguyên liệu </label>
                                            <input v-model="update_nguyen_lieu.ma_nguyen_lieu" type="text"
                                                class="form-control mb-2" placeholder="Nhập mã nguyên liệu ">
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="mb-2">Tên nguyên liệu </label>
                                            <input v-model="update_nguyen_lieu.ten_nguyen_lieu" type="text"
                                                class="form-control mb-2" placeholder="Nhập tên nguyên liệu ">
                                        </div>
                                    </div>
                                    <label class="mb-2">Mã lô hàng </label>
                                    <input v-model="update_nguyen_lieu.ma_lo_hang" type="text" class="form-control mb-2"
                                        placeholder="Nhập mã lô hàng ">
                                    <label class="mb-2">Mã nhà cung cấp </label>
                                    <input v-model="update_nguyen_lieu.ma_nha_cung_cap" type="text"
                                        class="form-control mb-2" placeholder="Nhập mã nhà cung cấp ">
                                    <label class="mb-2">Tình trạng</label>
                                    <select v-model="update_nguyen_lieu.tinh_trang" class="form-control">
                                        <option value="1">Hoạt Động</option>
                                        <option value="0">Tạm Dừng</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Thoát</button>
                                    <button v-on:click="updateNguyenLieu()" type="button" class="btn btn-primary"
                                        data-bs-dismiss="modal">Xác
                                        nhận</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- xoa -->
                    <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel"><i
                                            class="fa-solid fa-bullseye"></i> Xóa
                                        Nguyên Liệu</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Bạn có chắc chắn muốn xóa nguyên liệu <b>{{ delete_nguyen_lieu.ten_nguyen_lieu
                                    }}</b> này
                                    không?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát
                                    </button>
                                    <button v-on:click="accpectDel()" type="button" data-bs-dismiss="modal"
                                        class="btn btn-danger">Xác
                                        nhận</button>
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
            list_nguyen_lieu: [],
            create_nguyen_lieu: {},
            update_nguyen_lieu: {},
            delete_nguyen_lieu: {},
            key_search: {},
        }
    },
    mounted() {
        this.loadDataNguyenLieu();
    },
    methods: {
        loadDataNguyenLieu() {
            baseRequest
                .get('admin/nguyen-lieu/lay-du-lieu')
                .then((res) => {
                    if (res.data.status) {
                        this.list_nguyen_lieu = res.data.nguyen_lieu;
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        themMoiNguyenLieu() {
            baseRequest
                .post('admin/nguyen-lieu/them-moi-nguyen-lieu', this.create_nguyen_lieu)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataNguyenLieu();
                    }
                    else {
                        toaster.error(); ('Thông báo<br>' + res.data.message);
                    }
                });
        },
        doiTinhTrang(v) {
            baseRequest
                .post('admin/nguyen-lieu/doi-tinh-trang', v)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataNguyenLieu();
                    }
                    else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        updateNguyenLieu() {
            baseRequest
                .post('admin/nguyen-lieu/cap-nhat-nguyen-lieu', this.update_nguyen_lieu)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataNguyenLieu();
                    }
                    else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        accpectDel() {
            baseRequest
                .delete('admin/nguyen-lieu/xoa-nguyen-lieu/' + this.delete_nguyen_lieu.id)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataNguyenLieu();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        searchNguyenlieu() {
            baseRequest
                .post('admin/nguyen-lieu/tim-nguyen-lieu', this.key_search)
                .then((res) => {
                    if (res.data.status) {
                        this.list_nguyen_lieu = res.data.nguyen_lieu;
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
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
