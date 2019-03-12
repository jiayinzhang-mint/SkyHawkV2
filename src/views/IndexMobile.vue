<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  methods: {},
  computed: {
    ...mapGetters({ userInfo: "user/userInfo" })
  },
  mounted() {}
};
</script>

<style>
</style>
