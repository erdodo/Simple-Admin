<template>
  <div>
    <div class="d-flex justify-content-between my-3">
      <span class="fs-3">
        {{ table_data.table_info?.display }}
      </span>
      <el-button type="primary" @click="addComponent()">Ekle</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="table_data.records"
      table-layout="fixed"
      class="rounded"
      style="width: 100%; height: 70vh"
      default-expand-all
      lazy
    >
      <template v-for="clm in table_data.fields" :key="clm.id">
        <template v-if="columns_settings?.[clm.name]?.visible == false"></template>
        <template v-else-if="hide_columns.find((e) => e == clm.name)"></template>
        <el-table-column v-else :prop="clm.name">
          <template #header>
            <span class="text-nowrap">{{ clm.display }}</span>
          </template>
          <template #default="scope">
            <show_record :data="scope.row" :clm="clm"></show_record>
          </template>
        </el-table-column>
      </template>
      <el-table-column :fixed="width > 500 ? 'right' : undefined" width="70">
        <template #header> İşlem </template>
        <template #default="scope">
          <el-dropdown>
            <el-button plain> <i class="bi bi-pencil-square"></i></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="detailComponent(scope.row)">Detay</el-dropdown-item>
                <el-dropdown-item @click="editComponent(scope.row)">Düzenle</el-dropdown-item>
                <el-dropdown-item divided class="text-danger" @click="deleteEvent(scope.row.id)">Sil</el-dropdown-item>
                <el-dropdown-item divided>
                  <div class="d-flex flex-column">
                    <el-tooltip
                      class="box-item"
                      effect="light"
                      :content="'Eklenme Zamanı:  ' + scope.row.created_at"
                      placement="left"
                    >
                      <div class="d-flex flex-column">
                        <label>Ekleyen:</label>
                        <span>{{ scope.row.own_id.name }} {{ scope.row.own_id.surname }}</span>
                      </div>
                    </el-tooltip>

                    <el-divider class="my-1"></el-divider>
                    <el-tooltip
                      class="box-item"
                      effect="light"
                      :content="'Güncellenme Zamanı:  ' + scope.row.updated_at"
                      placement="left"
                    >
                      <div class="d-flex flex-column">
                        <label>Güncelleyen:</label>
                        <span>{{ scope.row.user_id.name }} {{ scope.row.user_id.surname }}</span>
                      </div>
                    </el-tooltip>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <dual v-model:visible="dual_dialog_visible" :config="dual_config"></dual>
    <detail v-model:visible="detail_dialog_visible" :config="detail_config"></detail>
  </div>
</template>

<script>
import services from "@/services";
import columns_settings_all from "./columns_settings";
import dual from "@/views/services/dual";
import Detail from "./detail.vue";
import show_record from "@/components/show_record.vue";
export default {
  components: { dual, Detail, show_record },
  data() {
    return {
      table_data: {},
      loading: true,
      columns_settings: {},
      hide_columns: ["own_id", "id", "user_id", "updated_at", "created_at"],
      dual_dialog_visible: false,
      dual_config: {},
      detail_dialog_visible: false,
      detail_config: {},
      width: 0,
    };
  },
  mounted() {
    this.getData();
    this.width = window.innerWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
  },
  watch: {
    $route() {
      this.getData();
    },
  },
  methods: {
    getData() {
      this.loading = true;
      this.columns_settings = columns_settings_all[this.$route.params.table_name];
      const params = {
        limit: 50,
      };
      services.list(this.$route.params.table_name, params).then((res) => {
        this.table_data = res;
        this.loading = false;
      });
    },
    addComponent() {
      this.dual_dialog_visible = true;
      this.dual_config = {
        type: "create",
        table_info: this.table_data.table_info,
      };
    },
    detailComponent(data) {
      this.detail_dialog_visible = true;
      this.detail_config = {
        table_info: this.table_data.table_info,
        data: data,
      };
    },
    editComponent(data) {
      this.dual_dialog_visible = true;
      this.dual_config = {
        type: "edit",
        table_info: this.table_data.table_info,
        data: data,
      };
    },
    deleteEvent(id) {
      //this.services.clean(this.$route.params.table_name, id);
    },
  },
};
</script>

<style></style>
