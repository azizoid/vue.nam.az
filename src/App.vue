<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" sticky="sticky">
      <div class="container">
        <b-navbar-brand href="#">Nam.az</b-navbar-brand>

        <b-navbar-nav>
          <b-nav-item>
            <b-dropdown id="dropdown-1" :text="location" size="sm" variant="success">
              <b-dropdown-item
                v-for="(city, index) in cities"
                :key="index"
                @click="changeLocation(index)"
              >{{city}}</b-dropdown-item>
            </b-dropdown>
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
    <div class="container">
      <div class="text-center" id="location">
        <h1 class="nowis">{{ livetime }}</h1>
        <h1>{{location}}</h1>
        <small>
          {{
          new Date()
          | moment("add", "0 minutes")
          | moment("dddd, D MMMM YYYY")
          }}
        </small>
      </div>
      <Namaz :prayers="prayers" :currentprayer="currentprayer" :location="location" />
      <div class="text-center text-muted">
        Həqiqətən, namaz çirkin əməllərdən çəkindirir.
        <a
          href="https://quran.az/29/45"
          target="blank"
        >(29:45)</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Namaz from "./components/Namaz.vue";

export default {
  name: "App",
  components: {
    Namaz
  },
  data: () => ({
    prayers: [
      { id: 1, title: "Sübh", time: "00:00" },
      { id: 2, title: "Günəş", time: "00:00" },
      { id: 3, title: "Zöhr", time: "00:00" },
      { id: 4, title: "Əsr", time: "00:00" },
      { id: 5, title: "Məğrib", time: "00:00" },
      { id: 6, title: "İşa", time: "00:00" }
    ],
    location: "Bakı",
    currentprayer: 0,
    livetime: "00:00",
    cities: {
      1: "Baki",
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
        if (timeNow > tmp) this.currentprayer = i + 1;
      }
    },
    time() {
      var self = this;
      this.livetime = this.$moment().format("HH:mm:ss");
      setTimeout(self.time, 1000);
    },
    loadApi(city) {
      axios
        .get("https://teklif.az/api/" + city)
        .then(response => this.insertTimes(response.data));
    },
    changeLocation(v) {
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
