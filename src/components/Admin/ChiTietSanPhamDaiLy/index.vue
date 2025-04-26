<template>
  <div>
    <div class="page-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3"><a href="/home-page">Trang Chủ</a></div>
        <div class="ps-2">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"></a>
              </li>
              <li class="breadcrumb-item active text-primary" aria-current="page">Chi Tiết Sản Phẩm</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--end breadcrumb-->
      <div class="card">
        <div class="row g-0">
          <div class="col-md-3 border-end d-flex align-items-center p-3">
            <img :src="san_pham.hinh_anh" class="img-fluid rounded shadow-sm img-hover-zoom" alt="...">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h4 class="card-title text-primary">{{ san_pham.ten_san_pham }}</h4>
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
                <span class="price h4 text-danger">{{ formatToVND(san_pham.gia_ban) }}</span>
              </div>
              <dl class="row">
                <dt class="col-sm-3">Vận chuyển</dt>
                <dd class="col-sm-9">Toàn quốc</dd>

                <dt class="col-sm-3">Số lượng còn</dt>
                <dd class="col-sm-9">{{ san_pham.so_luong_ton_kho }}</dd>
              </dl>
              <hr>
              <div class="row align-items-center">
                <div class="d-flex flex-wrap align-items-center gap-2 mt-3">
                  <label class="form-label mb-0">Số lượng:</label>

                  <input type="number" class="form-control text-center" style="width: 80px" v-model.number="so_luong"
                    @input="validateQuantity">

                  <a href="#" v-on:click="createSanPhamVaoGioHang()"
                    class="btn btn-outline-primary d-flex align-items-center">
                    <span class="text">Thêm vào giỏ hàng</span> <i class="bx bxs-cart-alt ms-1"></i>
                  </a>

                  <a href="#" class="btn btn-primary">Mua ngay</a>
                </div>

                <!-- <div class="col-auto align-items-center">
                  <label class="form-label mb-0 me-2">Số lượng:</label>
                  <input type="number" class="form-control text-center" style="width: 80px"
                    v-model.number="so_luong" @input="validateQuantity">
                </div>
                <div class="col-auto ">
                  <div class="d-flex gap-2">
                    <a href="#" v-on:click="createSanPhamVaoGioHang()" class="btn btn-outline-primary d-flex align-items-center"><span
                        class="text">Thêm vào giỏ hàng</span> <i class="bx bxs-cart-alt ms-1"></i></a>
                    <a href="#" class="btn btn-primary">Mua ngay</a>
                  </div>
                </div> -->
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
          </ul>
          <div class="tab-content pt-3">
            <div class="tab-pane fade show active" id="primaryhome" role="tabpanel">
              <p>{{ san_pham.mo_ta }}</p>
            </div>
          </div>
        </div>
      </div>
      <h4 class="text-uppercase mb-0 text-center text-primary ">SẢN PHẨM LIÊN QUAN</h4>
      
      <div class="row row-cols-1 row-cols-lg-3 mt-3">
        <div class="col mt-2" v-for="(v, k) in relatedProducts" :key="k">
          <div class="card">
            <a v-bind:href="'/chi-tiet-san-pham/' + v.id" style="color: black;">
              <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center p-3">
                  <img :src="v.hinh_anh" class="img-fluid cardimg rounded " style="max-height: 80px;" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body-detail">
                    <h6 class="card-title mt-2 ms-1">{{ v.ten_san_pham }}</h6>
                    <div class="cursor-pointer my-2 ms-1">
                      <i class="bx bxs-star text-warning"></i>
                      <i class="bx bxs-star text-warning"></i>
                      <i class="bx bxs-star text-warning"></i>
                      <i class="bx bxs-star text-warning"></i>
                      <i class="bx bxs-star text-secondary"></i>
                    </div>
                    <div class="clearfix">
                      <p class="mb-0 float-start fw-bold text-danger ms-1">
                        <span>{{ formatToVND(v.gia_ban) }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {

}
</script>

<style>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-detail img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-body-detail {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.img-hover-zoom {
  transition: transform 0.3s ease-in-out;
}

.img-hover-zoom:hover {
  transform: scale(1.1);
}
.page-breadcrumb {
    background: #e3f2fd; /* Màu xanh nhạt */
    padding: 10px;
    border-radius: 5px;
}
.cardimg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Giữ tỉ lệ ảnh, không méo */
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

</style>

