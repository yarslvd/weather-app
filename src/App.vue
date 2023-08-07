<script setup>
import { ref, onMounted, inject, watch } from "vue";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather.vue";

const store = inject("store");
const data = ref(null);
const uv_index = ref(null);
const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${store.state.city}&units=metric&appid=${import.meta.env.VITE_API_KEY_OPENWEATHER}&exclude=hourly`
    );
    data.value = response.data;

    const uv_response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,daily&appid=7830e15d5fae07b2db1be2733bd63647`);
    uv_index.value = uv_response.data.current;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  loading.value = false;
}

onMounted( async () => {
  navigator.geolocation.getCurrentPosition((location) => {
    if(location.coords.latitude && location.coords.longitude) {
      store.changeCoords(location.coords.latitude, location.coords.longitude);
    }
  });
  await fetchData();
});

watch(
    () => store.state.coords,
    async () => {
      await fetchData();
    },
    { deep: true }
);

watch(
    () => data.value,
    () => {
      console.log("changed");
    },
);
</script>

<template>
  <main class="wrapper">
    <div class="left-container">
      <CurrentWeather v-if="uv_index" :data="data" :uv_index="uv_index" :key="uv_index"/>
    </div>
    <div class="right-container">
      <span>RIGHT</span>
    </div>
  </main>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: 2fr 6fr;
  gap: 20px;
  height: 700px;
  max-width: 1470px;

  .left-container {
    max-height: 700px;
  }
}
</style>
