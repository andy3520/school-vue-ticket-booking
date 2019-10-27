<template>
  <section class="section-shaped my-0 min-h-full">
    <div class="shape shape-style-2 shape-dark">
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
      class="container shape-container d-flex flex-column align-items-center justify-content-center"
    >
      <h1 class="text-white text-center">Quản lý vé</h1>
      <base-alert
        v-if="ticketsData.length > 0"
        type="secondary"
        class="col-12 bg-white rounded my-4 p-0"
      >
        <b-table striped hover :items="ticketsData" :fields="fields" responsive class="h-100 mb-0">
          <template v-slot:cell(user)="data">
            <div class="row pl-3">
              {{ data.item.user.name }}
              <br />
              {{ data.item.user.phone }}
              <br />
              {{ data.item.user.email }}
            </div>
          </template>
          <template v-slot:cell(_idstatus)="data">
            <div class="row">
              <base-input>
                <b-form-select
                  :value="data.item.status"
                  :options="status"
                  @change="changeStatus($event, data.item._id)"
                  class="text-default font-weight-bold"
                ></b-form-select>
              </base-input>
            </div>
          </template>
        </b-table>
      </base-alert>
      <base-alert
        v-else
        type="secondary"
        class="col-12 bg-white rounded my-4 display-4 text-center"
      >{{ isFetching ? 'Loading...' : 'Không có vé nào' }}</base-alert>
    </div>
  </section>
</template>

<script>
import { Ticket } from "@/service/api";

export default {
  data() {
    return {
      // Process data
      isLoading: false,
      isFetching: false,
      // Data form display form
      status: ["Chờ duyệt", "Duyệt", "Huỷ", "Hoàn thành"],
      ticketsData: [],
      fields: [
        { key: "user", label: "Khách hàng" },
        { key: "time", label: "Thời gian", sortable: true },
        { key: "date", label: "Ngày Đi", sortable: true },
        { key: "from", label: "Điểm Đi", sortable: true },
        { key: "to", label: "Điểm Đến", sortable: true },
        {
          key: "price",
          label: "Giá Vé",
          sortable: true,
          formatter: v => (v > 1000 ? v / 1000 + "K" : v)
        },
        { key: "buyQuantity", label: "Số lượng", sortable: true },
        { key: "_idstatus", label: "Trạng thái" }
      ]
    };
  },
  methods: {
    editTrip(id) {
      const ticket = this.ticketsData.find(trip => trip._id === id);
      this.showForm = true;
      this.isEdit = true;
      this.id = ticket._id;
      this.from = ticket.from;
      this.to = ticket.to;
      this.date = ticket.date;
      this.time = ticket.time;
      this.price = ticket.price;
      this.quantity = ticket.quantity;
    },
    changeStatus(status, _id) {
      const ticket = { ...this.ticketsData.find(ticket => ticket._id === _id) };
      ticket.status = status;
      Ticket.saveEditTicket(ticket)
        .then(() => {
          this.ticketsData.find(ticket => {
            if (ticket._id === _id) {
              ticket.status === status;
              return;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    parsePrice(value) {
      if (!value || isNaN(value)) return value;
      return value > 1000 ? value / 1000 + "K" : value;
    }
  },
  mounted() {
    this.isFetching = true;
    Ticket.getAllTicket()
      .then(data => {
        this.ticketsData = data.Items;
        this.isFetching = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.min-h-full {
  min-height: 100vh;
}
</style>
