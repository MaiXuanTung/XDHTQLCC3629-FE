<template>
  <div class="row">
    <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../../layout/image/Light Blue Creative Logistic Distribution Presentation (1899 x 500 px).png"
            class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../../../layout/image/logo-big.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../../../layout/image/Navy Yellow Professional Delivery Service Presentation.png"
            class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="container">
    <div class="row mt-5">
      <div class="col-lg-12">
        <router-link to="/danh-sach-san-pham">
          <button type="button" class="btn btn-info form-control px-5 bg-gradient-scooter text-dark ms-auto">
            <h2 class="mt-2 text-white">TÌM KIẾM SẢN PHẨM BẠN MONG MUỐN<i
                class="fa-solid fa-magnifying-glass ms-2 py-3"></i>
            </h2>
          </button>
        </router-link>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <h2>DANH SÁCH SẢN PHẨM</h2>
    <hr>
    <div class="row">
      <template v-for="(v, k) in danh_sach_san_pham">
        <div class="col-sm-4 mb-2" v-if="k < 6" :key="k">
          <div class="card card-home-page h-100">
            <a v-bind:href="'/chi-tiet-san-pham/' + v.id" style="color: black;">
              <div class="row g-0 h-100">
                <div class="col-md-4">
                  <img :src="v.hinh_anh" alt="Hình ảnh sản phẩm" class="card-img">
                </div>
                <div class="col-md-8 d-flex flex-column">
                  <div class="card-body flex-grow-1">
                    <h5 class="card-title mb-4">{{ v.ten_san_pham }}</h5>
                    <p class="card-text text-danger">Giá: <b>{{ formatToVND(v.gia_ban) }}</b></p>
                    <p class="card-text">Đơn vị tính: <b>{{ v.don_vi_tinh }}</b></p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </template>
    </div>
    <div class="row text-end mb-4">
      <div class="col">
        <router-link to="/danh-sach-san-pham">
          <button type="button" class="btn btn-outline-primary px-5">Xem tất cả <i
              class="fa-solid fa-arrow-right ms-1"></i></button>
        </router-link>
      </div>
    </div>
    <hr>
    <h2>VỀ CHÚNG TÔI</h2>
    <div class="row">
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <img src="../../../layout/image/Tung.jpg" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
              <div class="mt-3">
                <h4>MAI XUÂN TÙNG</h4>
                <p class="text-secondary mb-1">Full Stack Developer</p>
                <p class="text-muted font-size-sm">Đà Nẵng, Việt Nam</p>
                <button class="btn btn-primary me-1">Follow</button>
                <button class="btn btn-outline-primary">Message</button>
              </div>
            </div>
            <hr class="my-4">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-github me-2 icon-inline">
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                    </path>
                  </svg>
                  <a href="https://github.com/MaiXuanTung" target="_blank" rel="noopener noreferrer"
                    style="color: black;">Github</a>
                </h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-facebook me-2 icon-inline text-primary">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <a style="color: black;" href="https://www.facebook.com/xtung.mai.3" target="_blank">Facebook</a>
                </h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-twitter me-2 icon-inline text-info">
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                    </path>
                  </svg>Twitter</h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-instagram me-2 icon-inline text-danger">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>Instagram</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <img src="../../../layout/image/Thien.jpg" alt="Admin" class="rounded-circle p-1 bg-warning" width="90"
                height="110">
              <div class="mt-3">
                <h4>NGUYỄN HỮU THIÊN</h4>
                <p class="text-secondary mb-1">Front-end Developer</p>
                <p class="text-muted font-size-sm">Đà Nẵng, Việt Nam</p>
                <button class="btn btn-warning me-1">Follow</button>
                <button class="btn btn-outline-warning">Message</button>
              </div>
            </div>
            <hr class="my-4">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-github me-2 icon-inline">
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                    </path>
                  </svg>
                  <a href="https://github.com/thiendev12345" target="_blank" rel="noopener noreferrer"
                    style="color: black;">Github</a>
                </h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-facebook me-2 icon-inline text-primary">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <a style="color: black;" href="https://www.facebook.com/nguyen.huu.thien.379908"
                    target="_blank">Facebook</a>
                </h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-twitter me-2 icon-inline text-info">
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                    </path>
                  </svg>Twitter</h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-instagram me-2 icon-inline text-danger">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>Instagram</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <img src="../../../layout/image/Hung.jpg" alt="Admin" class="rounded-circle p-1 bg-success" width="90"
                height="110">
              <div class="mt-3">
                <h4>VĂN QUÝ HƯNG</h4>
                <p class="text-secondary mb-1">Front-end Developer</p>
                <p class="text-muted font-size-sm">Đà Nẵng, Việt Nam</p>
                <button class="btn btn-success me-1">Follow</button>
                <button class="btn btn-outline-success">Message</button>
              </div>
            </div>
            <hr class="my-4">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-github me-2 icon-inline">
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                    </path>
                  </svg>
                  <a href="https://github.com/Hungquy168" target="_blank" rel="noopener noreferrer"
                    style="color: black;">Github</a>
                </h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-facebook me-2 icon-inline text-primary">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <a style="color: black;" href="https://www.facebook.com/hung.quy.9659" target="_blank">Facebook</a>
                </h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-twitter me-2 icon-inline text-info">
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                    </path>
                  </svg>Twitter</h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-instagram me-2 icon-inline text-danger">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>Instagram</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <img src="../../../layout/image/XuanVl.jpg" alt="Admin" class="rounded-circle p-1 bg-secondary"
                width="110">
              <div class="mt-3">
                <h4>LÊ ANH XUÂN</h4>
                <p class="text-secondary mb-1">Full Stack Developer</p>
                <p class="text-muted font-size-sm">Đà Nẵng, Việt Nam</p>
                <button class="btn btn-secondary me-1">Follow</button>
                <button class="btn btn-outline-secondary">Message</button>
              </div>
            </div>
            <hr class="my-4">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-github me-2 icon-inline">
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                    </path>
                  </svg>
                  <a href="https://github.com/xuan2602" target="_blank" rel="noopener noreferrer"
                    style="color: black;">Github</a>
                </h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-facebook me-2 icon-inline text-primary">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <a style="color: black;" href="https://www.facebook.com/llexun" target="_blank">Facebook</a>
                </h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-twitter me-2 icon-inline text-info">
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                    </path>
                  </svg>Twitter</h6>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-instagram me-2 icon-inline text-danger">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>Instagram</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import baseRequest from "../../../core/baseRequest";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
  data() {
    return {
      list_san_pham: [],
    }
  },
  mounted() {
    this.loadDataSanPham();
  },
  computed: {
    danh_sach_san_pham() {
      // Chuyển list_san_pham thành mảng
      return Object.values(this.list_san_pham).flat();
    }
  },
  methods: {
    loadDataSanPham() {
      baseRequest
        .get('user/san-pham/get-data-by-user')
        .then((res) => {
          if (res.data.status) {
            this.list_san_pham = res.data.data;
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
    formatToVND(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
  },
}
</script>
<style scoped>
.card-home-page {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-home-page:hover {
  transform: translateY(-10px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}
</style>