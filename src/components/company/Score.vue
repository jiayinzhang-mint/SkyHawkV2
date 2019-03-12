<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <section-score></section-score>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import sectionScore from "../analysis/chart/company/SectionScore";
export default {
  components: {
    sectionScore: sectionScore
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
