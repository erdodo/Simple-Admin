<template>
  <div class="position-relative d-none d-md-block" :style="isCollapse ? 'width:65px' : 'width:230px'">
    <el-menu :default-active="$route.fullPath" router style="height: 100vh" class="position-fixed" :collapse="isCollapse">
      <el-menu-item index="/">
        <img src="/vendor/img/Simple.png" style="width: 25px" alt="" />
        <template #title><span class="mx-3 fs-3">Simple</span></template>
      </el-menu-item>
      <el-sub-menu v-for="m in menu" :key="m.id" :index="m.id">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ m.display }}</span>
        </template>

        <el-menu-item v-for="t in m.table_name" :index="'/list/' + t.name" :key="t">
          {{ t.display }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-if="isCollapse">
        <i class="bi bi-arrow-right-square ms-1" @click="isCollapse = !isCollapse"></i>
        <template #title>
          <span class="ms-2" @click="isCollapse = !isCollapse">Menü'yü Aç</span>
        </template>
      </el-menu-item>
      <el-menu-item v-else>
        <i class="bi bi-arrow-left-square ms-1" @click="isCollapse = !isCollapse"></i>
        <template #title>
          <span class="ms-3" @click="isCollapse = !isCollapse">Menü'yü Kapat</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
  <div v-show="getMenuState == true" class="d-md-none position-relative">
    <el-menu
      :default-active="$route.fullPath"
      router
      style="height: 100vh; background-color: var(--bs-body-bg); z-index: 3"
      class="position-fixed"
      :collapse="isCollapse"
    >
      <el-menu-item index="/">
        <img src="/vendor/img/Simple.png" style="width: 25px" alt="" />
        <template #title><span class="mx-3 fs-3">Simple</span></template>
      </el-menu-item>
      <el-sub-menu v-for="m in menu" :key="m.id" :index="m.id">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ m.display }}</span>
        </template>

        <el-menu-item v-for="t in m.table_name" :index="'/list/' + t.name" :key="t">
          {{ t.display }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item>
        <i class="bi bi-arrow-left-square ms-1" @click="$store.commit('setMenuState', false)"></i>
        <template #title>
          <span class="ms-3" @click="$store.commit('setMenuState', false)">Menü'yü Kapat</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { Document, Menu, Location, Setting } from "@element-plus/icons-vue";
import services from "@/services";
import { mapGetters } from "vuex";
export default {
  components: { Document, Menu, Location, Setting },
  data() {
    return {
      isCollapse: false,
      menu: {},
    };
  },
  computed: {
    ...mapGetters(["getMenuState"]),
  },
  watch: {
    $route() {
      this.$store.commit("setMenuState", false);
    },
  },
  mounted() {
    services.get_cache().then((res) => {
      this.menu = res.table_group;
    });
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
