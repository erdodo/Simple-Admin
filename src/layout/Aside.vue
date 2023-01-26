<template>
  <div class="position-relative d-none d-md-block" :style="isCollapse ? 'width:65px' : 'width:230px'">
    <el-menu :default-active="$route.fullPath" router style="height: 100vh" class="position-fixed" :collapse="isCollapse">
      <el-menu-item index="/">
        <img src="/vendor/img/Simple.png" style="width: 25px" alt="" />
        <template #title><span class="mx-3 fs-3">Simple</span></template>
      </el-menu-item>
      <el-sub-menu v-for="m in menu" :key="m.id" :index="m.id">
        <template #title>
          <el-icon v-html="m.icon"></el-icon>
          <span>{{ m.display }}</span>
        </template>

        <el-menu-item v-for="t in m.table_group_tables" :index="'/list/' + t.name" :key="t">
          {{ t.display }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-if="isCollapse" class="postion-relative">
        <div class="position-absolute start-0 w-100 h-100" @click="isCollapse = !isCollapse"></div>
        <el-icon @click="isCollapse = !isCollapse"><i class="bi bi-arrow-right-square"></i></el-icon>
        <template #title>
          <span @click="isCollapse = !isCollapse">Menü'yü Aç</span>
        </template>
      </el-menu-item>
      <el-menu-item v-else class="postion-relative">
        <div class="position-absolute start-0 w-100 h-100" @click="isCollapse = !isCollapse"></div>
        <el-icon @click="isCollapse = !isCollapse"><i class="bi bi-arrow-left-square"></i></el-icon>
        <template #title>
          <span @click="isCollapse = !isCollapse">Menü'yü Kapat</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
  <div v-show="getMenuState == true" class="d-md-none position-relative">
    <el-menu
      :default-active="$route.fullPath"
      router
      style="height: 100vh; background-color: var(--bs-body-bg); z-index: 4"
      class="position-fixed"
      :collapse="false"
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

        <el-menu-item v-for="t in m.table_group_tables" :index="'/list/' + t.name" :key="t">
          {{ t.display }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item class="postion-relative">
        <div class="position-absolute start-0 w-100 h-100" @click="$store.commit('setMenuState', false)"></div>
        <i class="bi bi-arrow-left-square ms-1"></i>
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
    this.menu = JSON.parse(localStorage.getItem("cache"))?.table_group;
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
