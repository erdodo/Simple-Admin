<template>
  <div class="inputs-float">
    <el-input-number v-model="value" :precision="2" :step="1" controls-position="right" class="w-100" />
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
