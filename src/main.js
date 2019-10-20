import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Argon from "./plugins/argon-kit"
import "./registerServiceWorker"
import BootstrapVue from "bootstrap-vue"

Vue.config.productionTip = true

Vue.use(BootstrapVue)
Vue.use(Argon)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
