<template>
  <div id="app">
    <!-- <transition name="page" mode="out-in"> -->
    <router-view :key="$route.path"></router-view>
    <!-- </transition> -->
  </div>
</template>

<style lang="scss">

@font-face {
  font-family: 'Pacifico';
  src: url('assets/Pacifico-Regular.woff2') format("woff2");
}
@font-face {
  font-family: 'Museo';
  src: url('assets/museo.woff2') format('woff2');
}
body{
  margin: 0;
}

#app {
  font-family:  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fullpage-page{
    overflow: hidden;
    display: flex;
    min-width: 100vw;
    justify-content: center;
    align-items: center;
    position: relative;
}
html, body, #app, #fullpage, .fullpage-page{
  height: 100%!important;
}
*{
  margin: 0;
}
</style>

