<template>
  <el-dialog
    v-model="dialogVisible"
    :title="config.table_info?.display + '  ' + inconfig.title"
    width="400px"
    :before-close="handleClose"
    draggable
    v-loading="loading"
  >
    <div v-if="loading == false">
      <template v-for="clm in columns" :key="clm.name">
        <inputs v-model="params[clm.name]" :modelValue="params[clm.name]" :params="params" :label="true" :clm="clm"></inputs>
      </template>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveData()"> Confirm </el-button>
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
      loading: true,
    };
  },
  watch: {
    visible(v) {
      this.dialogVisible = v;
      if (v) {
        this.inconfig.title = this.config.type == "create" ? "Ekle" : "Düzenle";
        this.getData().then((res) => {
          this.params = res;
        });
      }
    },
    dialogVisible(v) {
      this.$emit("update:visible", v);
    },
  },
  methods: {
    async getData() {
      this.loading = true;
      let prm = [];
      if (this.config.type == "create") {
        await services.create(this.$route.params.table_name).then((res) => {
          this.columns = res.fields;
          this.params = {};
          this.loading = false;
        });
      }
      if (this.config.type == "edit") {
        this.params = {};
        await services.edit(this.$route.params.table_name, this.config.data.id).then((res) => {
          this.columns = res.fields;
          let params = res.data;
          for (const [key, val] of Object.entries(res.data)) {
            if (this.columns[key]?.type == "bool") {
              params[key] = val == 1 ? true : false;
            } else if (this.columns[key]?.type == "file" || this.columns[key]?.type == "image") {
              params["old_" + key] = val;
              params[key] = null;
            } else if (this.columns[key]?.type == "array" || this.columns[key]?.type == "object") {
              console.log(val);
              if (val == "" || val == undefined || val == null || val == "undefined") {
                params[key] = {};
              } else params[key] = JSON.parse(val);
            } else {
              params[key] = val;
            }
          }
          console.log(params);
          setTimeout(() => {
            this.loading = false;
          }, 100);
          prm = params;
        });
      }
      return prm;
    },
    saveData() {
      if (this.config.type == "create") {
        let formData = new FormData();

        for (const clm of Object.values(this.columns)) {
          if (clm.type == "file") {
            for (const file of Object.values(document.querySelector("#" + clm.name).files)) {
              formData.append(clm.name + "[]", file);
            }
          } else if (clm?.type == "array" || clm.type == "object") {
            formData.append(clm.name, JSON.stringify(this.params[clm.name]));
          } else if (clm?.type == "bool") {
            formData.append(clm.name, this.params[clm.name] ? 1 : 0);
          } else {
            formData.append(clm.name, this.params[clm.name] == undefined ? "" : this.params[clm.name]);
          }
        }
        services.add(this.$route.params.table_name, formData).then((res) => {
          if (res.status == "success") {
            this.bildir.success("Başarıyla Eklendi");
            this.dialogVisible = false;
            this.$emit("success");
          }
        });
      }
      if (this.config.type == "edit") {
        let formData = new FormData();

        for (const clm of Object.values(this.columns)) {
          if (clm.type == "file") {
            formData.append("old_" + clm.name, this.params["old_" + clm.name]);
            for (const file of Object.values(document.querySelector("#" + clm.name).files)) {
              formData.append(clm.name + "[]", file);
            }
          } else if (clm?.type == "array" || clm?.type == "object") {
            formData.append(clm.name, JSON.stringify(this.params[clm.name]));
          } else if (clm?.type == "bool") {
            formData.append(clm.name, this.params[clm.name] ? 1 : 0);
          } else {
            formData.append(clm.name, this.params[clm.name] == undefined ? "" : this.params[clm.name]);
          }
        }
        services.update(this.$route.params.table_name, this.config.data.id, formData).then(() => {
          this.bildir.success("Başarıyla Düzenlendi");
          this.dialogVisible = false;
          this.$emit("success");
        });
      }
    },
  },
};
</script>

<style></style>
