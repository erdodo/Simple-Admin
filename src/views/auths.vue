<template>
  <div class="row w-100" style="height: 100vh">
    <div class="d-none d-lg-block col-lg-6 p-0 p-xl-5">
      <img src="/vendor/img/login.png" class="w-100 h-100 p-5" style="object-fit: contain" />
    </div>
    <div class="col-12 col-lg-6 h-100 position-relative">
      <div class="position-absolute end-0 m-3">
        <el-button plain size="large" circle class="" v-tooltip="'Tema değiştir'" @click="g.commit('changeTheme')">
          <i v-if="g.getters.get_dark_theme" class="bi bi-moon-stars-fill text-primary"></i>
          <i v-else class="bi bi-brightness-high-fill"></i>
        </el-button>
      </div>
      <div class="d-flex justify-content-center align-items-center h-100">
        <div class="d-flex flex-column" style="width: 300px">
          <span class="fs-4 text-primary">Hoşgeldin {{ user?.data?.name }} {{ user?.data?.surname }}</span>
          <br />
          <label class="mb-1">Eposta:</label>
          <el-input v-model="email" @keypress.enter="login" placeholder=""></el-input>
          <label class="mb-1" v-if="user != null">Şifre:</label>
          <el-input v-model="password" type="password" show-password v-if="user != null" @keypress.enter="login"></el-input>
          <el-button class="mt-3 w-100" type="primary" @click="login()">Giriş</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "admin@erdoganyesil.com.tr",
      password: "",
      user: null,
    };
  },
  mounted() {},
  methods: {
    login() {
      this.services.auths.login(this.email, this.password).then((res) => {
        this.user = res;
      });
    },
  },
};
</script>

<style></style>
