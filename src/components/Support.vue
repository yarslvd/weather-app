<template>
  <a href="https://u24.gov.ua" class="link_help">
    <div class="ua_help"></div>
    <span class="ua_help_text hide">Read more</span>
  </a>
</template>

<style scoped lang="scss">
.link_help {
  position: relative;

  &:hover .ua_help::after {
    filter: blur(2px) brightness(80%);
    -webkit-filter: blur(2px) brightness(80%);
    -moz-filter: blur(2px) brightness(80%);
    -o-filter: blur(2px) brightness(80%);
    -ms-filter: blur(2px) brightness(80%);
  }

  &:hover .ua_help_text {
    opacity: 1;
  }

  .ua_help_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #f1f1f1;
    z-index: 100;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;

    &:hover {
      text-decoration: underline;
    }
  }

  .ua_help {
    min-width: 240px;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 20px;

    &::before,
    &::after {
      background-image: url("https://u24.gov.ua/assets/img/meta/og-20220504.jpg");
      background-repeat: no-repeat, no-repeat;
      background-position: left;
      background-size: cover;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all 0.2s ease-in-out;
    }

    &:hover::after {
      filter: blur(2px) brightness(80%);
      -webkit-filter: blur(2px) brightness(80%);
      -moz-filter: blur(2px) brightness(80%);
      -o-filter: blur(2px) brightness(80%);
      -ms-filter: blur(2px) brightness(80%);
    }
  }
}
</style>
