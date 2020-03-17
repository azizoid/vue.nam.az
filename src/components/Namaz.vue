<template>
  <div class="row" id="times">
    <div
      v-for="(prayer, index) in prayers"
      :key="index"
      class="alert col-sm-12 col-md-2"
      :class="
        index == 1
          ? 'alert-light text-muted'
          : currentprayer == index
          ? 'alert-success'
          : ''
      "
    >
      <h6>{{ prayer["title"] }}</h6>
      <h2>{{ prayer["time"] }}</h2>
      <small v-if="index !== 1">
        {{
          new Date(tarix + " " + prayer["time"])
            | moment("YYYY-MM-DD HH:mm")
            | moment("from", "now")
        }}
      </small>
      <div v-if="currentprayer == index && index !== 1 ? true : false">
        <span class="badge badge-warning">
          Vaxtınız varkən
          <br />Namazınızı qılın
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prayers", "currentprayer"],
  data: () => ({
    //
    ruket: [2, 0, 4, 4, 3, 4]
  }),
  computed: {
    nowis: function() {
      return this.$moment(new Date());
    },
    tarix: function() {
      return this.nowis.format("YYYY/MM/DD");
    }
  }
};
</script>
