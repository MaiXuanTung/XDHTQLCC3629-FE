<template>

  <body class="bg-login  pace-done">
    <div class="pace  pace-inactive">
      <div class="pace-progress" data-progress-text="100%" data-progress="99"
        style="transform: translate3d(100%, 0px, 0px);">
        <div class="pace-progress-inner"></div>
      </div>
      <div class="pace-activity"></div>
    </div>
    <div class="wrapper">
      <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
        <div class="container-fluid">
          <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            <div class="col mx-auto">
              <div class="mb-4 text-center">
                <img src="../../../layout/image/logo-admin.png" width="180" alt="">
              </div>
              <div class="card border">
                <div class="card-body">
                  <div class="border p-4 rounded">
                    <div class="text-center">
                      <h3 class="">Đăng Nhập</h3>
                    </div>
                    <div class="login-separater text-center mb-4"> <span>ĐĂNG NHẬP BẰNG EMAIL</span>
                      <hr />
                    </div>
                    <div class="form-body">
                      <form class="row g-3">
                        <div class="col-12">
                          <label for="inputEmailAddress" class="form-label">Email</label>
                          <input v-model="dang_nhap.email" type="email" class="form-control" id="inputEmailAddress"
                            placeholder="Email Address">
                        </div>
                        <div class="col-12">
                          <label for="inputChoosePassword" class="form-label">Mật Khẩu</label>
                          <input v-on:keyup.enter="dangNhap()" v-model="dang_nhap.password" type="password"
                            class="form-control" id="inputEmailAddress" placeholder="Enter Password">
                        </div>
                        <div class="col-12">
                          <div class="d-grid">
                            <button @:click="dangNhap()" type="button" class="btn btn-primary"><i
                                class="bx bxs-lock-open"></i>Đăng Nhập</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
  data() {
    return {
      dang_nhap: {},
    }
  },
  mounted() {
    this.checkToken();
  },
  methods: {
    async dangNhap() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/auth-admin/login', this.dang_nhap);

        if (res.data.status) {
          toaster.success('Thông báo<br>' + res.data.message);
          const arr = res.data.token.split("|");
          localStorage.setItem('token', arr[1]);
          await this.checkToken(); // Đợi checkToken hoàn tất trước khi chuyển trang
        } else {
          toaster.error('Thông báo<br>' + res.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
      }
    },

    async checkToken() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/auth-admin/check', {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (res.status === 200) {
          localStorage.setItem('ho_ten', res.data.ho_ten);
          localStorage.setItem('loai_tai_khoan', res.data.loai_tai_khoan);
          localStorage.setItem('so_dien_thoai', res.data.so_dien_thoai);
          localStorage.setItem('dia_chi', res.data.dia_chi);
          localStorage.setItem('user_id', res.data.user_id);
          switch (res.data.loai_tai_khoan) {
            case 'Nhân Viên':
              this.$router.push('/admin/nhan-vien');
              break;
            case 'Đại Lý':
              this.$router.push('/home-page');
              break;
            case 'Nhà Sản Xuất':
              this.$router.push('/admin/san-pham-nsx');
              break;
            default:
              toaster.error('Loại tài khoản không hợp lệ!');
          }
        } else if (res.status === 401) {
          toaster.error('Thông báo<br>' + res.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra token:", error);
      }
    }
  },
}
</script>
<style></style>