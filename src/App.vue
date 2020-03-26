<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="./assets/namaz.png" width="30" height="30" class="d-inline-block align-top" alt />
          Nam.az
        </a>

        <div class="collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <select class="form-control btn-outline-success" @change="changeLocation($event)">
                <option v-for="(city, index) in cities" :key="index" :value="index">{{ city }}</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="text-center d-none d-md-block" id="location">
        <h1 class="nowis">{{ livetime }}</h1>
        <h1>{{ location }}</h1>
        <small>
          {{
          new Date()
          | moment("add", "0 minutes")
          | moment("dddd, D MMMM YYYY")
          }}
        </small>
      </div>
      <Namaz :prayers="prayers" :currentprayer="currentprayer" />
    </div>
    <footer class="footer">
      <div class>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">&copy; 2020</li>
            <li class="breadcrumb-item">
              <a href="https://www.nam.az">Nam.az</a>
            </li>
            <li class="breadcrumb-item">
              <a href="https://www.quran.az">Quran.az</a>
            </li>
          </ol>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
const Namaz = () => import("./components/Namaz.vue");
// import Namaz from "./components/Namaz.vue";

export default {
  name: "App",
  components: {
    Namaz
  },
  data: () => ({
    prayers: [
      { id: 1, title: "Sübh Namazı", time: "00:00" },
      { id: 2, title: "Günəş", time: "01:10" },
      { id: 3, title: "Zöhr Namazı", time: "01:20" },
      { id: 4, title: "Əsr Namazı", time: "03:30" },
      { id: 5, title: "Məğrib Namazı", time: "04:40" },
      { id: 6, title: "İşa Namazı", time: "05:50" }
    ],
    location: "Bakı",
    currentprayer: 5,
    livetime: "00:00",
    cities: {
      1: "Bakı",
      2: "Ağdam",
      3: "Astara",
      4: "Gəncə",
      5: "Qazax",
      6: "Quba",
      7: "Lənkəran",
      8: "Saatlı",
      9: "Sabirabad",
      10: "Şamaxı",
      11: "Şəki",
      12: "Xaçmaz",
      13: "Yevlax",
      14: "Naxçıvan",
      15: "Göycay",
      16: "Zaqatala"
    }
  }),
  methods: {
    insertTimes(data) {
      let timeNow = this.$moment().format("HH:mm");

      for (let i = 0; i < 6; i++) {
        let tmp = data.prayers[i];
        this.prayers[i]["time"] = tmp;
        if (timeNow > tmp) {
          this.currentprayer = i;
        }
      }
    },
    time() {
      var self = this;
      this.livetime = this.$moment().format("HH:mm:ss");
      setTimeout(self.time, 1000);
    },
    loadApi(city) {
      axios
        .get("https://nam.az/api/" + city)
        .then(response => this.insertTimes(response.data));
    },
    changeLocation(event) {
      let v = event.target.value;
      this.location = this.cities[v];
      this.loadApi(v);
    }
  },
  mounted() {
    this.loadApi();
    this.time();
  }
};
</script>
