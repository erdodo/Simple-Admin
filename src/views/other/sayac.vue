<template>
  <div class="text-white">
    <h1>{{ dakika }}:{{ saniye }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dakika: 25,
      saniye: 0,
    };
  },
  mounted() {
    let sayacInter = setInterval(() => {
      this.saniye--;
      if (this.saniye == 0) {
        this.dakika--;
        this.saniye = 59;
      }
      if (this.dakika == 0) {
        clearInterval(sayacInter);
      }
    }, 1000);
  },
};
</script>

<style></style>
