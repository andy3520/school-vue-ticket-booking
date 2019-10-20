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
              @change="searchTrip"
            ></b-form-select>
          </base-input>
          <base-input class="col-sm-12 col-md-6">
            <b-form-select
              v-model="to"
              :class="{'text-muted': to === null}"
              :options="toData"
              @change="searchTrip"
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
              @input="searchTrip"
            ></flat-picker>
          </base-input>
          <base-input class="col-sm-12 col-md-6">
            <flat-picker
              :config="dateConfig"
              class="form-control datepicker text-default font-weight-bold bg-white"
              placeholder="Giờ khởi hành"
              v-model="date"
              @input="searchTrip"
            ></flat-picker>
          </base-input>
        </div>
        <div class="row mt-3">
          <base-input class="col-sm-12 col-md-6">
            <input
              type="text"
              class="form-control text-default font-weight-bold"
              placeholder="Giá vé"
            />
          </base-input>
          <base-input class="col-sm-12 col-md-6">
            <input
              type="text"
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
            <base-button block type="primary" @click="bookTicket(data.value)">Edit</base-button>
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
      tripResult: [],
      selectedTrip: null,
      // Data form display form
      dateConfig: {
        allowInput: false,
        dateFormat: "d-m-Y",
        minDate: "today",
        mode: "single"
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
    }
  },
  methods: {
    searchTrip() {
      if (!this.from && !this.to && !this.date) return (this.tripResult = []);
      this.searched = true;
      this.tripResult = this.tripsData.filter(
        trip =>
          trip.from === this.from ||
          trip.to === this.to ||
          trip.date === this.date
      );
    },
    bookTicket(id) {
      this.showForm = true;
      this.selectedTrip = { ...this.tripResult.find(trip => trip._id === id) };
      this.selectedTrip.buyQuantity = 1;
      this.selectedTrip.user = {
        name: "",
        phone: "",
        email: ""
      };
    },
    resetForm() {
      this.showForm = false;
      this.selectedTrip = null;
      this.formStep = 0;
    },
    update(obj, prop, event) {
      this.selectedTrip = { ...this.selectedTrip, ...obj };
    },
    submitTicket() {
      console.log(JSON.stringify(this.selectedTrip));
    },
    addTrip() {
      if (!this.showForm) return (this.showForm = true);
      this.showForm = false;
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
