<template>
  <v-container grid-list-lg>
    <v-layout wrap>
      <v-flex v-for="(item,i) in companySupervisor" :key="i" xs2>
        <v-card>
          <v-img class="mb-1" contain :src="item.avatar" lazy-src="/img/lazy.jpg">
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
          <v-card-actions>
            <h4 class="body-2 font-weight-bold">{{item.name}}</h4>
            <v-spacer></v-spacer>
            <h4 class="body-2 font-weight-bold">{{item.index}}</h4>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import companyService from "../../service/CompanyService";

export default {
  data: () => ({
    companySupervisor: []
  }),
  methods: {
    async getSupervisor() {

      const rsp = await companyService.getCompanySupervisor(
        this.$route.params.companyId
      );
      this.companySupervisor = rsp.companySupervisor;

    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.getSupervisor();
  }
};
</script>

<style>
</style>
