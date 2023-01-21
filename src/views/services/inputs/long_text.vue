<template>
  <div class="inputs-float">
    <el-input v-model="value" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="" />
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
  methods: {},
};
</script>

<style></style>
