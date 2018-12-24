import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import "@fortawesome/fontawesome-free/css/all.css";
import Timer from './components/Timer.vue'
import Create from './views/Create.vue'
Vue.component('timer', Timer)
Vue.component('create', Create)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
