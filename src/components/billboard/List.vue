<template>
  <v-layout row>
    <v-flex sm3>
      <v-toolbar color="grey darken-3" flat>
        <v-toolbar-title style="font-size:17px">公告列表</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="createPostDialog=true">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list style="height:calc(100vh - 129px);overflow :auto">
        <v-scroll-x-transition group>
          <template v-for="(item,index) in postList">
            <div :key="index">
              <v-list-tile :to=" '/billboard/' +item.id" ripple active-class="grey darken-2">
                <v-list-tile-content>
                  <v-list-tile-title class="text-uppercase" style="color:white" v-html="item.title"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>
            </div>
          </template>
        </v-scroll-x-transition>
      </v-list>
    </v-flex>
    <v-flex sm9>
      <router-view v-if="this.$route.params.postId"></router-view>
      <v-container v-else fluid fill-height>
        <v-layout align-center justify-center>
          <div class="headline font-weight-light">请选择公告</div>
        </v-layout>
      </v-container>
    </v-flex>
    <v-dialog v-model="createPostDialog" width="500" persistent scrollable>
      <v-card>
        <v-toolbar class="transparent" flat>
          <v-toolbar-title>创建公告</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="createPostDialog=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-form ref="postForm">
            <v-text-field
              v-model="newPost.title"
              label="标题"
              :rules="[v => !!v || '请填写标题']"
              required
            ></v-text-field>
            <v-select
              :items="postType"
              :rules="[v => !!v || '请选择类型']"
              v-model="newPost.type"
              label="类型"
            ></v-select>
            <v-textarea label="内容" counter="140" v-model="newPost.detail"></v-textarea>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-btn block round @click="createPost">发布</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import billboardService from "../../service/BillboardService";
export default {
  data: () => ({
    postList: [],
    createPostDialog: false,
    newPost: {},
    postType: ["信息", "紧急"]
  }),
  methods: {
    async getPostList() {
      const rsp = await billboardService.getPostList();
      this.postList = rsp.articleList;
    },
    async createPost() {
      this.newPost.author = this.userInfo.id;
      console.log(this.newPost);
      const rsp = await billboardService.createPost(this.newPost);
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    this.getPostList();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style>
</style>
