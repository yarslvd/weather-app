<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import CurrentWeather from "./components/CurrentWeather.vue";

const data = ref(null);
const uv_index = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${import.meta.env.VITE_CITY}
      &units=metric&appid=${import.meta.env.VITE_API_KEY_OPENWEATHER}&exclude=hourly`
    );
    data.value = response.data;
    console.log(response.data);

    const uv_response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,daily&appid=7830e15d5fae07b2db1be2733bd63647`);
    uv_index.value = uv_response.data.current;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <main class="wrapper">
    <div class="left-container" v-if="uv_index">
      <CurrentWeather :data="data" :uv_index="uv_index" />
    </div>
    <div class="right-container">
      <span>RIGHT</span>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 2fr 6fr;
  gap: 20px;
  height: 700px;
  max-width: 1470px;
}
</style>
