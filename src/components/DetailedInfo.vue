<script setup>
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
  } from 'chart.js'
  import { Line } from 'vue-chartjs'
  import {inject, onMounted, ref, watch} from "vue";
  import axios from "axios";

  import Forecast from "@/components/ForecastCard.vue";
  import {options, data, plugins} from '/src/utils/chartConfig';

  const store = inject("store");
  const loading = ref(false);
  const forecastData = ref({});

  ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Filler
  );

  const fetchData = async () => {
    try {
      const timeArr = [];
      const dataArr = [];

      const chart = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${store.state.coords[0]}&longitude=${store.state.coords[1]}&hourly=temperature_2m&timezone=auto&forecast_days=1`);
      chart.data.hourly.time.map((el, index) => {
        if (index % 2 === 0) {
          timeArr.push(new Date(el).toLocaleTimeString("en-GB", {hour: "2-digit"}));
        }
      });
      data.datasets[0].data = chart.data.hourly.temperature_2m.map((el, index) => {
        if (index % 2 === 0) dataArr.push(el);
      });
      data.labels = timeArr;
      data.datasets[0].data = dataArr;

      const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${store.state.coords[0]}&lon=${store.state.coords[1]}&appid=${import.meta.env.VITE_FORECAST_API_KEY}&exclude=hourly,minutely&units=metric`);
      forecast.data.daily = forecast.data.daily.slice(0, 6);
      forecastData.value = forecast.data;
    }
    catch(err) {
      console.error(err);
    }
  }

  onMounted(async () => {
    loading.value = false;
    try {
      await fetchData();
    }
    catch(err) {
      console.error(err);
    }
    loading.value = true;
  })

  watch(
      () => store.state.coords,
      async () => {
        await fetchData();
      },
      { deep: true }
  );
</script>

<template>
  <div class="container">
    <div class="forecast_container" v-if="forecastData">
      <h1 class="heading">Forecast</h1>
      <div class="forecast">
        <Forecast v-for="(item, index) in forecastData.daily" :item="item" :key="item.dt"/>
      </div>
    </div>
    <div class="details_container">
      <h1 class="heading">Details</h1>
      <div class="chart_container" v-if="loading">
        <div class="graph_temp">
          <Line :data="data" :options="options" :plugins="plugins" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 25px;
    padding: 50px 35px;

    .heading {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 24px;
    }

    .forecast_container {
      .forecast {
        display: flex;
        justify-content: space-between;
      }
    }

    .details_container {
      margin-top: 40px;

      .chart_container {
        height: 250px;
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 30px;

        .graph_temp {

        }
      }
    }
  }
</style>