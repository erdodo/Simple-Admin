<template>
  <div>
    <el-input v-model="value" placeholder=""></el-input>
  </div>
</template>

<script>
export default {
  props: ["modelValue", "clm"],
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
};
</script>

<style></style>
