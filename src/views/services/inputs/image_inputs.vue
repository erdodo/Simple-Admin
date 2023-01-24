<template>
  <div>
    <div v-if="params['old_' + clm.name] != null" class="d-flex my-2 align-items-center">
      <template v-for="(i, k) in JSON.parse(params['old_' + clm.name])" :key="i">
        <img v-if="i.mini != ''" :src="i.mini_link" style="height: 35px" />
        <a v-else class="cursor-pointer fs-5" download :href="i.full_link"><i class="bi bi-cloud-download"></i></a>
        <i class="bi bi-x-circle text-danger mx-2 cursor-pointer" @click="deleteFile(k)"></i>
        <el-divider direction="vertical"></el-divider>
      </template>
    </div>
    <input type="file" :name="clm.name" :id="clm.name" class="form-control form-control-sm" multiple @change="fileChange" />
  </div>
</template>

<script>
export default {
  props: ["modelValue", "clm", "enums", "params"],
  data() {
    return {
      value: null,
    };
  },
  watch: {
    value(v) {
      this.$emit("update:modelValue", v);
    },
    modelValue(v) {
      this.value = v;
    },
  },
  mounted() {
    this.value = this.modelValue;
  },
  methods: {
    fileChange(e) {
      if (e.target.files.length > this.clm.max_length) {
        this.bildir.warning("Fazla dosya seçtiniz");
        e.target.value = null;
      }
    },
    deleteFile(k) {
      let files = JSON.parse(this.params["old_" + this.clm.name]);
      files.splice(k, 1);
      this.params["old_" + this.clm.name] = JSON.stringify(files);
    },
  },
};
</script>

<style></style>
