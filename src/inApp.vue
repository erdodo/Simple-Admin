<template>
  <div class="app-body">
    <div class="">
      <el-container>
        <el-aside width="auto"><Aside></Aside></el-aside>
        <el-container class="w-100 container">
          <el-header><Header></Header></el-header>
          <el-main class="p-0" v-if="true">
            <router-view></router-view>
          </el-main>
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
export default {
  components: { Aside, Header },
};
</script>

<style></style>
