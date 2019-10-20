<template>
  <footer class="footer">
    <div class="container">
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{year}}
            <a href="#">
              Eco
              <i class="ni ni-bus-front-12"></i>us
            </a>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a href="#" class="nav-link">Đặt Vé</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Giới Thiệu</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Điêu Khoản</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Liên Hệ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>
</style>
