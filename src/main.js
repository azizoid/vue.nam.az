import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./styles/style.css";

import App from "./App.vue";

import moment from "moment";
const lang = "az";
moment.locale(lang);
Vue.use(require("vue-moment"), { moment });

new Vue({
  render: h => h(App)
}).$mount("#app");
