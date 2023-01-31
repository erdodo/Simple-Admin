<template>
  <div class="my-1" v-tooltip="clm.description ? clm.description : null">
    <label v-if="label">{{ clm.display }}:</label>
    <template v-if="clm.type == 'sort_text'">
      <sort-text
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></sort-text>
    </template>
    <template v-else-if="clm.type == 'long_text'">
      <long_text
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></long_text>
    </template>
    <template v-else-if="clm.type == 'number'">
      <number
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></number>
    </template>
    <template v-else-if="clm.type == 'email'">
      <email
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></email>
    </template>
    <template v-else-if="clm.type == 'phone'">
      <phone
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></phone>
    </template>
    <template v-else-if="clm.type == 'password'">
      <pass
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></pass>
    </template>
    <template v-else-if="clm.type == 'float'">
      <float :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :clm="clm"></float>
    </template>
    <template v-else-if="clm.type == 'bool'">
      <bool :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :clm="clm"></bool>
    </template>
    <template v-else-if="clm.type == 'file'">
      <file
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
        :params="params"
        @params="params = $event"
      ></file>
    </template>
    <template v-else-if="clm.type == 'image'">
      <imageInputs
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
        :params="params"
        @params="params = $event"
      ></imageInputs>
    </template>
    <template v-else-if="clm.type == 'array'">
      <array
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></array>
    </template>
    <template v-else-if="clm.type == 'date'">
      <date
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></date>
    </template>
    <template v-else-if="clm.type == 'datetime'">
      <datetime
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :clm="clm"
        :enums="enums"
      ></datetime>
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
import date from "@/views/services/inputs/date";
import datetime from "@/views/services/inputs/datetime";

import services from "@/services";
export default {
  components: { sortText, long_text, float, number, bool, file, array, email, phone, pass, imageInputs, date, datetime },
  props: ["clm", "modelValue", "label", "params"],
  data() {
    return {
      enums: [],
    };
  },
  watch: {},
  mounted() {
    if (this.clm.relation_table != null) {
      services.get_enums(this.$route.params.table_name, this.clm.name).then((res) => {
        this.enums = res.records;
      });
    }
  },
};
</script>

<style></style>
