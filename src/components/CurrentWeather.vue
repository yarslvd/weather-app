<script setup>
import { onMounted } from "vue";

import Sunrise from "./icons/Sunrise.vue";
import Sunset from "./icons/Sunset.vue";
import SearchField from "./SearchField.vue";
import selectIcon from "@/utils/selectIcon";

const props = defineProps(["data", "uv_index"]);
const { data, uv_index } = props;
const options = { timeZoneName: "short" };
const timezone = Intl.DateTimeFormat(undefined, options).resolvedOptions()
  .timeZone;
const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: timezone,
});
const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
});

onMounted(() => {
  const cityName = document.getElementsByClassName("city")[0];

  if (cityName && cityName.offsetWidth > 290) {
    cityName.classList.add("animate-city");
  }
});
</script>

<template>
  <div class="container">
    <div class="header" v-if="data">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="20"
        viewBox="0 0 30 20"
        fill="none"
        class="ukraine_flag"
      >
        <path
          d="M0 2C0 0.89543 0.895431 0 2 0H28C29.1046 0 30 0.895431 30 2V10H0V2Z"
          fill="#0085FF"
        />
        <path
          d="M0 10H30V18C30 19.1046 29.1046 20 28 20H2C0.89543 20 0 19.1046 0 18V10Z"
          fill="#FFEE52"
        />
      </svg>
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
          <div class="sun_item">
            <Sunrise />
            <span class="sun_time" v-if="sunrise">{{ sunrise }}</span>
          </div>
          <div class="sun_item">
            <Sunset />
            <span class="sun_time" v-if="sunset">{{ sunset }}</span>
          </div>
        </div>
      </div>
      <div class="detailed_item">
        <span class="detailed_heading">UV Index</span>
        <div class="uv">
          <div class="graphic">
            <div class="line"></div>
            <div
              class="dot"
              :style="{ left: (uv_index.uvi.toFixed(1) / 12) * 100 + '%' }"
            ></div>
          </div>
          <span class="uv_index" v-if="uv_index"
            >{{ uv_index.uvi.toFixed(1) }}mW</span
          >
        </div>
      </div>
    </div>

    <SearchField />
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
