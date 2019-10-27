<template>
  <section class="section-hero section-shaped my-0">
    <div class="shape shape-style-1 shape-primary">
      <span class="span-150"></span>
      <span class="span-50"></span>
      <span class="span-50"></span>
      <span class="span-75"></span>
      <span class="span-100"></span>
      <span class="span-75"></span>
      <span class="span-50"></span>
      <span class="span-100"></span>
      <span class="span-50"></span>
      <span class="span-100"></span>
    </div>
    <div class="container shape-container d-flex align-items-center">
      <div class="col px-0">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-7 text-center pt-lg">
            <span class="display-1 text-white">
              Eco
              <i class="ni ni-bus-front-12"></i>us
            </span>
            <p class="lead text-white mt-4 mb-5">Nhanh Chóng - Tiện Lợi - An Toàn - Tiết Kiệm</p>
            <div class="btn-wrapper">
              <base-button
                class="mb-3 mb-sm-0"
                type="info"
                icon="ni ni-square-pin"
                @click="scrollToSection('booking')"
              >Đặt Vé</base-button>
              <base-button
                class="mb-3 mb-sm-0"
                type="white"
                icon="fa fa-search"
                @click="scrollToSection('searching')"
              >Tra thông tin vé</base-button>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-around stars-and-coded">
          <div class="col-sm-4">
            <span class="text-white alpha-7 ml-3">Hotline: +0123456789</span>
          </div>
          <div class="col-sm-4 mt-4 mt-sm-0 text-right">
            <span class="text-white alpha-7">12 Nguyễn Văn Bảo, Phường 4, Gò Vấp</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  methods: {
    scrollToSection(section) {
      this.$emit("scroll-to-section", section);
    }
  }
};
</script>
<style>
</style>
