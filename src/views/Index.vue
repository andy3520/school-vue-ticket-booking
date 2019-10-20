<template>
  <div>
    <hero @scroll-to-booking="scrollToBooking"></hero>
    <booking ref="booking"></booking>
  </div>
</template>
<script>
import Hero from "@/views/components/Hero";
import Booking from "@/views/components/Booking";
export default {
  data() {
    return {};
  },
  components: {
    Hero,
    Booking
  },
  methods: {
    scrollToBooking() {
      const offset = this.$refs.booking.$el.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
    }
  }
};
</script>
<style>
</style>
