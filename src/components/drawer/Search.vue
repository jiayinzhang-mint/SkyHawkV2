<template>
  <div>
    <v-container>
      <v-text-field
        prepend-inner-icon="search"
        label="键入以搜索"
        filled
        v-model="search"
        ref="searchBox"
      ></v-text-field>
    </v-container>
    <v-toolbar class="transparent" flat v-if="companyQuery.length>=1">
      <v-toolbar-title class="font-weight-bold">企业</v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
      <div v-for="(item,i) in companyQuery" :key="i">
        <v-list-item ripple :to="'/company/'+item.id+'/info'">
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">{{item.brand}}</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{item.name}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import search from "../../utils/Search";
import { mapGetters } from "vuex";
export default {
  name: "search",
  data() {
    return {
      search: "",
      companyQuery: []
    };
  },
  methods: {
    querySearch() {
      this.searchCompany();
    },
    searchCompany() {
      this.companyQuery = search.searchInArray(
        this.search,
        this.companyList,
        "brand"
      );
      this.companyQuery.forEach(e => {
        e.stationAlt = this.stationList.forEach(f => {
          return e.station == f.id;
        });
      });
    },
    focus() {
      setTimeout(() => {
        this.$refs.searchBox.focus();
      }, 300);
    }
  },
  watch: {
    search(val) {
      this.querySearch(val);
    }
  },
  computed: {
    ...mapGetters({
      companyList: "company/companyList",
      stationList: "organization/stationList"
    })
  },
  mounted() {}
};
</script>

