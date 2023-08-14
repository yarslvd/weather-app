<script setup>
const props = defineProps(["data"]);
console.log(props);
</script>

<template>
  <div class="point_container">
    <div class="dew_image">
      <img src="/icons/dew_point.svg" alt="Dew point" />
    </div>
    <span class="value">{{ data.toFixed(1) }}&deg;C</span>
  </div>
</template>

<style scoped lang="scss">
.point_container {
  display: flex;
  align-items: center;
  gap: 10px;

  .value {
    font-size: 30px;
    font-family: "Kharkiv Tone", sans-serif;
  }

  .dew_image {
    background-color: #0085ff;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    position: relative;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-40%, -50%);
    }
  }
}
</style>
