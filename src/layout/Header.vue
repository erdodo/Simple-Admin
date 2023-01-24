<template>
  <div class="mt-2 d-flex justify-content-between">
    <el-button type="primary" class="d-md-none" plain @click="$store.commit('setMenuState', true)"
      ><i class="bi bi-list"></i
    ></el-button>
    <div></div>
    <el-button plain size="large" circle @click="changeTheme()">
      <i v-if="dark_theme" class="bi bi-moon-stars-fill text-primary"></i>
      <i v-else class="bi bi-brightness-high-fill"></i>
    </el-button>
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
  },
};
</script>

<style></style>
