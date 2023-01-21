<template>
  <el-dialog
    v-model="dialogVisible"
    :title="config.table_info?.display + '  ' + inconfig.title"
    width="400px"
    :before-close="handleClose"
  >
    <template v-for="clm in columns" :key="clm.id">
      <inputs v-model="params[clm.name]" :label="true" :clm="clm"></inputs>
    </template>
    {{ params }}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import inputs from "./inputs.vue";
import services from "@/services";
export default {
  components: { inputs },
  props: ["visible", "config"],
  data() {
    return {
      dialogVisible: false,
      inconfig: {
        title: "",
      },
      params: {},
      columns: {},
    };
  },
  watch: {
    visible(v) {
      this.dialogVisible = v;
      this.inconfig.title = this.config.type == "create" ? "Ekle" : "Düzenle";
      this.getData();
    },
    dialogVisible(v) {
      this.$emit("update:visible", v);
    },
  },
  methods: {
    getData() {
      if (this.config.type == "create") {
        services.create(this.$route.params.table_name).then((res) => {
          this.columns = res.fields;
        });
      }
    },
  },
};
</script>

<style></style>
