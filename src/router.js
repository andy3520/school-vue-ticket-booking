import Vue from "vue"
import Router from "vue-router"
import AppHeader from "./layout/AppHeader"
import AppFooter from "./layout/AppFooter"
import Index from "./views/Index.vue"
import Trip from "@/views/Trip.vue"

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
