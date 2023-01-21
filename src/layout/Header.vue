<template>
  <el-card body-style="padding:10px" class="mt-2">
    <el-button type="primary" plain @click="$store.commit('setMenuState', true)">M</el-button>
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
