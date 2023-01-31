<template>
  <div class="mt-2 d-flex justify-content-between">
    <el-button type="primary" class="d-md-none" plain @click="$store.commit('setMenuState', true)"
      ><i class="bi bi-list"></i
    ></el-button>
    <div></div>
    <div>
      <el-button type="" @click="bildirim()">Test</el-button>
      <el-button plain size="large" circle @click="cacheClear()" v-tooltip="'Yedekleme yenile'">
        <i class="bi bi-eraser"></i>
      </el-button>

      <el-button plain size="large" circle class="ms-2" v-tooltip="'Tema değiştir'" @click="g.commit('changeTheme')">
        <i v-if="g.getters.get_dark_theme" class="bi bi-moon-stars-fill text-primary"></i>
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
import axios from "axios";
export default {
  data() {
    return {
      dark_theme: true,
    };
  },

  methods: {
    logout() {
      this.services.auths.logout();
    },
    cacheClear() {
      localStorage.setItem("cache_status", "true");
      localStorage.removeItem("cache");
      this.g.dispatch("cache_api");
    },
    bildirim() {
      var config = {
        headers: {
          token: this.$store.getters.get_token,
        },
      };
      axios.post("https://backend.erdoganyesil.com.tr/cron/send_notification", [], config);
    },
  },
};
</script>

<style></style>
