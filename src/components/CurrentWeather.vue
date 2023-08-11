<script setup>
import { inject, onMounted, ref, watch } from "vue";
import axios from "axios";

import Sunrise from "./icons/Sunrise.vue";
import Sunset from "./icons/Sunset.vue";
import SearchField from "./SearchField.vue";
import Loader from "./Loader.vue";
import UkranianFlag from "./icons/UkranianFlag.vue";

import selectIcon from "@/utils/selectIcon";
import { calculateSunTime } from "@/utils/calculateSunTime";
import { errorNotification } from "@/utils/errorNotification";

const store = inject("store");
const data = ref(null);
const sunrise = ref(null);
const sunset = ref(null);
const uv_index = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        store.state.coords[0]
      }&lon=${store.state.coords[1]}&units=metric&appid=${
        import.meta.env.VITE_API_KEY_OPENWEATHER
      }&exclude=hourly`,
    );
    data.value = response.data;

    data.value = response.data;
    const uv_response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,daily&appid=7830e15d5fae07b2db1be2733bd63647`,
    );
    uv_index.value = uv_response.data.current;

    const cityName = document.getElementsByClassName("city")[0];
    if (cityName && cityName.offsetWidth > 290) {
      cityName.classList.add("animate-city");
    } else {
      cityName.classList.remove("animate-city");
    }
  } catch (error) {
    errorNotification("Error, nothing has been found");
    console.error("Error fetching data:", error);
    return;
  }
};

onMounted(async () => {
  navigator.geolocation.getCurrentPosition((location) => {
    if (location.coords.latitude && location.coords.longitude) {
      store.changeCoords(location.coords.latitude, location.coords.longitude);
    }
  });
  await fetchData();

  sunrise.value = calculateSunTime(data.value.sys.sunrise);
  sunset.value = calculateSunTime(data.value.sys.sunset);
});

watch(
  () => store.state.coords || store.state.city,
  async () => {
    await fetchData();
  },
  { deep: true },
);
</script>

<template>
  <div class="container">
    <Loader v-if="!data" />
    <div class="header" v-if="data">
      <UkranianFlag />
      <div class="heading-container">
        <span v-if="data.name > 10">{{ data.name }}</span>
        <h2 class="city" :data-text="data.name">{{ data.name }}</h2>
      </div>
      <div class="temp">
        <span class="real_temp">{{ Math.round(data.main.temp) }}&deg;C</span>
        <span class="feels_temp"
          >{{ Math.round(data.main.feels_like) }}&deg;C</span
        >
      </div>
    </div>

    <div class="main_info" v-if="data">
      <div class="illustration">
        <img
          :src="selectIcon(data.weather[0])"
          alt="Weather illustration"
          width="160"
        />
        <span class="weather_description">{{
          data.weather[0].description
        }}</span>
      </div>
      <div class="info">
        <div class="info_item">
          <span class="key">Humidity</span>
          <span class="value">{{ data.main.humidity }}%</span>
        </div>
        <div class="info_item">
          <span class="key">Pressure</span>
          <span class="value">{{ data.main.pressure }}mb</span>
        </div>
        <div class="info_item">
          <span class="key">Wind</span>
          <span class="value">{{ +data.wind.speed.toFixed(1) }}km/h</span>
        </div>
      </div>
    </div>

    <div class="detailed_info" v-if="data">
      <div class="detailed_item">
        <span class="detailed_heading">Sunrise and sunset</span>
        <div class="sun">
          <Loader v-if="!sunrise && !sunset" />
          <div class="sun_item" v-if="sunrise">
            <Sunrise />
            <span class="sun_time">{{ sunrise }}</span>
          </div>
          <div class="sun_item" v-if="sunset">
            <Sunset />
            <span class="sun_time">{{ sunset }}</span>
          </div>
        </div>
      </div>
      <div class="detailed_item">
        <span class="detailed_heading">UV Index</span>
        <div class="uv" v-if="uv_index">
          <div class="graphic">
            <div class="line"></div>
            <div
              class="dot"
              :style="{ left: (uv_index.uvi.toFixed(1) / 12) * 100 + '%' }"
            ></div>
          </div>
          <span class="uv_index">{{ uv_index.uvi.toFixed(1) }}mW </span>
        </div>
      </div>
    </div>

    <SearchField v-if="uv_index" />
  </div>
</template>

<style scoped lang="scss">
$customFontFamily: "Kharkiv Tone", sans-serif;
.container {
  width: 100%;
  min-width: 400px;
  height: 100%;
  background-color: #fff;
  border-radius: 25px;
  padding: 50px 35px;

  .header {
    font-family: $customFontFamily;
    position: relative;

    .ukraine_flag {
      position: absolute;
      top: 10px;
      right: 0;
    }

    .heading-container {
      max-width: 290px;
      overflow: hidden;

      .animate-city {
        animation: infinite city 4s linear;
      }

      .city {
        font-size: 38px;
        font-weight: 500;
        margin-bottom: -30px;
        text-transform: uppercase;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;

        @keyframes city {
          0%,
          100% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(360px);
          }
        }

        @keyframes animate-city {
          0%,
          100% {
            transform: translateX(-300px);
          }
          100% {
            transform: translateX(360px);
          }
        }
      }
    }

    .temp {
      display: flex;
      gap: 10px;
      align-items: center;
      .real_temp {
        font-size: 60px;
        font-weight: 500;
      }

      .feels_temp {
        margin-top: -8px;
        font-size: 16px;
        padding: 3px 5px 0 5px;
        background-color: #0085ff;
        color: #fff;
        border-radius: 5px;
      }
    }
  }

  .main_info {
    display: flex;
    gap: 3rem;
    align-items: center;
    height: 190px;

    .illustration {
      display: flex;
      flex-direction: column;
      .weather_description {
        font-family: $customFontFamily;
        font-size: 15px;
        max-width: 160px;
        text-transform: capitalize;
        text-align: center;
        margin-top: 5px;
      }
    }
    .info {
      .info_item {
        display: flex;
        flex-direction: column;
        .key {
          font-size: 14px;
          margin-bottom: -10px;
        }
        .value {
          font-family: $customFontFamily;
          font-size: 20px;
        }
      }
    }
  }

  .detailed_info {
    margin-top: 68px;

    .detailed_item {
      .detailed_heading {
        font-size: 16px;
        margin-bottom: 220px;
      }

      .sun {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .sun_item {
          display: flex;
          align-items: center;
          gap: 10px;

          .sun_time {
            font-family: $customFontFamily;
            font-size: 18px;
          }
        }
      }

      .uv {
        display: grid;
        grid-template-columns: 5fr 1fr;
        align-items: center;
        gap: 20px;
        .graphic {
          position: relative;
          .line {
            width: 100%;
            height: 5px;
            border-radius: 10px;
            background-color: #0085ff;
          }

          .dot {
            position: absolute;
            width: 15px;
            height: 15px;
            background-color: #0085ff;
            border: 2px solid #fff;
            top: -5px;
            border-radius: 50%;
          }
        }
        .uv_index {
          text-align: center;
          font-family: $customFontFamily;
          font-size: 16px;
        }
      }
    }
    .detailed_item:nth-child(2) {
      margin-top: 20px;
    }
  }
}
</style>
