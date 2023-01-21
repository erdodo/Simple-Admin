<template>
  <div class="my-1" v-tooltip="clm.description ? clm.description : null">
    <label v-if="label">{{ clm.display }}:</label>
    <template v-if="clm.type == 'sort_text'">
      <sort-text v-model="value" :clm="clm"></sort-text>
    </template>
    <template v-else-if="clm.type == 'float'">
      <float v-model="value" :clm="clm"></float>
    </template>
    <template v-else-if="clm.type == 'bool'">
      <bool v-model="value" :clm="clm"></bool>
    </template>
    <template v-else-if="clm.type == 'long_text'">
      <long_text v-model="value" :clm="clm"></long_text>
    </template>
    <template v-else-if="clm.type == 'array'">
      <array v-model="value" :clm="clm" :enums="enums"></array>
    </template>
  </div>
</template>

<script>
import sortText from "./inputs/sort_text.vue";
import long_text from "@/views/services/inputs/long_text";
import float from "@/views/services/inputs/float";
import bool from "@/views/services/inputs/bool";
import array from "@/views/services/inputs/array";

import services from "@/services";
export default {
  components: { sortText, long_text, float, bool, array },
  props: ["clm", "modelValue", "label"],
  data() {
    return {
      value: null,
      enums: [],
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
    if (this.clm.relation_table != null) {
      services.get_enums(this.$route.params.table_name, this.clm.name).then((res) => {
        this.enums = res.records;
      });
    }
  },
};
</script>

<style></style>
