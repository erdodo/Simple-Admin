<template>
  <div class="row w-100" style="height: 100vh">
    <div class="d-none d-lg-block col-lg-6">Resim falan</div>
    <div class="col-12 col-lg-6 h-100">
      <div class="d-flex justify-content-center align-items-center h-100">
        <div class="f-flex flex-column">
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
      email: "erdoganyesil3@gmail.com",
      password: "",
      user: null,
    };
  },
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
