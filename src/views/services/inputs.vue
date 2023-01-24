<template>
  <div class="my-1" v-tooltip="clm.description ? clm.description : null">
    <label v-if="label">{{ clm.display }}:</label>
    <template v-if="clm.type == 'sort_text'">
      <sort-text v-model="value" :clm="clm"></sort-text>
    </template>
    <template v-else-if="clm.type == 'long_text'">
      <long_text v-model="value" :clm="clm" :enums="enums"></long_text>
    </template>
    <template v-else-if="clm.type == 'number'">
      <number v-model="value" :clm="clm" :enums="enums"></number>
    </template>
    <template v-else-if="clm.type == 'email'">
      <email v-model="value" :clm="clm" :enums="enums"></email>
    </template>
    <template v-else-if="clm.type == 'phone'">
      <phone v-model="value" :clm="clm" :enums="enums"></phone>
    </template>
    <template v-else-if="clm.type == 'password'">
      <pass v-model="value" :clm="clm" :enums="enums"></pass>
    </template>
    <template v-else-if="clm.type == 'float'">
      <float v-model="value" :clm="clm"></float>
    </template>
    <template v-else-if="clm.type == 'bool'">
      <bool v-model="value" :clm="clm"></bool>
    </template>
    <template v-else-if="clm.type == 'file'">
      <file v-model="value" :clm="clm" :enums="enums" :params="params" @params="params = $event"></file>
    </template>
    <template v-else-if="clm.type == 'image'">
      <imageInputs v-model="value" :clm="clm" :enums="enums" :params="params" @params="params = $event"></imageInputs>
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
import number from "@/views/services/inputs/number";
import bool from "@/views/services/inputs/bool";
import file from "@/views/services/inputs/file";
import array from "@/views/services/inputs/array";
import email from "@/views/services/inputs/email";
import phone from "@/views/services/inputs/phone";
import pass from "@/views/services/inputs/pass";
import imageInputs from "@/views/services/inputs/image_inputs";

import services from "@/services";
export default {
  components: { sortText, long_text, float, number, bool, file, array, email, phone, pass, imageInputs },
  props: ["clm", "modelValue", "label", "params"],
  data() {
    return {
      value: "" || [] || {} || 0,
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
