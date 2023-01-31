<template>
  <div>
    <template v-if="clm.enums != null">
      <el-select
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        class="w-100"
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
      >
        <el-option v-for="e in JSON.parse(clm.enums)" :key="e" :value="e"></el-option>
      </el-select>
    </template>
    <template v-else-if="clm.relation_table != null">
      <el-select
        class="w-100"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        filterable
        allow-create
      >
        <template v-for="(item, clm) in enums" :key="clm">
          <el-option :label="item.show" :value="clm" />
        </template>
      </el-select>
    </template>
    <template v-else-if="clm.lang_support == '1'">
      <template class="d-flex" v-for="v in get_cache.tables.list.language" :key="v.name">
        <div class="d-flex align-items-center">
          <span class="text-nowrap col-2">{{ v.display }}: </span>
          <el-input class="my-1" v-model="lang_value[v.name]" @keyup="langChange()" placeholder=""></el-input>
        </div>
      </template>
    </template>
    <template v-else>
      <el-date-picker class="w-100" v-model="value" type="datetime" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["modelValue", "clm", "enums"],
  data() {
    return {
      value: null,
      lang_value: {},
    };
  },
  watch: {
    value(v) {
      this.$emit("update:modelValue", v);
    },
    modelValue(v) {
      if (this.clm.lang_support == 1 && v != "") {
        this.lang_value = JSON.parse(v);
      }
      this.value = v;
    },
  },
  computed: {
    ...mapGetters(["get_cache"]),
  },
  mounted() {
    if (this.clm.lang_support == 1) {
      if (this.modelValue == "" || this.modelValue == null || this.modelValue == undefined) {
        this.lang_value = {};
      } else this.lang_value = JSON.parse(this.modelValue);
    } else {
      this.value = this.modelValue;
    }
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
