<template>
  <v-layout row fill-height>
    <v-flex xs12 sm3 style="height:calc(100vh - 64px);overflow :auto" class="grey-back">
      <v-toolbar flat color="grey darken-3">
        <v-toolbar-title style="font-size:17px">组织信息</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-if="active.length>=1" @click="createOrganizationDialog=true">
          <v-icon>add</v-icon>
        </v-btn>
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
      <router-view v-if="this.$route.params.organizationId"></router-view>
      <v-container fluid fill-height v-else>
        <v-layout align-center justify-center>
          <div class="headline font-weight-light">请选择组织</div>
        </v-layout>
      </v-container>
    </v-flex>
    <v-dialog v-model="createOrganizationDialog" max-width="400">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>新建组织</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-form ref="createOrganizationForm">
            <v-text-field
              v-model="organizationInfo.name"
              label="名称"
              :rules="[v => !!v || '请填写名称']"
              required
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary"
              rounded
              flat
              @click="createOrganizationDialog = false; createOrganzation()"
            >保存</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import organizationService from "../../../service/OrganizationService";
export default {
  data() {
    return {
      active: [],
      organizationInfo: {},
      createOrganizationDialog: false
    };
  },
  methods: {
    async createOrganzation() {
      var parent = this.active[0];
      this.organizationInfo.level = parent.level + 1;
      this.organizationInfo.parent = parent.id;
      console.log(this.organizationInfo);
      await organizationService.createOrganization(this.organizationInfo);
      await organizationService.getOrganizationList({ all: true });
    }
  },
  watch: {
    // can't use es6 syntax here
    active: function() {
      console.log(this.active);
      try {
        if (this.active[0].id) {
          this.$router.push({
            path: "/admin/organization/" + this.active[0].id + "/info"
          });
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
