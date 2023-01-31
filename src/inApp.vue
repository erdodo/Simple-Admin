<template>
  <div class="app-body">
    <div class="">
      <el-container>
        <el-aside width="auto"><Aside></Aside></el-aside>
        <el-container class="w-100 container">
          <Header></Header>

          <router-view></router-view>

          <el-footer>Footer</el-footer>
        </el-container>
        <el-aside v-if="false" width="auto">Right side</el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
import Aside from "@/layout/Aside.vue";
import Header from "./layout/Header.vue";

import services from "@/services";
import { mapGetters } from "vuex";
export default {
  components: { Aside, Header },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["get_token"]),
  },
  mounted() {
    if (this.get_token) {
      services.system_control();
      this.g.dispatch("cache_api");
    }
  },
};
</script>

<style></style>
