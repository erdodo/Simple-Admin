<template>
  <div class="inputs-float">
    <el-switch
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      inline-prompt
      :active-icon="Check"
      :inactive-icon="Close"
    />
  </div>
</template>

<script>
import { Check, Close } from "@element-plus/icons-vue";

export default {
  props: ["modelValue", "clm"],
  data() {
    return {
      value: false,
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
    // this.value = this.modelValue;
  },
  methods: {},
  components: {
    Check,
    Close,
  },
};
</script>

<style></style>
