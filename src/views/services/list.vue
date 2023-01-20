<template>
  <div v-loading="loading">
    <el-table :data="table_data.records" style="width: 100%" height="90vh" stripe>
      <el-table-column v-for="clm in table_data.fields" :key="clm.id" :prop="clm.name" :label="clm.display" width="180">
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
      <el-table-column fixed="right" label="İşlemler" width="120">
        <template #default> </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import services from "@/services";
export default {
  data() {
    return {
      table_data: {},
      loading: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      services.list(this.$route.params.table_name).then((res) => {
        this.table_data = res;
        this.loading = false;
      });
    },
  },
};
</script>

<style></style>
