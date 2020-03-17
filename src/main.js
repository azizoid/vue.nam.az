import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./styles/bootstrap.scss";
import "./styles/style.css";

import App from "./App.vue";

import moment from "moment";
const lang = "az";
moment.locale(lang);
Vue.use(require("vue-moment"), { moment });

import VueGtag from "vue-gtag";
Vue.use(VueGtag, {
  config: { id: "UA-70305066-2" }
});
//Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
