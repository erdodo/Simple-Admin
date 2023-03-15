<template>
  <div class="">

    <template v-if="clm.enums != null && clm.enums != 'null' && clm.enums != '[]'">
      {{ clm }}
      <el-select v-model="value" placeholder="" multiple class="w-100">
        <el-option v-for="e in JSON.parse(clm.enums)" :key="e" :value="e"></el-option>
      </el-select>
    </template>
    <template v-else>

      <el-select
        class="w-100"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        multiple
        filterable
        allow-create
      >
        <template v-for="(item, clm) in enums" :key="clm">
          <el-option :label="item.show" :value="clm" />
        </template>
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
