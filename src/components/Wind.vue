<script setup>
import { selectTextDirection, selectArrow } from "@/utils/windUtils";

const props = defineProps(["data"]);
const { data } = props;
</script>

<template>
  <div class="container_wind">
    <div class="direction">
      <span v-html="selectArrow(data.direction)"></span>
    </div>
    <div class="info">
      <span class="speed">{{ data.speed.toFixed(1) }}m/s</span>
      <div class="text_direction">
        <span>{{ selectTextDirection(data.direction) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container_wind {
  display: flex;
  align-items: center;
  gap: 10px;

  .direction {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    background-color: #ffda57;
    position: relative;

    span {
      color: #fff;
      font-size: 30px;
      font-family: "Kharkiv Tone", sans-serif;
      position: absolute;
      top: 20%;
      left: 27%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 65px;

    .speed {
      font-size: 30px;
      font-family: "Kharkiv Tone", sans-serif;
      margin-top: -5px;
    }

    .text_direction {
      font-size: 20px;
      margin-top: -15px;
      padding: 0 8px;
      background-color: #0085ff;
      border-radius: 5px;
      align-self: start;
      color: #fff;
    }
  }
}
</style>
