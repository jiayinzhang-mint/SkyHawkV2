<template>
  <v-layout row fill-height>
    <v-flex xs12 sm3 style="height:calc(100vh - 64px);overflow :auto" class="grey-back">
      <v-toolbar flat color="grey darken-3">
        <v-scroll-x-transition>
          <v-toolbar-title style="font-size:17px">组织信息</v-toolbar-title>
        </v-scroll-x-transition>
      </v-toolbar>
      <v-divider></v-divider>

      <v-treeview
        activatable
        hoverable
        :active.sync="active"
        return-object
        :items="organizationList"
        transition
      ></v-treeview>
    </v-flex>
    <v-flex sm9>
      <router-view v-if="this.$route.params.id"></router-view>
      <v-container fluid fill-height v-else>
        <v-layout align-center justify-center>
          <div class="headline font-weight-light">请选择组织</div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      active: []
    };
  },
  methods: {},
  watch: {
    // can't use es6 syntax here
    active: function() {
      console.log(this.active);
      try {
        if (this.active[0].id) {
          this.$router.push({ path: "/organization/" + this.active[0].id });
        }
      } catch (err) {
        err;
      }
    }
  },
  computed: {
    ...mapGetters({
      organizationList: "organization/organizationList"
    })
  },

  mounted() {}
};
</script>

<style>
</style>
