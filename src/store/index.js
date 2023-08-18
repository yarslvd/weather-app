import { reactive, readonly } from "vue";

const store = reactive({
  coords: [50, 36.25],
  city: "Kharkiv",
});

const changeCoords = (lat, lon) => {
  store.coords = [lat, lon];
};

const setCity = (city) => {
  store.city = city;
};

export default {
  state: readonly(store),
  changeCoords,
  setCity,
};
