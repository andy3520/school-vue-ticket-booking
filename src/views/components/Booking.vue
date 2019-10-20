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
        <b-col cols="12" class="display-1 text-white text-center">Đặt Vé</b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col sm="12" md="4">
          <base-input>
            <b-form-select
              v-model="from"
              :options="fromData"
              :class="{'text-muted': from === null}"
              class="text-default font-weight-bold"
              @change="searchTrip"
            ></b-form-select>
          </base-input>
        </b-col>
        <b-col sm="12" md="4">
          <base-input>
            <b-form-select
              v-model="to"
              :class="{'text-muted': to === null}"
              :options="toData"
              @change="searchTrip"
              class="text-default font-weight-bold"
            ></b-form-select>
          </base-input>
        </b-col>
        <b-col sm="12" md="4">
          <base-input addon-right-icon="ni ni-calendar-grid-58">
            <flat-picker
              :config="dateConfig"
              class="form-control datepicker text-default font-weight-bold bg-white"
              placeholder="Ngày Đi"
              v-model="date"
              @input="searchTrip"
            ></flat-picker>
          </base-input>
        </b-col>
      </b-row>
      <b-row v-if="tripResult.length > 0">
        <base-alert type="secondary" class="col-12 bg-white rounded mb-5 p-0">
          <b-table striped hover :items="tripResult" :fields="fields" responsive class="h-100 mb-0">
            <template v-slot:cell(_id)="data">
              <base-button block type="primary" @click="bookTicket(data.value)">Đặt Vé</base-button>
            </template>
          </b-table>
        </base-alert>
      </b-row>
      <base-alert
        v-else-if="searched"
        type="secondary"
        class="text-center"
      >Không tìm thấy chuyến đi phù hợp</base-alert>
    </div>
    <modal :show="showForm" :showClose="false">
      <template slot="header">
        <h5 class="modal-title">Thông tin đặt vé</h5>
      </template>
      <div v-if="selectedTrip">
        <div v-if="formStep === 0">
          <h6 class="font-weight-bold text-default">Thông tin chuyến:</h6>
          <b-table-simple borderless small>
            <b-tbody>
              <b-tr>
                <b-td>Tuyến:</b-td>
                <b-td>{{ selectedTrip.from + ' - ' + selectedTrip.to }}</b-td>
              </b-tr>
              <b-tr>
                <b-td>Thời gian:</b-td>
                <b-td>{{ selectedTrip.time }} {{ selectedTrip.date }}</b-td>
              </b-tr>
              <b-tr>
                <b-td>Đơn giá:</b-td>
                <b-td>{{ selectedTrip.price | parsePrice }} / vé</b-td>
              </b-tr>
              <b-tr>
                <b-td>Số lượng:</b-td>
                <b-td>
                  <base-input>
                    <input
                      v-model.number="selectedTrip.buyQuantity"
                      min="1"
                      :max="selectedTrip.quantity"
                      type="number"
                    />
                  </base-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>Tổng tiền:</b-td>
                <b-td>{{ selectedTrip.buyQuantity * selectedTrip.price | parsePrice }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
        <div v-else-if="formStep === 1">
          <h6 class="font-weight-bold">Thông tin nguời đặt:</h6>
          <b-table-simple borderless small>
            <b-tbody>
              <b-tr>
                <b-td>Họ tên:</b-td>
                <b-td>
                  <base-input>
                    <input
                      v-model="selectedTrip.user.name"
                      @keyup="update(selectedTrip, 'user.name', $event)"
                      type="text"
                    />
                  </base-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>Số điện thoại:</b-td>
                <b-td>
                  <base-input>
                    <input v-model="selectedTrip.user.phone" type="phone" />
                  </base-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>Email:</b-td>
                <b-td>
                  <base-input>
                    <input v-model="selectedTrip.user.email" type="email" />
                  </base-input>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
      </div>
      <template v-if="formStep === 0" slot="footer">
        <base-button type="secondary" @click="resetForm()">Huỷ</base-button>
        <base-button type="primary" @click="formStep = 1">Tiếp theo: Điền thông tin người đặt</base-button>
      </template>
      <template v-if="formStep === 1" slot="footer">
        <base-button type="secondary" @click="formStep = 0">Quay lại: Thông tin vé</base-button>
        <base-button type="primary" @click="submitTicket">Đặt vé</base-button>
      </template>
    </modal>
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
.bg-main {
  background-image: url("/img/banner-main-vi.jpg");
  background-size: cover;
}
.min-h-full {
  min-height: 100vh;
}
</style>
