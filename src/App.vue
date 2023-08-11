<script setup>
import CurrentWeather from "@/components/CurrentWeather.vue";
import DetailedInfo from "@/components/DetailedInfo.vue";
</script>

<template>
  <main class="wrapper">
    <div class="left-container">
      <CurrentWeather />
    </div>
    <div class="right-container">
      <DetailedInfo />
    </div>
  </main>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  height: 700px;
  max-width: 1470px;
}
</style>
