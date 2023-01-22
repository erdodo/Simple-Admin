<template>
  <el-dialog
    v-model="dialogVisible"
    :title="config?.table_info?.display + ' Tablosu Detay'"
    width="400px"
    :before-close="handleClose"
    draggable
  >
    <template v-for="clm in columns" :key="clm.id">
      <div class="d-flex">
        <span class="me-2">{{ clm.display }}:</span>
        <show_record :data="params" :clm="clm"></show_record>
      </div>
      <el-divider border-style="dashed" class="my-3"></el-divider>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import inputs from "./inputs.vue";
import services from "@/services";
import show_record from "@/components/show_record";
export default {
  components: { inputs, show_record },
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
      this.getData();
    },
    dialogVisible(v) {
      this.$emit("update:visible", v);
    },
  },
  methods: {
    getData() {
      this.services.show(this.$route.params.table_name, this.config.data.id).then((res) => {
        this.columns = res.fields;
        this.params = res.data;
      });
    },
  },
};
</script>

<style></style>
