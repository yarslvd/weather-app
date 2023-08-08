<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onMounted, ref, inject } from "vue";
import Search from "./icons/Search.vue";
const store = inject("store");

const autocomplete = ref(null);
let originAutocomplete;

const options = {
  fields: ["formatted_address", "geometry", "name"],
  strictBounds: false,
  types: ["(cities)"],
};

onMounted(() => {
  originAutocomplete = new google.maps.places.Autocomplete(
      autocomplete.value,
      options
  );

  originAutocomplete.addListener("place_changed", () => {
    changePlace();
  });
});

const notify = () => {
  toast.error("Nothing found", {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
}

function changePlace() {
  const place = originAutocomplete.getPlace();
  if (!place?.geometry) {
    notify();
    return;
  }

  const location = place.geometry.location;
  store.setCity(place.name);
  store.changeCoords(location.lat(), location.lng());
}
</script>

<template>
  <div class="search">
    <input ref="autocomplete" type="text" class="input" placeholder="Search for city..." />
    <button class="btn_search" @click="changePlace()">
      <Search class="icon" />
    </button>
  </div>
</template>

<style lang="scss">
.pac-container {
  &:after {
    display: none;
  }

  border: 1px solid rgba(0, 0, 0, 0.10);
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 5px;
  padding: 5px 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .pac-item {
    &:hover {
      border-radius: 5px;
    }

    border: none;

    .pac-matched {
      background-color: rgba(0, 133, 255, 1);
      padding: 2px;
      color: #F1F1F1;
      border-radius: 2px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
    }

    .pac-icon {
      display: none;
    }
  }
}

.search {
  position: relative;
  width: 100%;
  margin-top: 20px;
  
  .input {
    &:focus {
      outline: none;
    }

    height: 45px;
    width: 100%;
    border-radius: 10px;
    background-color: #f2f2f2;
    border: none;
    padding: 0 45px 0 20px;
    font-family: 'Montserrat', sans-serif;
  }

  .btn_search {
    &:hover {
      cursor: pointer;
      background-color: #e0e0e0;
    }

    position: absolute;
    padding: 8px 10px;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;

    .icon {
      width: 15px;
    }
  }
}
</style>
