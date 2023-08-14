<script setup>
import { inject, onMounted, ref, watch } from "vue";
import axios from "axios";
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

import Forecast from "@/components/ForecastCard.vue";
import Support from "@/components/Support.vue";
import Wind from "@/components/Wind.vue";
import DewPoint from "@/components/DewPoint.vue";
import Loader from "./Loader.vue";

import { data, options, plugins } from "/src/utils/chartConfig";
import { detailedInfoVars } from "@/constants";
import { errorNotification } from "@/utils/errorNotification";

const store = inject("store");
const loading = ref(false);
const forecastData = ref(null);
const wind = ref({});
const dew_point = ref({});

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
    console.log(data);

    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${
        store.state.coords[0]
      }&lon=${store.state.coords[1]}&appid=${
        import.meta.env.VITE_FORECAST_API_KEY
      }&exclude=${detailedInfoVars.exclude}&units=${detailedInfoVars.units}`,
    );
    forecast.data.daily = forecast.data.daily.slice(0, 5);
    forecastData.value = forecast.data;
    wind.value.speed = forecast.data.current.wind_speed;
    wind.value.direction = forecast.data.current.wind_deg;
    dew_point.value = forecast.data.current.dew_point;
  } catch (err) {
    console.error(err);
    errorNotification("Error while loading data");
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
    <div class="forecast_container">
      <h1 class="heading">Forecast</h1>
      <div v-if="!forecastData" style="height: 190px">
        <Loader />
      </div>
      <div class="info_container" v-if="forecastData">
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
    <div class="details_container">
      <h1 class="heading">Details</h1>
      <Loader v-if="!forecastData" />
      <div v-if="forecastData" class="chart_container">
        <div class="upper">
          <div class="graph_temp">
            <Line
              :data="data"
              :options="options"
              :plugins="plugins"
              :key="data.labels"
            />
          </div>
          <div class="wind_container">
            <Wind :data="wind" />
            <DewPoint :data="dew_point" />
          </div>
        </div>
      </div>
    </div>
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
  gap: 20px;

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
    height: 100%;

    .chart_container {
      .upper {
        display: grid;
        grid-template-columns: 4fr 2fr;
        height: 200px;
        gap: 25px;

        .graph_temp {
          max-width: 625px;
          height: 200px;
        }

        .wind_container {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;

          .heading_card {
            font-weight: 600;
            color: #949494;
            font-size: 18px;
          }

          .content {
            display: flex;
            align-items: center;
            height: calc(100%);
            .wind_speed {
              font-family: "Kharkiv Tone", sans-serif;
              font-size: 40px;
            }
          }
        }
      }
    }
  }
}
</style>
