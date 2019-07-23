<template>
  <div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-center">创建时间</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in checkList" :key="`check-${i}`">
          <td class="text-center">{{ item.create_time | timeFormat }}</td>
          <td class="text-center">
            <v-btn text rounded color="primary" @click="getCheckInfo(item)">详情</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-dialog v-model="checkInfoDialog" width="400" scrollable>
      <v-card>
        <v-toolbar flat class="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">填表人：{{checkPersonName}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="checkInfoDialog=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <div v-for="(item,i) in allAreaForm" :key="item.text">
            <small>{{item.text}}</small>
            <p class="white--text">{{currentCheck.all_area_parsed[i]}}</p>
            <v-divider class="mb-4"></v-divider>
          </div>
          <div v-for="(item,i) in cookingAreaForm" :key="item.text">
            <small>{{item.text}}</small>
            <p class="white--text">{{currentCheck.cooking_area_parsed[i]}}</p>
            <v-divider class="mb-4"></v-divider>
          </div>
          <div v-for="(item,i) in specialAreaForm" :key="item.text">
            <small>{{item.text}}</small>
            <p class="white--text">{{currentCheck.special_area_parsed[i]}}</p>
            <v-divider class="mb-4"></v-divider>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import companyService from "../../service/CompanyService";
import userService from "../../service/UserService";
import { setTimeout } from "timers";

export default {
  data: () => ({
    checkList: [],
    checkPersonName: "",
    currentCheck: {
      check_person_parsed: {
        name: ""
      },
      all_area_parsed: [],
      cooking_area_parsed: [],
      special_area_parsed: []
    },
    checkInfoDialog: false,
    headers: [
      {
        text: "填写时间",
        align: "center",
        sortable: false,
        value: "name"
      },
      {
        text: "操作",
        align: "center",
        sortable: false
      }
    ],
    allAreaForm: [
      {
        text:
          "工作人员是否正确穿戴工作衣帽，专间工作人员是否规范穿戴专用工作衣帽和口罩"
      },
      {
        text: "工作人员是否存在吸烟、饮食或其他可能污染食品的行为"
      },
      {
        text: "地面、墙面是否有瓷砖、地砖剥落，明显积水，积污、积垃圾"
      },
      {
        text: "排水沟是否阻塞漫溢"
      },
      {
        text: "垃圾桶是否及时加盖，垃圾是否及时清理"
      },
      {
        text: "是否有老鼠等有害生物出现"
      },
      {
        text:
          "* 是否在非专间内进行加工冷菜、生食海产品、裱花、切片水果、制作现榨饮料、食品分装等直接入口食品加工制作"
      },
      {
        text: "* 是否有回收视频再加工现象"
      }
    ],
    cookingAreaForm: [
      {
        text: "成品与需冷藏的原料是否长时间室温存放"
      },
      {
        text: "成品与原料、半成品是否混合存放"
      },
      {
        text: "* 学校食堂是否制售冷菜"
      }
    ],
    specialAreaForm: [
      {
        text: "专间工作人员操作前是否消毒双手"
      },
      {
        text: "是否有非专间人员在内"
      },
      {
        text: "门窗是否保持关闭"
      },
      {
        text: "温度是否控制在25摄氏度以下"
      }
    ]
  }),
  methods: {
    async getCompanyCheck() {
      const rsp = await companyService.getCompanyCheck(
        this.$route.params.companyId
      );
      this.checkList = rsp.companyCheck;
    },
    async getCheckInfo(e) {
      this.currentCheck = e;
      const rsp = await userService.getUserInfo(e.check_person);
      this.checkPersonName = rsp.userInfo.name;
      this.currentCheck.all_area_parsed = JSON.parse(
        this.currentCheck.all_area
      );
      this.currentCheck.cooking_area_parsed = JSON.parse(
        this.currentCheck.cooking_area
      );
      this.currentCheck.special_area_parsed = JSON.parse(
        this.currentCheck.special_area
      );
      this.checkInfoDialog = true;
    }
  },

  computed: {},
  mounted() {
    this.getCompanyCheck();
  }
};
</script>

<style>
</style>
