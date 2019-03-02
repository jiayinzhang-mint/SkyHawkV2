<template>
  <div>
    <v-container>
      <v-text-field prepend-inner-icon="search" label="键入以搜索" box v-model="search" ref="searchBox"></v-text-field>
    </v-container>
    <v-container v-if="companyQuery.length>=1">
      <h3>企业</h3>
    </v-container>
    <v-list two-line>
      <div v-for="(item,i) in companyQuery" :key="i">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">{{item.brand}}</v-list-tile-title>
            <v-list-tile-sub-title class="font-weight-bold">{{item.name}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
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

