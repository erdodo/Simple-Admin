<template>
  <div>
    <div class="d-flex justify-content-between my-3">
      <span class="fs-3">
        {{ table_data.table_info?.display }}
      </span>
      <el-button type="primary" @click="addComponent()">Ekle</el-button>
    </div>
    <el-table v-loading="loading" :data="table_data.records" style="width: 100%; max-height: 90vh" default-expand-all lazy>
      <template v-for="clm in table_data.fields" :key="clm.id">
        <template v-if="columns_settings?.[clm.name]?.visible == false"></template>
        <template v-else-if="hide_columns.find((e) => e == clm.name)"></template>
        <el-table-column v-else :prop="clm.name" :label="clm.display" width="180">
          <template #default="scope">
            <!--BOŞ VERİ-->
            <span v-if="scope.row[clm.name] == null || scope.row[clm.name].length <= 0">Boş</span>
            <!--OBJECT VERİ-->
            <span v-else-if="typeof scope.row[clm.name] == typeof {}">
              <el-dropdown>
                <span class="el-dropdown-link"> Detay </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-for="(d, k) in scope.row[clm.name]" :key="k">{{ k }}: {{ d }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </span>
            <!--BOOLEAND VERİ-->
            <span v-else-if="clm.type == 'bool'">
              <i v-if="clm.type" class="bi bi-check-circle"></i>
              <i v-else class="bi bi-x-circle"></i>
            </span>
            <!--DİĞERLERİ-->
            <span v-else>{{ scope.row[clm.name] }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column fixed="right" width="70">
        <template #header> İşlem </template>
        <template #default="scope">
          <el-dropdown>
            <el-button plain> <i class="bi bi-pencil-square"></i></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Detay</el-dropdown-item>
                <el-dropdown-item>Düzenle</el-dropdown-item>
                <el-dropdown-item divided class="text-danger">Sil</el-dropdown-item>
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
  </div>
</template>

<script>
import services from "@/services";
import columns_settings_all from "./columns_settings";
import dual from "@/views/services/dual";
export default {
  components: { dual },
  data() {
    return {
      table_data: {},
      loading: true,
      columns_settings: {},
      hide_columns: ["own_id", "id", "user_id", "updated_at", "created_at"],
      dual_dialog_visible: false,
      dual_config: {},
    };
  },
  mounted() {
    this.getData();
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
        limit: 10,
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
  },
};
</script>

<style></style>
