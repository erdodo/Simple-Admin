<template>
  <div class="mt-2 d-flex justify-content-between">
    <el-button type="primary" class="d-md-none" plain @click="$store.commit('setMenuState', true)"
      ><i class="bi bi-list"></i
    ></el-button>
    <div></div>
    <div>
      <el-button plain size="large" circle @click="cacheClear()" v-tooltip="'Yedekleme yenile'">
        <i class="bi bi-eraser"></i>
      </el-button>

      <el-button plain size="large" circle class="ms-2" v-tooltip="'Tema değiştir'" @click="changeTheme()">
        <i v-if="dark_theme" class="bi bi-moon-stars-fill text-primary"></i>
        <i v-else class="bi bi-brightness-high-fill"></i>
      </el-button>
      <el-dropdown>
        <el-button plain size="large" class="ms-2" circle>
          <i class="bi bi-person"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Profil</el-dropdown-item>
            <el-dropdown-item>Ayarlar</el-dropdown-item>
            <el-dropdown-item>Firma</el-dropdown-item>

            <el-dropdown-item divided class="text-danger" @click="logout()">Çıkış</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dark_theme: true,
    };
  },
  mounted() {
    let localTheme = localStorage.getItem("theme");
    this.dark_theme = localTheme == null || localTheme == "dark";
  },
  methods: {
    changeTheme() {
      let newTheme = this.dark_theme ? "light" : "dark";
      this.dark_theme = !this.dark_theme;
      let html = document.getElementById("html");
      html.className = newTheme;
      html.attributes["data-bs-theme"].value = newTheme;
      localStorage.setItem("theme", newTheme);
    },
    logout() {
      this.services.auths.logout();
    },
    cacheClear() {
      localStorage.setItem("cache_status", "true");
      localStorage.removeItem("cache");
      this.services.get_cache();
    },
  },
};
</script>

<style></style>
