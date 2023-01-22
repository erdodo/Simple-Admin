<template>
  <div>
    <template v-if="clm.relation_table != null">
      <el-select v-model="value" placeholder="" class="w-100">
        <el-option v-for="(e, k) in enums" :key="k" :value="k" :label="e.show"></el-option>
      </el-select>
    </template>
    <template v-else>
      <el-input v-model="value" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="" />
    </template>
  </div>
</template>

<script>
export default {
  props: ["modelValue", "clm", "enums"],
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
