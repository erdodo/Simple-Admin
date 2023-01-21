<template>
  <div>
    <template v-if="clm.lang_support == '1'">
      <template class="d-flex" v-for="v in langs_data" :key="v.name">
        <div class="d-flex align-items-center">
          <span class="text-nowrap col-2">{{ v.display }}: </span>
          <el-input class="my-1" v-model="lang_value[v.name]" @keyup="langChange()" placeholder=""></el-input>
        </div>
      </template>
    </template>
    <template v-else>
      <el-input v-model="value" placeholder=""></el-input>
    </template>
  </div>
</template>

<script>
import services from "@/services";
export default {
  props: ["modelValue", "clm"],
  data() {
    return {
      value: null,
      lang_value: {},
      langs_data: [],
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
    this.getLang();
  },
  methods: {
    getLang() {
      services.get_cache().then((res) => {
        this.langs_data = res.tables.list.language;
      });
    },
    langChange() {
      this.value = JSON.stringify(this.lang_value);
      this.$emit("update:modelValue", this.value);
    },
  },
};
</script>

<style></style>
