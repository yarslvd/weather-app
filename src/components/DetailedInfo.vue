<script setup>
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "vue-chartjs";
import { inject, onMounted, ref, watch } from "vue";
import axios from "axios";

import Forecast from "@/components/ForecastCard.vue";
import Support from "@/components/Support.vue";
import { data, options, plugins } from "/src/utils/chartConfig";
import { detailedInfoVars } from "@/constants";

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
  Filler,
);

const fetchData = async () => {
  try {
    const timeArr = [];
    const dataArr = [];

    const chart = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${store.state.coords[0]}&longitude=${store.state.coords[1]}&hourly=temperature_2m&timezone=auto&forecast_days=1`,
    );
    chart.data.hourly.time.map((el, index) => {
      if (index % 2 === 0) {
        timeArr.push(
          new Date(el).toLocaleTimeString("en-GB", { hour: "2-digit" }),
        );
      }
    });
    data.datasets[0].data = chart.data.hourly.temperature_2m.map(
      (el, index) => {
        if (index % 2 === 0) dataArr.push(el);
      },
    );
    data.labels = timeArr;
    data.datasets[0].data = dataArr;

    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${
        store.state.coords[0]
      }&lon=${store.state.coords[1]}&appid=${
        import.meta.env.VITE_FORECAST_API_KEY
      }&exclude=${detailedInfoVars.exclude}&units=${detailedInfoVars.units}`,
    );
    forecast.data.daily = forecast.data.daily.slice(0, 5);
    forecastData.value = forecast.data;
    console.log(forecastData.value);
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  loading.value = false;
  try {
    await fetchData();
  } catch (err) {
    console.error(err);
  }
  loading.value = true;
});

watch(
  () => store.state.coords,
  async () => {
    await fetchData();
  },
  { deep: true },
);
</script>

<template>
  <div class="container">
    <div v-if="forecastData" class="forecast_container">
      <h1 class="heading">Forecast</h1>
      <div class="info_container">
        <div class="forecast">
          <Forecast
            v-for="item in forecastData.daily"
            :key="item.dt"
            :item="item"
          />
        </div>
        <Support />
      </div>
    </div>
    <!--    <div class="details_container">-->
    <!--      <h1 class="heading">Details</h1>-->
    <!--      <div v-if="loading" class="chart_container">-->
    <!--        <div class="graph_temp">-->
    <!--          <Line :data="data" :options="options" :plugins="plugins" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 25px;
  padding: 50px 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .heading {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    letter-spacing: 0.7px;
    font-size: 24px;
    color: #949494;
  }

  .forecast_container {
    .info_container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;

      .forecast {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .details_container {
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
