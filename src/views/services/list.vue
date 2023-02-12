<template>
  <el-card class="my-3">
    <div class="d-flex justify-content-between my-3">
      <span class="fs-3">
        {{ table_data.table_info?.display }}
      </span>
      <div>
        <transition name="el-fade-in">
          <el-button type="danger" v-show="selected_column_length > 0"> Sil</el-button>
        </transition>
        <el-button type="primary" @click="openFilter()">Filtreleme Seçenekleri</el-button>
        <el-button type="primary" @click="addComponent()">Ekle</el-button>
      </div>
    </div>

    <el-table
      v-loading="loading"
      :data="table_data.records"
      table-layout="fixed"
      class="rounded"
      style="width: 100%; height: 70vh"
      default-expand-all
      lazy
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <template v-for="clm in table_data.fields" :key="clm.id">
        <template v-if="columns_settings?.[clm.name]?.visible == false"></template>
        <template v-else-if="hide_columns.find((e) => e == clm.name)"></template>
        <template v-else>
          <el-table-column :prop="clm.name" min-width="150px" max-height="60px">
            <template #header>
              <div class="d-flex flex-column cursor-pointer">
                <div class="d-flex justify-content-between" @click="sortable(clm.name)">
                  <span>{{ clm.display }}</span>
                  <i class="ms-1 bi bi-arrow-down-up"></i>
                </div>
                <inputs v-if="filter_show" v-model="filter_data[clm.name]" :clm="clm"></inputs>
              </div>
            </template>
            <template #default="scope">
              <show_record :data="scope.row" :clm="clm"></show_record>
            </template>
          </el-table-column>
        </template>
      </template>
      <el-table-column :fixed="width > 500 ? 'right' : undefined" width="70">
        <template #header>
          <div class="d-flex flex-column">
            <span class="text-nowrap">İşlem</span>
            <el-button type="primary" @click="filterChange()" v-if="filter_show">Ara</el-button>
          </div>
        </template>
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
    <div class="d-flex justify-content-between flex-wrap my-3">
      <el-pagination
        class="flex-wrap"
        v-model:current-page="table_params.page"
        v-model:page-size="table_params.limit"
        :page-sizes="[10, 25, 50, 100, 250]"
        background="background"
        layout="total, sizes"
        :total="table_data.all_record_count"
        :pager-count="4"
        @size-change="getData()"
        @current-change="getData()"
      />
      <el-pagination
        class="flex-wrap"
        v-model:current-page="table_params.page"
        v-model:page-size="table_params.limit"
        :page-sizes="[10, 25, 50, 100, 250]"
        background="background"
        layout=" prev, pager, next"
        :total="table_data.all_record_count"
        :pager-count="4"
        @size-change="getData()"
        @current-change="getData()"
      />
      <el-pagination
        class="flex-wrap"
        v-model:current-page="table_params.page"
        v-model:page-size="table_params.limit"
        :page-sizes="[10, 25, 50, 100, 250]"
        background="background"
        layout="jumper"
        :total="table_data.all_record_count"
        :pager-count="4"
        @size-change="getData()"
        @current-change="getData()"
      />
    </div>
    <dual v-model:visible="dual_dialog_visible" :config="dual_config" @success="getData()"></dual>
    <detail v-model:visible="detail_dialog_visible" :config="detail_config"></detail>
  </el-card>
</template>

<script>
import services from "@/services";
import columns_settings_all from "./columns_settings";
import dual from "@/views/services/dual";
import Detail from "./detail.vue";
import show_record from "@/components/show_record.vue";
import { ElMessageBox } from "element-plus";
import Inputs from "./inputs.vue";
export default {
  components: { dual, Detail, show_record, Inputs },
  data() {
    return {
      table_params: {
        limit: 10,
        page: 1,
        filters: {},
        like: {},
        sorts: {},
      },
      table_data: {},
      loading: true,
      columns_settings: {},
      hide_columns: ["own_id", "id", "user_id", "updated_at", "created_at", "companies_id"],
      dual_dialog_visible: false,
      dual_config: {},
      detail_dialog_visible: false,
      detail_config: {},
      width: 0,

      filter_show: false,
      filter_data: {},

      selected_column_length: 0,
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
      services.list(this.$route.params.table_name, this.table_params).then((res) => {
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
      ElMessageBox.confirm("Silmek istediğinize emin misiniz?", "Dikkat", {
        confirmButtonText: "Evet",
        cancelButtonText: "Vazgeç",
        type: "warning",
      })
        .then(() => {
          this.services.clean(this.$route.params.table_name, id).then(() => {
            this.bildir.success("Başarıyla Silindi");
            this.getData();
          });
        })
        .catch(() => {
          this.bildir.info("Silmekten vazgeçildi");
        });
    },
    openFilter() {
      this.filter_show = !this.filter_show;
    },
    filterChange() {
      for (const [k, v] of Object.entries(this.filter_data)) {
        if (v != "" && v != undefined && v.length > 0) {
          this.table_params.like[k] = v;
        }
      }
      this.getData();
    },
    sortable(clm) {
      if (this.table_params.sorts[clm] == undefined) {
        this.table_params.sorts[clm] = true;
      } else if (this.table_params.sorts[clm] == true) {
        this.table_params.sorts[clm] = false;
      } else if (this.table_params.sorts[clm] == false) {
        delete this.table_params.sorts[clm];
      }
      this.getData();
    },
    handleSelectionChange(e) {
      this.selected_column_length = e.length;
    },
  },
};
</script>

<style></style>
