import axios from 'axios'
import { createToaster } from '@meforma/vue-toaster'
const toaster = createToaster({ position: 'top-right' })
export default function (to, from, next) {
  axios
    .post(
      'http://127.0.0.1:8000/api/auth/check',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    .then((res) => {
      localStorage.setItem('ho_ten', res.data.ho_ten)
      localStorage.setItem('loai_tai_khoan', res.data.loai_tai_khoan)
      if (res.status === 200) {
        next()
      } else {
        toaster.warning('Thông báo<br>Bạn cần đăng nhập hệ thống trước!')
        next('/dang-nhap')
      }
    })
    .catch(() => {
      toaster.warning('Thông báo<br>Bạn cần đăng nhập hệ thống trước!')
      next('/dang-nhap')
    })
}
