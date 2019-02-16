<template>
  <v-progress-linear :indeterminate="true" v-if="x"></v-progress-linear>
</template>

<script>
export default {
  name: "Loading",
  data: () => ({
    x: false
  }),
  methods: {
    show(toggle) {
      if (toggle) {
        this.x = true;
      } else {
        this.x = false;
      }
    }
  }
};
</script>

<style scoped>
.v-progress-linear {
  position: absolute;
  height: 5px !important;
  margin: 0;
}
</style>
