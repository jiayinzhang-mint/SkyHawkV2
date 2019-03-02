<template>
  <div>
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-bold">今日</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>print</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <v-card-title>
                <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
                <v-layout column align-start>
                  <div class="body-2 font-weigth-bold mb-1">待处理告警</div>
                  <div>
                    <span class="display-3 font-weight-bold">87</span>
                    <strong>&nbsp;&nbsp;起</strong>
                  </div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon class="align-self-start" size="28">
                  <v-icon>arrow_forward</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <v-card-title>
                <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
                <v-layout column align-start>
                  <div class="body-2 font-weigth-bold mb-1">设备在线</div>
                  <div>
                    <span class="display-3 font-weight-bold">99.3</span>
                    <strong>&nbsp;&nbsp;%</strong>
                  </div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon class="align-self-start" size="28">
                  <v-icon>arrow_forward</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <v-card-title>
                <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
                <v-layout column align-start>
                  <div class="body-2 font-weigth-bold mb-1">用户在线</div>
                  <div>
                    <span class="display-3 font-weight-bold">98.1</span>
                    <strong>&nbsp;&nbsp;%</strong>
                  </div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon class="align-self-start" size="28">
                  <v-icon>arrow_forward</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-bold">昨日</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <v-card-title>
                <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
                <v-layout column align-start>
                  <div class="body-2 font-weigth-bold mb-1">告警数</div>
                  <div>
                    <span class="display-3 font-weight-bold">120</span>
                    <strong>&nbsp;&nbsp;次</strong>
                  </div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon class="align-self-start" size="28">
                  <v-icon>arrow_forward</v-icon>
                </v-btn>
              </v-card-title>
              <v-sheet color="transparent">
                <v-sparkline
                  :smooth="16"
                  :line-width="3"
                  padding="15"
                  color="white"
                  :value="heartbeats"
                  auto-draw
                  stroke-linecap="round"
                ></v-sparkline>
              </v-sheet>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <v-card-title>
                <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
                <v-layout column align-start>
                  <div class="body-2 font-weigth-bold mb-1">涉及企业</div>
                  <div>
                    <span class="display-3 font-weight-bold">98</span>
                    <strong>&nbsp;&nbsp;家</strong>
                  </div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon class="align-self-start" size="28">
                  <v-icon>arrow_forward</v-icon>
                </v-btn>
              </v-card-title>
              <v-sheet color="transparent">
                <v-sparkline
                  :smooth="16"
                  :line-width="3"
                  padding="15"
                  color="white"
                  :value="heartbeats"
                  auto-draw
                  stroke-linecap="round"
                ></v-sparkline>
              </v-sheet>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <v-card-title>
                <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
                <v-layout column align-start>
                  <div class="body-2 font-weigth-bold mb-1">处理率</div>
                  <div>
                    <span class="display-3 font-weight-bold">60</span>
                    <strong>&nbsp;&nbsp;%</strong>
                  </div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon class="align-self-start" size="28">
                  <v-icon>arrow_forward</v-icon>
                </v-btn>
              </v-card-title>
              <v-sheet color="transparent">
                <v-sparkline
                  :smooth="16"
                  :line-width="3"
                  padding="15"
                  color="white"
                  :value="heartbeats"
                  auto-draw
                  stroke-linecap="round"
                ></v-sparkline>
              </v-sheet>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <v-card-title>
                <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
                <v-layout column align-start>
                  <div class="body-2 font-weigth-bold mb-1">误报率</div>
                  <div>
                    <span class="display-3 font-weight-bold">60</span>
                    <strong>&nbsp;&nbsp;%</strong>
                  </div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon class="align-self-start" size="28">
                  <v-icon>arrow_forward</v-icon>
                </v-btn>
              </v-card-title>
              <v-sheet color="transparent">
                <v-sparkline
                  :smooth="16"
                  :line-width="3"
                  padding="15"
                  color="white"
                  :value="heartbeats"
                  auto-draw
                  stroke-linecap="round"
                ></v-sparkline>
              </v-sheet>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heartbeats: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
    };
  }
};
</script>

<style>
.v-card__title {
  padding: 15px;
}
</style>
