<template>
  <div class="row" id="times">
    <div
      v-for="(prayer, index) in prayers"
      :key="index"
      class="alert col-sm-12 col-md-2"
      :class="
          index == 1
            ? 'alert-light'
            : currentprayer == index
            ? 'alert-success'
            : ''
        "
    >
      <h5>{{ prayer["title"] }}</h5>
      <h1>{{ prayer["time"] }}</h1>
      <i>
        {{
        new Date(tarix + " " + prayer["time"]) | moment("from", "now")
        }}
      </i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prayers", "currentprayer", "location"],
  data: () => ({
    //
  }),
  computed: {
    nowis: function() {
      return this.$moment();
    },
    tarix: function() {
      return this.nowis.format("YYYY-MM-DD");
    }
  },
  methods: {
    //
  },
  mounted: function() {
    //
  }
};
</script>
