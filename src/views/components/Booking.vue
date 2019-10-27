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
        <b-col cols="12" class="display-1 text-white text-center">ĐẶT VÉ</b-col>
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
      <b-row>
        <base-alert class="col-12" v-show="isAlert" :type="alertType">{{ alertMessage }}</base-alert>
      </b-row>
      <b-row v-if="tripsData.length > 0 && searched && !isFetching">
        <base-alert type="secondary" class="col-12 bg-white rounded mb-5 p-0">
          <b-table striped hover :items="tripsData" :fields="fields" responsive class="h-100 mb-0">
            <template v-slot:cell(_id)="data">
              <base-button
                v-if="getTicketById(data.value).quantity > 0"
                block
                type="primary"
                @click="bookTicket(data.value)"
              >Đặt Vé</base-button>
              <base-button
                v-else
                block
                type="warning"
                @click="bookTicket(data.value)"
                disabled
              >Hết Vé</base-button>
            </template>
          </b-table>
        </base-alert>
      </b-row>
      <base-alert
        v-else-if="searched && !isFetching"
        type="secondary"
        class="text-center"
      >Không tìm thấy chuyến đi phù hợp</base-alert>
      <base-alert v-if="isFetching" type="secondary" class="text-center">Tìm kiếm...</base-alert>
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
                      :disabled="isBooking"
                      v-model="selectedTrip.user.name"
                      @keyup="update(selectedTrip, 'user.name', $event)"
                      type="text"
                      placeholder="Họ tên"
                    />
                  </base-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>Số điện thoại:</b-td>
                <b-td>
                  <base-input>
                    <input
                      :disabled="isBooking"
                      v-model="selectedTrip.user.phone"
                      type="phone"
                      placeholder="Số điện thoại"
                    />
                  </base-input>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td>Email:</b-td>
                <b-td>
                  <base-input>
                    <input
                      :disabled="isBooking"
                      v-model="selectedTrip.user.email"
                      type="email"
                      placeholder="Email"
                    />
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
        <base-button
          type="secondary"
          @click="formStep = 0"
          :disabled="isBooking"
        >Quay lại: Thông tin vé</base-button>
        <base-button
          type="primary"
          @click="submitTicket"
          :disabled="isBooking"
        >{{ isBooking ? 'Loading...' : 'Đặt vé'}}</base-button>
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
import uuidv1 from "uuid/v1";
import { Trip, Ticket } from "@/service/api";

export default {
  components: { flatPicker, Modal },
  data() {
    return {
      // Data control animate
      showForm: false,
      searched: false,
      formStep: 0,
      isAlert: false,
      isBooking: false,
      alertType: "success",
      alertMessage: "Info",
      isFetching: false,
      // Process data
      from: null,
      to: null,
      date: null,
      selectedTrip: null,
      // Data form display form
      dateConfig: {
        allowInput: false,
        dateFormat: "d-m-Y",
        minDate: "today",
        mode: "single"
      },
      states: states,
      tripsData: [],
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
      return [{ value: null, text: "Điểm Đi" }, ...this.states].filter(
        state => state.text !== this.to
      );
    },
    toData() {
      return [{ value: null, text: "Điểm Đến" }, ...this.states].filter(
        state => state.text !== this.from
      );
    }
  },
  methods: {
    searchTrip() {
      if (!this.from || !this.to || !this.date) return (this.tripsData = []);
      this.isFetching = true;
      Trip.getTrips(this.from, this.to, this.date)
        .then(data => {
          this.tripsData = data.Items;
          this.searched = true;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
    bookTicket(id) {
      this.showForm = true;
      this.selectedTrip = { ...this.tripsData.find(trip => trip._id === id) };
      this.selectedTrip._tripId = this.selectedTrip._id;
      this.selectedTrip._id = uuidv1();
      this.selectedTrip.buyQuantity = 1;
      this.selectedTrip.user = {
        name: "",
        phone: "",
        email: ""
      };
      this.selectedTrip.buyTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      this.selectedTrip.status = "Chờ duyệt";
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
      this.selectedTrip.user.email = this.selectedTrip.user.email || "Trống";
      this.isBooking = true;
      Ticket.createTicket(this.selectedTrip)
        .then(data => {
          const editTrip = this.tripsData.find(
            trip => this.selectedTrip._tripId === trip._id
          );
          editTrip.quantity = editTrip.quantity - this.selectedTrip.buyQuantity;
          this.isAlert = true;
          this.alertMessage =
            "Đặt vé thành công. Sẽ có nhân viên liên hệ xác nhận trong 24 giờ.";
          this.alertType = "success";
          this.showForm = false;
          this.formStep = 0;
          this.isBooking = false;
          setTimeout(() => {
            this.isAlert = false;
            this.alertMessage = "";
            this.alertType = "success";
          }, 5000);
          return Trip.saveEditTrip(editTrip);
        })
        .catch(err => {
          this.isAlert = true;
          this.alertMessage = "Đã xảy ra lỗi vui lòng thử lại";
          this.alertType = "waring";
          setTimeout(() => {
            this.isAlert = false;
            this.alertMessage = "";
            this.alertType = "success";
          }, 5000);
          console.log(err);
        });
    },
    getTicketById(id) {
      return this.tripsData.find(trip => trip._id === id);
    }
  },
  filters: {
    parsePrice(value) {
      if (!value || isNaN(value)) return value;
      return value > 1000 ? value / 1000 + "K" : value;
    }
  },
  mounted() {
    Trip.getAllTrip()
      .then(data => {
        this.tripsData = data.Items;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.bg-main {
  background-image: url("/img/banner-main-vi.jpg");
  background-size: cover;
}
.min-h-full {
  min-height: 100vh;
}
</style>
