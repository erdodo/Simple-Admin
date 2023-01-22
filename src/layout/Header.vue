<template>
  <div body-style="padding:10px" class="mt-2">
    <el-button type="primary" class="d-md-none" plain @click="$store.commit('setMenuState', true)"
      ><i class="bi bi-list"></i
    ></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
