<template>
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
</template>

<script>
export default {};
</script>

<style>
</style>
