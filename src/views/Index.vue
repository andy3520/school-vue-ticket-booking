<template>
  <div>
    <hero @scroll-to-section="scrollToSection"></hero>
    <booking id="booking"></booking>
    <search-ticket id="searching"></search-ticket>
    <base-button id="to-top" type="primary" icon="ni ni-bold-up" @click="backToTop"></base-button>
  </div>
</template>
<script>
import Hero from "@/views/components/Hero";
import Booking from "@/views/components/Booking";
import SearchTicket from "@/views/components/SearchTicket";
export default {
  data() {
    return {};
  },
  components: {
    Hero,
    Booking,
    SearchTicket
  },
  methods: {
    scrollToSection($section) {
      const elSection = document.getElementById($section);
      if (elSection && elSection.offsetTop) {
        window.scrollTo({
          top: elSection.offsetTop,
          behavior: "smooth"
        });
      }
    },
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>
<style>
#to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
</style>
