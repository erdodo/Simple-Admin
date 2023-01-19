<template>
  <div class="app-body">
    <div class="">
      <el-container>
        <el-aside width="auto"><Aside></Aside></el-aside>
        <el-container class="w-100">
          <el-header><Header></Header></el-header>
          <el-main v-if="true">
            <div v-for="i in 100" :key="i" class="h1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam molestias, unde, beatae et consequuntur
              eligendi odio aperiam ut eos dolore praesentium sunt delectus nesciunt facere! Atque, error? Modi, voluptate
              dolorum.
            </div>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
        <el-aside width="auto">Right side</el-aside>
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
