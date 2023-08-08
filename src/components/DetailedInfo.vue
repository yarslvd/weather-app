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
  import {options, data} from '/src/utils/chartConfig'
  import {inject, onMounted, ref, watch} from "vue";
  import axios from "axios";

  const store = inject("store");
  const loading = ref(false);
  const dataChart = ref({});

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
      const chart = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${store.state.coords[0]}&longitude=${store.state.coords[1]}&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1`);
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
    <div class="chart_container" v-if="loading">
      <Line :data="data" :options="options" :key="loading"/>
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

    .chart_container {
      height: 300px;
      width: 70%;
    }
  }
</style>