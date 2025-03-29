<template>
  <div>
    <div class="page-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3"><a href="/home-page">Trang Chủ</a></div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Chi Tiết Sản Phẩm</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--end breadcrumb-->
      <div class="card">
        <div class="row g-0">
          <div class="col-md-4 border-end">
            <img :src="san_pham.hinh_anh" class="img-fluid" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title">{{ san_pham.ten_san_pham }}</h4>
              <div class="d-flex gap-3 py-3">
                <div class="cursor-pointer">
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-secondary"></i>
                </div>
                <div>142 reviews</div>
                <div class="text-success"><i class="bx bxs-cart-alt align-middle"></i> 134 orders</div>
              </div>
              <div class="mb-3">
                <span class="price h4">{{ san_pham.gia_ban }} đ</span>
              </div>
              <p class="card-text fs-6">{{ san_pham.mo_ta }}</p>
              <dl class="row">
                <dt class="col-sm-3">Vận chuyển</dt>
                <dd class="col-sm-9">Toàn quốc</dd>

                <dt class="col-sm-3">Số lượng còn</dt>
                <dd class="col-sm-9">{{ san_pham.so_luong_ton_kho }}</dd>
              </dl>
              <hr>
              <div class="row row-cols-auto row-cols-1 row-cols-md-3 align-items-center">
                <div class="col">
                  <label class="form-label">Số lượng</label>
                  <div class="input-group input-spinner">
                    <button class="btn btn-white" type="button" id="button-plus"> - </button>
                    <input type="text" class="form-control" value="1">
                    <button class="btn btn-white" type="button" id="button-minus"> + </button>
                  </div>
                </div>
              </div>
              <div class="d-flex gap-3 mt-3">
                <a href="#" class="btn btn-primary">Mua ngay</a>
                <a href="#" class="btn btn-outline-primary"><span class="text">Thêm vào giỏ hàng</span> <i
                    class="bx bxs-cart-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="card-body">
          <ul class="nav nav-tabs nav-primary mb-0" role="tablist">
            <li class="nav-item" role="presentation">
              <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab" aria-selected="true">
                <div class="d-flex align-items-center">
                  <div class="tab-icon"><i class="bx bx-comment-detail font-18 me-1"></i>
                  </div>
                  <div class="tab-title"> Mô tả sản phẩm </div>
                </div>
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" data-bs-toggle="tab" href="#primaryprofile" role="tab" aria-selected="false"
                tabindex="-1">
                <div class="d-flex align-items-center">
                  <div class="tab-icon"><i class="bx bx-bookmark-alt font-18 me-1"></i>
                  </div>
                  <div class="tab-title">Tags</div>
                </div>
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" data-bs-toggle="tab" href="#primarycontact" role="tab" aria-selected="false"
                tabindex="-1">
                <div class="d-flex align-items-center">
                  <div class="tab-icon"><i class="bx bx-star font-18 me-1"></i>
                  </div>
                  <div class="tab-title">Đánh Giá</div>
                </div>
              </a>
            </li>
          </ul>
          <div class="tab-content pt-3">
            <div class="tab-pane fade show active" id="primaryhome" role="tabpanel">
              <p>{{ san_pham.mo_ta }}</p>
              <p>123</p>
            </div>
            <div class="tab-pane fade" id="primaryprofile" role="tabpanel">
              <p>123</p>
            </div>
            <div class="tab-pane fade" id="primarycontact" role="tabpanel">
              <p>1234</p>
            </div>
          </div>
        </div>
      </div>
      <h6 class="text-uppercase mb-0">SẢN PHẨM LIÊN QUAN</h6>
      <hr>
      <div class="row row-cols-1 row-cols-lg-3">
        <div class="col" v-for="(v, k) in relatedProducts" :key="k">
          <div class="card">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="v.hinh_anh" class="img-fluid" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body-detail">
                  <h6 class="card-title">{{ v.ten_san_pham }}</h6>
                  <div class="cursor-pointer my-2">
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-secondary"></i>
                  </div>
                  <div class="clearfix">
                    <p class="mb-0 float-start fw-bold">
                      <span class="me-2 text-decoration-line-through text-secondary">${{ v.gia_cu }}</span>
                      <span>${{ v.gia_ban }}</span>
                    </p>
                  </div>
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
      san_pham: {},
      list_san_pham: []
    }
  },
  mounted() {
    this.loadDataChiTietSanPham();
    this.loadDataSanPham();
  },
  computed: {
    relatedProducts() {
      return this.list_san_pham
        .filter(v => v.nsx_id === this.san_pham.nha_san_xuat_id) // Lọc theo nhà sản xuất
        .sort(() => 0.5 - Math.random()) // Xáo trộn ngẫu nhiên danh sách
        .slice(0, 3); // Chỉ lấy 3 sản phẩm
    }
  },
  methods: {
    loadDataChiTietSanPham() {
      var url = window.location.href;
      var arr = url.split('/');
      var id = {
        id: arr[arr.length - 1]
      }
      baseRequest
        .post('admin/san-pham/lay-du-lieu-san-pham/data', id)
        .then((res) => {
          if (res.data.status) {
            this.san_pham = res.data.chi_tiet_san_pham;
            console.log(this.san_pham);
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
            console.log(this.list_san_pham)
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
  },
}
</script>
<style>
.card {
  height: 100%;
  /* Đảm bảo tất cả card có chiều cao bằng nhau */
  display: flex;
  flex-direction: column;
}

.card-detail img {
  width: 100%;
  /* Đảm bảo ảnh full chiều ngang */
  height: 150px;
  /* Giữ ảnh đồng nhất */
  object-fit: cover;
  /* Cắt ảnh để vừa khung mà không méo */
}

.card-body-detail {
  flex-grow: 1;
  /* Đảm bảo nội dung card mở rộng để các card đều nhau */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Dàn đều nội dung */
}
</style>