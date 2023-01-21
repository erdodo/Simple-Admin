<template>
  <div class="">
    <template v-if="clm.enums != null">
      <el-select v-model="value" placeholder="" multiple class="w-100">
        <el-option v-for="e in JSON.parse(clm.enums)" :key="e" :value="e"></el-option>
      </el-select>
    </template>
    <template v-else>
      <el-select
        class="w-100"
        v-model="value"
        multiple
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
      >
        <el-option v-for="(item, clm) in enums" :key="clm" :label="item" :value="clm" />
      </el-select>
    </template>
  </div>
</template>

<script>
export default {
  props: ["modelValue", "clm", "enums"],
  data() {
    return {
      value: [],
    };
  },
  watch: {
    value(v) {
      this.$emit("update:modelValue", JSON.stringify(v));
    },
    modelValue(v) {
      this.value = JSON.parse(v);
    },
  },
  mounted() {
    this.value = this.modelValue;
  },
  methods: {},
};
</script>

<style></style>
