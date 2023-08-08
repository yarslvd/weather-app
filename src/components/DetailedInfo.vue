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
  import {options, data, plugins} from '/src/utils/chartConfig'
  import {inject, onMounted, ref, watch} from "vue";
  import axios from "axios";

  const store = inject("store");
  const loading = ref(false);

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
      console.log(data)
      data.labels = timeArr;
      data.datasets[0].data = dataArr;
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
    <h2 class="heading">Details</h2>
    <div class="chart_container" v-if="loading">
      <div class="graph_temp">
        <Line :data="data" :options="options" :plugins="plugins" />
      </div>
      <div class="smth">

      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 25px;
    padding: 50px 35px;

    .heading {
      font-family: 'Montserrat', sans-serif;
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 26px;
    }

    .chart_container {
      height: 260px;
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-gap: 20px;

      .graph_temp {

      }

      .smth {
        width: 100%;
        height: 100%;
        background-color: #eaeaea;
        border-radius: 15px;
      }
    }
  }
</style>