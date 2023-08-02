<script setup>
import Search from "./icons/Search.vue";
function click() {
  console.log("clicked");
}
</script>

<template>
  <div class="search">
    <input type="text" class="input" placeholder="Search for city..."/>
    <button class="btn_search" @click="click()">
      <Search class="icon" />
    </button>
  </div>
</template>

<style lang="scss">
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
