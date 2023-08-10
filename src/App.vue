<script setup>
import { ref, onMounted, inject, watch } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import CurrentWeather from "@/components/CurrentWeather.vue";
import DetailedInfo from "@/components/DetailedInfo.vue";

const store = inject("store");
const data = ref(null);
const uv_index = ref(null);
const loading = ref(true);

const notify = () => {
  toast.error("Error, nothing has been found", {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
}

const fetchData = async () => {
  loading.value = true;
  try {
    let response;
    if(!store.state.coords) {
      response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${store.state.coords[0]}&lon=${store.state.coords[1]}&units=metric&appid=${import.meta.env.VITE_API_KEY_OPENWEATHER}&exclude=hourly`
      );
      data.value = response.data;
      console.log(response.data)
    }
    else {
      response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${store.state.city}&units=metric&appid=${import.meta.env.VITE_API_KEY_OPENWEATHER}&exclude=hourly`
      );
      data.value = response.data;
      console.log(response.value)
      // store.changeCoords(data.value, data.value);
    }

    data.value = response.data;
    const uv_response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,daily&appid=7830e15d5fae07b2db1be2733bd63647`);
    uv_index.value = uv_response.data.current;
    } catch (error) {
    notify();
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

// watch(
//     () => data.value,
//     () => {
//       console.log("changed");
//     },
// );
</script>

<template>
  <main class="wrapper">
    <div class="left-container">
      <CurrentWeather v-if="uv_index" :data="data" :uv_index="uv_index" :key="uv_index"/>
    </div>
    <div class="right-container">
      <DetailedInfo :key="uv_index"/>
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

  .left-container {
    max-height: 700px;
  }
}
</style>
