import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
  db
} from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //state: null | creating | naming
    state: null,
    explore: false,
    stopHomeTimer: false,
    name: null,
    about: null,
    current: null,
    timers: {
      'KWRRVTZn18vHHmEmTcKN':{
        about:"You can send birthday messages to davudseferli@gmail.com <3",
        date: [2019, 7, 12, 0, 0, 0],
        name:"Birthday of creator of this website",
        timezone:"Asia/Baku",
      },
      'bUXowOetaWTgo34jsjf0':{
        about:"Happy New year!!11!!1!",
        date: [2019, 12, 31, 23, 59, 0],
        name:"New Year (2019)",
        timezone:"Asia/Baku",
      },
      '0pHbNw1UW54lRxwct9Ri':{
        about:"just seems good... 2020-02-02  02:20:00",
        date: [2020, 2, 2, 2, 20, 0],
        name:"nice date!!",
        timezone:"Asia/Baku",
      },  

    },
    futureDate: null,
  },
  getters: {
    get_stopHomeTimer: state => state.stopHomeTimer,
    get_explore: state => state.explore,
    get_state: state => state.state,
    get_mine: state => {
      return id => {
        if(state.timers[id])
          return state.timers[id].date
      }
    },
    get_timers: state => {
      console.log('i was getted')
      return state.timers
    }
  },
  mutations: {
    set_state(state, nextState){
      state.state = nextState
    },
    set_name(state, {name,about}) {
      if (name) state.name = name
      if (about) state.about = about
    },
    set_futureDate(state, date) {
      state.futureDate = date;
    },
    set_timer(state, {id,date}) {
      // store timer locally
      Vue.set(state.timers, id, date)
    }
  },
  actions: {
    store({commit,state}, {router}) {
      //this could change
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      for (let i = 0; i < state.futureDate.length; i++) {
        state.futureDate[i] = +state.futureDate[i]
      }
      let data = {
        name: state.name,
        about: state.about,
        date: state.futureDate,
        timezone
      }
      console.log(state.name, state.about, state.futureDate)
      var setDoc = db.collection('timers').add(data)
        .then(res => {
          commit('set_timer', {
            id: res.id,
            data
          })
          router.push({
            name: "timer",
            params: {
              id: res.id
            }
          })
        });
    },

    fetch_timer_local({commit,dispatch,state}, id) {
      if (state.timers[id]) {
        //timer is already there
        console.log('already therealready therealready there')
      } else {
        // fetch the timer from database
        db.collection('timers').doc(id).get()
          .then(async doc => {
            console.log(doc.data())
            //add timer to associative array
            commit('set_timer', {id, date: doc.data()})

            let date = await dispatch('create', {
              date: doc.data().date,
              timezone: ''
            })
            console.log(date)

          })
      }


    },
    monthToDays({commit}, num) {
      let sum = 0;
      for (let i = 0; i < num; i++) {
        sum += new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1 + i,
          0
        ).getDate();
      }
      return sum;
    },
    // date to [day, hour, min, sec]
    async create({commit,dispatch}, {date,timezone}) {

      let now = await Date.now();
      let {
        data
      } = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=3f78886939f04d83ac2a5333fac287b0&tz=" + timezone
      );
      let currentTime = data.date_time;

      // split ' ', '-', ':'
      currentTime = currentTime.split(/(?:-|:| )+/);
      let arr = date;

      let diff = [];
      let l = arr.length;
      for (let i = 0; i < l; i++) {
        diff[i] = arr[i] - currentTime[i];
      }
      //year to month
      if (diff[0] < 0) {
        console.log("finished");
        return;
      } else if (diff[0] > 0) {
        diff[1] += 12 * diff[0];
        diff[0] = 0;
      }
      if (diff[1] < 0) {
        //month
        console.log("finished");
        return;
      } else if (diff[1] > 0) {
        //month
        diff[2] += await dispatch('monthToDays', diff[1]);
        diff[1] = 0;
      }
      if (diff[5] < 0) {
        //sec
        diff[5] += 60;
        diff[4]--;
      }
      if (diff[4] < 0) {
        //min
        diff[4] += 60;
        diff[3]--;
      }
      if (diff[3] < 0) {
        //hour
        diff[3] += 24;
        diff[2]--;
      }
      if (diff[2] < 0) {
        //days
        console.log("finished");
        return
      }

      diff = diff.map(el => {
        el = el.toString();
        if (el.length < 2)
          return '0' + el;
        return el;
      });
      if (diff[2] == '00')
        diff[2] = 0;

      return {
        day: '' + diff[2],
        hour: '' + diff[3],
        min: '' + diff[4],
        sec: '' + diff[5]
      }

      let offset = await (Date.now() - now);
      console.log(offset);
      if (offset > 1000) {
        // bla bla bla
      }
    },
  }
})