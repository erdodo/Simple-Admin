<template>
  <div class="my-1" v-tooltip="clm.description ? clm.description : null">
    <label v-if="label">{{ clm.display }}:</label>

    <template v-if="clm.type == 'sort_text'">
      <sort-text v-model="value" v-model:params="inparams" :clm="clm"></sort-text>
    </template>
    <template v-if="clm.type == 'float'">
      <float v-model="value" v-model:params="inparams" :clm="clm"></float>
    </template>
    <template v-if="clm.type == 'bool'">
      <bool v-model="value" v-model:params="inparams" :clm="clm"></bool>
    </template>
    <template v-if="clm.type == 'long_text'">
      <long_text v-model="value" v-model:params="inparams" :clm="clm"></long_text>
    </template>
  </div>
</template>

<script>
import sortText from "./inputs/sort_text.vue";
import long_text from "@/views/services/inputs/long_text";
import float from "@/views/services/inputs/float";
import bool from "@/views/services/inputs/bool";
export default {
  components: { sortText, long_text, float, bool },
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
