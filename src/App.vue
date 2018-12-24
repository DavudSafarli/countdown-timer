<template>
  <div id="app">
    <!-- <transition name="page" mode="out-in"> -->
    <router-view/>
    <!-- </transition> -->
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'Myfont';
  src: url('assets/CirceRounded-Regular.otf');
}
@font-face {
  font-family: 'Myfont Bold';
  src: url('assets/CirceRounded-Bold.otf');
}
html {
  // scroll-behavior: smooth;
}
  *{
    margin: 0;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.page-enter-active{
  transition: all 0.5s;
}
.page-enter{
  transform: translateX(calc(-100vw + ((100vw - 100%)/2)))
}
.page-enter-to{
  transform: translateX(0);
}

.page-leave-active {
  transition: all 0.5s;
}

.page-leave{
  /*  */
}
.page-leave-to {
    transform: translateX(calc(100% + ((100vw - 100%)/2)));
}

</style>

