<template>
  <div class="my-1">
    <label v-if="label">{{ clm.display }}:{{ clm.type }}</label>

    <template v-if="clm.type == 'sort_text'">
      <sort-text v-model="value" v-model:params="inparams" :clm="clm"></sort-text>
    </template>
  </div>
</template>

<script>
import sortText from "./inputs/sort_text.vue";
export default {
  components: { sortText },
  props: ["clm", "modelValue", "label"],
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
