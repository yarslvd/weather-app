<script setup>
  import selectIcon from "@/utils/selectIcon";
  import {inject} from "vue";

  const props = defineProps(['item']);
  const { item } = props;
  console.log(item)

  const store = inject("store");

  const date = new Date(item.dt * 1000).toLocaleString("en-GB", { weekday: "short", day: "numeric" });
</script>

<template>
  <div class="container_card">
    <h3 class="date">{{ date }}</h3>
    <img :src='selectIcon(item.weather[0])' alt="Weather illustration" width="90" class="illustration">
    <div class="temp">
      <span class="real_temp">{{ Math.round(item.temp.day) }}&deg;C</span>
      <span class="feels_temp">{{ Math.round(item.temp.min) }}&deg;C</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container_card {
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;
    text-align: center;
    padding: 10px;
    gap: 15px;

    .date {
      font-weight: 400;
      font-size: 18px;
    }

    .illustration {
      align-self: center;
    }

    .temp {
      font-family: 'Kharkiv Tone', sans-serif;
      display: flex;
      justify-content: center;
      gap: 2px;

      .real_temp {
        font-size: 18px;
        font-weight: 700;
      }

      .feels_temp {
        font-size: 12px;
        margin-top: 1px;
      }
    }
  }
</style>