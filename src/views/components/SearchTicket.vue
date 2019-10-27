<template>
  <section class="section-shaped my-0 min-h-full">
    <div class="shape shape-style-1 bg-main">
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
    <div
      class="container min-h-full d-flex flex-column align-content-center justify-content-center py-auto"
    >
      <b-row>
        <b-col cols="12" class="display-1 text-white text-center">TRA CỨU VÉ</b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col sm="12" md="6" offset-md="3">
          <base-input>
            <input
              v-model="phone"
              type="text"
              @input="searchTicket"
              class="form-control text-default font-weight-bold text-center"
              placeholder="Nhập Số Điện Thoại"
            />
          </base-input>
        </b-col>
      </b-row>
      <b-row v-if="result && Object.keys(result).length > 0 && searched && !searching">
        <base-alert type="secondary" class="col-12 bg-white rounded mb-5 p-0">
          <b-card class="py-0">
            <b-card-text v-for="(ticket, index) in result" :key="ticket._id" header-tag="header">
              <b-row class="rounded p-3" :class="{'bg-secondary': index % 2 === 0}">
                <b-col>
                  <b>Trạng thái:</b>
                  {{ ticket.status.toUpperCase() }}
                  <br />
                  <b>Thời gian đặt vé:</b>
                  {{ ticket.buyTime || 'Không tìm thấy'}}
                  <br />
                  <b>Họ tên:</b>
                  {{ ticket.user.name }}
                  <br />
                  <b>SĐT:</b>
                  {{ ticket.user.phone }}
                  <br />
                  <b>Email:</b>
                  {{ ticket.user.email }}
                </b-col>
                <b-col>
                  <b>Tuyến:</b>
                  {{ ticket.from }} - {{ ticket.to }}
                  <br />
                  <b>Thời gian:</b>
                  {{ ticket.time }} - {{ ticket.date }}
                  <br />
                  <b>Số lượng vé:</b>
                  {{ ticket.buyQuantity }}
                  <br />
                  <b>Tổng tiền:</b>
                  {{ ticket.buyQuantity * ticket.price }}
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>
        </base-alert>
      </b-row>
      <base-alert
        v-else-if="searched && !searching"
        type="secondary"
        class="text-center"
      >Không tìm thấy vé với số điện thoại "{{ phone }}"</base-alert>
      <base-alert v-if="searching" type="secondary" class="text-center">Tìm kiếm...</base-alert>
    </div>
  </section>
</template>

<script>
import { Ticket } from "@/service/api";

export default {
  data() {
    return {
      phone: null,
      result: null,
      searched: false,
      searching: false,
      deboundTimer: null
    };
  },
  computed: {},
  methods: {
    searchTicket($event) {
      const phone = $event.target.value.trim();
      this.searching = true;
      if (!phone || phone === "") {
        this.searching = false;
        return;
      }

      clearTimeout(this.deboundTimer);
      this.deboundTimer = setTimeout(() => {
        Ticket.getTicketByPhone(phone)
          .then(data => {
            this.result = data.Items;
            this.searched = true;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.searching = false;
          });
      }, 1000);
    }
  },
  beforeDestroy() {
    clearTimeout(this.deboundTimer);
  }
};
</script>

<style scoped>
.bg-main {
  background-image: url("/img/banner-ticket.jpg");
  background-size: cover;
}
.min-h-full {
  min-height: 100vh;
}
</style>
