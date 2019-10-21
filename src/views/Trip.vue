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
      <h1 class="text-white text-center">Quản lý chuyến</h1>
      <template v-if="showForm">
        <div class="row mt-5">
          <base-input class="col-sm-12 col-md-6">
            <b-form-select
              v-model="from"
              :options="fromData"
              :class="{'text-muted': from === null}"
              class="text-default font-weight-bold"
            ></b-form-select>
          </base-input>
          <base-input class="col-sm-12 col-md-6">
            <b-form-select
              v-model="to"
              :class="{'text-muted': to === null}"
              :options="toData"
              class="text-default font-weight-bold"
            ></b-form-select>
          </base-input>
        </div>
        <div class="row mt-3">
          <base-input class="col-sm-12 col-md-6">
            <flat-picker
              :config="dateConfig"
              class="form-control datepicker text-default font-weight-bold bg-white"
              placeholder="Ngày Đi"
              v-model="date"
            ></flat-picker>
          </base-input>
          <base-input class="col-sm-12 col-md-6">
            <flat-picker
              :config="timeConfig"
              @on-close="updateTime"
              class="form-control datepicker text-default font-weight-bold bg-white"
              placeholder="Giờ khởi hành"
              v-model="time"
            ></flat-picker>
          </base-input>
        </div>
        <div class="row mt-3">
          <base-input class="col-sm-12 col-md-6">
            <input
              v-model="price"
              @blur="updateNumber(price, $event)"
              type="number"
              min="1000"
              class="form-control text-default font-weight-bold"
              placeholder="Giá vé"
            />
          </base-input>
          <base-input class="col-sm-12 col-md-6">
            <input
              type="number"
              v-model="quantity"
              @blur="updateNumber(quantity, $event)"
              min="1"
              class="form-control text-default font-weight-bold"
              placeholder="Số lượng vé"
            />
          </base-input>
        </div>
      </template>
      <div class="row mt-2">
        <base-button
          class="mb-3 mb-sm-0"
          type="info"
          icon="ni ni-fat-add"
          @click="addTrip"
        >Tạo chuyến</base-button>
      </div>
      <base-alert type="secondary" class="col-12 bg-white rounded my-4 p-0">
        <b-table striped hover :items="tripsData" :fields="fields" responsive class="h-100 mb-0">
          <template v-slot:cell(_id)="data">
            <base-button block type="primary" @click="editTrip(data.value)">Edit</base-button>
          </template>
        </b-table>
      </base-alert>
    </div>
  </section>
</template>

<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { states } from "@/resource/states.json";
import { trips } from "@/resource/trips.json";
import Modal from "@/components/Modal";
import uuidv1 from "uuid/v1";

export default {
  components: { flatPicker, Modal },
  data() {
    return {
      // Data control animate
      showForm: false,
      searched: false,
      formStep: 0,
      // Process data
      from: null,
      to: null,
      date: null,
      time: null,
      price: null,
      quantity: null,
      tripResult: [],
      isEdit: false,
      // Data form display form
      timeConfig: {
        enableTime: true,
        noCalendar: true,
        allowInput: false,
        dateFormat: "H:i",
        time_24hr: true
      },
      states: states,
      tripsData: trips,
      fields: [
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
        { key: "quantity", label: "Số lượng", sortable: true },
        { key: "_id", label: "" }
      ]
    };
  },
  computed: {
    fromData() {
      return [{ value: null, text: "Điểm Đi" }, ...this.states];
    },
    toData() {
      return [{ value: null, text: "Điểm Đến" }, ...this.states];
    },
    dateConfig() {
      return {
        allowInput: false,
        dateFormat: "d-m-Y",
        minDate: this.isEdit ? null : "today",
        mode: "single"
      };
    }
  },
  methods: {
    resetForm() {
      this.showForm = false;
      this.formStep = 0;
    },
    addTrip() {
      if (!this.showForm) return (this.showForm = true);
      this.showForm = false;
      let newTicket = {
        _id: uuidv1(),
        from: this.from,
        to: this.to,
        date: this.date,
        time: this.time,
        price: this.price,
        quantity: this.quantity
      };
      this.from = null;
      this.to = null;
      this.date = null;
      this.time = null;
      this.price = null;
      this.quantity = null;
    },
    editTrip(id) {
      const ticket = this.tripsData.find(trip => trip._id === id);
      this.showForm = true;
      this.isEdit = true;
      this.from = ticket.from;
      this.to = ticket.to;
      this.date = ticket.date;
      this.time = ticket.time;
      this.price = ticket.price;
      this.quantity = ticket.quantity;
    },
    updateTime(selectedDates, dateStr, instance) {
      this.time = dateStr;
    },
    updateNumber(param, event) {
      param = event.target.value;
    }
  },
  filters: {
    parsePrice(value) {
      if (!value || isNaN(value)) return value;
      return value > 1000 ? value / 1000 + "K" : value;
    }
  },
  mounted() {}
};
</script>

<style>
.min-h-full {
  min-height: 100vh;
}
</style>
