<template>
  <div>
    <!--BOŞ VERİ-->
    <span v-if="data[clm.name] == undefined || data[clm.name] == null || data[clm.name].length <= 0">Boş</span>
    <!--DOSYA VE RESİMLER-->
    <span v-else-if="clm.type == 'file' || clm.type == 'image'" class="d-flex align-items-center">
      <template v-for="i in data[clm.name]" :key="i">
        <img v-if="i.mini != ''" :src="i.mini_link" style="height: 35px" />
        <a v-else class="cursor-pointer fs-5" download :href="i.full_link"><i class="bi bi-cloud-download"></i></a>
        <el-divider direction="vertical"></el-divider>
      </template>
    </span>
    <!--OBJECT VERİ-->
    <span v-else-if="typeof data[clm.name] == typeof {}">
      <el-dropdown v-if="data[clm.name]['show'] == undefined">
        <span class="el-dropdown-link"> Detay </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(d, k) in data[clm.name]" :key="k">{{ k }}: {{ d }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span v-else>{{ data[clm.name]["show"] }}</span>
    </span>
    <!--BOOLEAND VERİ-->
    <span v-else-if="clm.type == 'bool'">
      <i v-if="data[clm.name] == true" class="bi bi-check-circle"></i>
      <i v-else class="bi bi-x-circle"></i>
    </span>

    <!--DİĞERLERİ-->
    <span v-else>{{ data[clm.name] }}</span>
  </div>
</template>

<script>
export default {
  props: ["data", "clm"],
};
</script>

<style></style>
