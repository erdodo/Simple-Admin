<template>
  <el-scrollbar height="100vh">
    <div class="position-relative">
      <app v-if="get_logged_in"></app>
      <auths v-else></auths>
    </div>
  </el-scrollbar>
</template>

<script>
import app from "@/inApp.vue";
import auths from "@/views/auths";

import { mapGetters } from "vuex";
export default {
  components: { app, auths },
  computed: {
    ...mapGetters(["get_logged_in"]),
  },
};
</script>

<style></style>
