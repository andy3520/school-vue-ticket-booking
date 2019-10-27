import Vue from "vue"
import Router from "vue-router"
import AppHeader from "./layout/AppHeader"
import AppFooter from "./layout/AppFooter"
import Index from "./views/Index.vue"
import Trip from "@/views/Trip.vue"
import Ticket from "@/views/Ticket.vue"
import Booking from "@/views/components/Booking.vue"
import SearchTicket from "@/views/components/SearchTicket.vue"

Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      components: {
        header: AppHeader,
        default: Index,
        footer: AppFooter
      }
    },
    {
      path: "/trips",
      name: "trips",
      components: {
        header: AppHeader,
        default: Trip,
        footer: AppFooter
      }
    },
    {
      path: "/tickets",
      name: "tickets",
      components: {
        header: AppHeader,
        default: Ticket,
        footer: AppFooter
      }
    },
    {
      path: "/booking",
      name: "booking",
      components: {
        header: AppHeader,
        default: Booking,
        footer: AppFooter
      }
    },
    {
      path: "/search",
      name: "search",
      components: {
        header: AppHeader,
        default: SearchTicket,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
