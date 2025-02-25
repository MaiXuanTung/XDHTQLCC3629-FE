<template>
  <div class="container">
    <div class="card radius-10">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div>
            <h4 class="mb-3">Danh Sách Nhà Sản Xuất</h4>
          </div>
        </div>
        <div class="table-responsive" style="height: 430px;">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Tên Công Ty</th>
                <th>Loại Đối Tác</th>
                <th>Địa Chỉ</th>
                <th>Số Điện Thoại</th>
                <!-- <th>Ngày Tạo</th>
                <th>Ngày Cập Nhật</th> -->
                <th>Tình Trạng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, k) in list_nha_san_xuat">
                <tr>
                  <td>{{ v.id }}</td>
                  <td>{{ v.ten_cong_ty }}</td>
                  <td>{{ v.loai_doi_tac }}</td>
                  <td>{{ v.dia_chi }}</td>
                  <td>{{ v.so_dien_thoai }}</td>
                  <!-- <td>{{ v.ngay_tao }}</td>
                  <td>{{ v.ngay_cap_nhat }}</td> -->
                  <td>
                    <div v-if="v.tinh_trang == 1"
                      class="badge rounded-pill text-success bg-light-info p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Hoạt Động
                    </div>
                    <div v-else class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3">
                      <i class="bx bxs-circle align-middle me-1"></i>Tạm Dừng
                    </div>
                  </td>
                  <td>
                    <div class="d-flex order-actions">
                      <div class="d-flex order-actions">
                        <a type="button" title="Cập Nhật" class="ms-2 bg-light-info"><i
                            class="fa-solid fa-arrows-rotate text-info"></i></a>
                        <a type="button" title="Xóa" data-bs-toggle="modal" data-bs-target="#huyModal"
                          class="ms-2 bg-light-danger"><i class="fa-solid fa-xmark text-danger"></i></a>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="modal fade" id="huyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body d-flex">
                <div class="alert border-0 border-start border-5 border-danger alert-dismissible fade show py-2">
                  <div class="d-flex align-items-center">
                    <div class="font-35 text-danger"><i class="bx bxs-message-square-x"></i>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-0 text-danger">Thông Báo</h6>
                      <div>Bạn chắc chắn muốn hủy hóa đơn này?</div>
                    </div>
                  </div>
                </div>
              </div>
              <button data-bs-dismiss="modal" class="btn btn-border bg-light-danger align-middle">
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
      list_nha_san_xuat: []
    }
  },
  mounted() {
    this.loadDataNhaSanXuat();
  },
  methods: {
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
  },
}
</script>
<style></style>