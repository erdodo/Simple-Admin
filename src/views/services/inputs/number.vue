<template>
  <div>
    <template v-if="clm.enums != null">
      <el-select v-model="value" placeholder="" class="w-100">
        <el-option v-for="e in JSON.parse(clm.enums)" :key="e" :value="e"></el-option>
      </el-select>
    </template>
    <template v-if="clm.relation_table != null">
      <el-select v-model="value" placeholder="" class="w-100">
        <el-option v-for="(e, k) in enums" :key="k" :value="k" :label="e.show"></el-option>
      </el-select>
    </template>

    <template v-else>
      <el-input-number v-model="value" :step="1" controls-position="right" class="w-100" />
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
  methods: {
    langChange() {
      this.value = JSON.stringify(this.lang_value);
      this.$emit("update:modelValue", this.value);
    },
  },
};
</script>

<style></style>
