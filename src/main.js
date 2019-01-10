import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AsyncComputed from 'vue-async-computed'
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
Vue.use(AsyncComputed)


import './firebase'

import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)

import Timer from './components/Timer.vue'
import Create from './views/Create.vue'
import Home from './views/Home.vue'
import Show from './views/Show.vue'
import About from './views/About.vue'
import Explore from './views/Explore.vue'
import arrow from './components/right-arrow.vue'
Vue.component('right-arrow', arrow)
Vue.component('timer', Timer)
Vue.component('create', Create)
Vue.component('home-page', Home)
Vue.component('show-page', Show)
Vue.component('about-page', About)
Vue.component('explore-page', Explore)


Vue.config.productionTip = false
import './registerServiceWorker'
import "@fortawesome/fontawesome-free/css/all.css";


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
