<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"></v-stepper-step>
      </v-stepper-header>

      <v-stepper-items style="height:calc(100vh - 72px;overflow:auto">
        <v-stepper-content step="1">
          <v-container>
            <h3 class="mb-3">所有区域</h3>
            <div v-for="(item,i) in allAreaForm" :key="i">
              <small>{{item.text}}</small>
              <v-textarea v-model="all_area[i]" class="mt-2" auto-grow label="巡查结果" rows="1"></v-textarea>
              <v-divider class="mb-4"></v-divider>
            </div>
            <v-layout justify-center>
              <v-btn round color="primary darken-1" @click="goNext">下一步</v-btn>
            </v-layout>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-container>
            <h3 class="mb-3">加工烹饪区</h3>
            <div v-for="(item,i) in cookingAreaForm" :key="i">
              <small>{{item.text}}</small>
              <v-textarea v-model="cooking_area[i]" class="mt-2" auto-grow label="巡查结果" rows="1"></v-textarea>
              <v-divider class="mb-4"></v-divider>
            </div>
            <v-layout justify-center>
              <v-btn round color="primary darken-1" @click="goNext">下一步</v-btn>
            </v-layout>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-container>
            <h3 class="mb-3">专间</h3>
            <div v-for="(item,i) in specialAreaForm" :key="i">
              <small>{{item.text}}</small>
              <v-textarea v-model="special_area[i]" class="mt-2" auto-grow label="巡查结果" rows="1"></v-textarea>
              <v-divider class="mb-4"></v-divider>
            </div>
            <v-layout justify-center>
              <v-btn round color="primary darken-1" @click="submit">提交</v-btn>
            </v-layout>
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import companyService from "../../service/CompanyService";

export default {
  data() {
    return {
      e1: 1,
      all_area: [],
      cooking_area: [],
      special_area: [],
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
    };
  },
  methods: {
    goNext() {
      this.e1 += 1;
    },
    getCurrentCompany() {
      this.currentCompany = this.companyList.find(element => {
        return element.id == this.$route.params.companyId;
      });
    },
    submit() {
      console.log(this.all_area);
      console.log(this.cooking_area);
      console.log(this.special_area);
      companyService.submitDailyCheck(
        this.$route.params.companyId,
        this.currentCompany.station,
        JSON.stringify(this.all_area),
        JSON.stringify(this.cooking_area),
        JSON.stringify(this.special_area)
      );
    }
  },
  computed: {
    ...mapGetters({
      companyList: "company/companyList"
    })
  },
  mounted() {
    this.getCurrentCompany();
    console.log(this.currentCompany);
  }
};
</script>

<style>
</style>
