import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
  db
} from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // state: null | creating | naming
    state: null,
    explore: false,
    stopHomeTimer: false,
    name: null,
    about: null,
    searchFor: null,
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
      console.log('get_mine cagirildim')
      return id => {
        if(state.timers[id])
          return state.timers[id]
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
    set_name(state, {name,about,searchFor}) {
      if (name) state.name = name
      if (about) state.about = about
      if (searchFor) state.searchFor = searchFor
    },
    set_futureDate(state, date) {
      state.futureDate = date;
    },
    set_timer(state, {id,date}) {
      // store timer locally
      console.log('set timer')
      Vue.set(state.timers, id, date)
    }
  },
  actions: {
    search({commit}, key){
      db.collection('timers')
      .where('searchFor', 'array-contains', key)
      .get()
      .then(async docs=> {
        docs.forEach(doc => {
          commit('set_timer', {id: doc.id, date: doc.data()})
          console.log(doc)
          console.log(doc.data())
        });
      })
      .catch(e=>{
        console.log(e)
      })
    },
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
        timezone,
        searchFor: state.searchFor
      }
      console.log(`this item is searchable for ${state.searchFor}`)
      console.log(state.name, state.about, state.futureDate)
      var setDoc = db.collection('timers').add(data)
        .then(res => {
          console.log('set timer store')
          commit('set_timer', {
            id: res.id,
            date: data
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
      return new Promise(async (resolve, reject)=>{
        if (state.timers[id]) {
          let timer = await dispatch('create', {
            date: state.timers[id].date,
            timezone: ''
          })
          return resolve(timer);
          //timer is already there
        } else {
          // fetch the timer from database
          db.collection('timers').doc(id).get()
          .then(async doc => {
            let data = doc.data()
            console.log({data})
            // if data does not exist
            if(!data){
              return resolve({deleted: true})
            }
            //add timer to associative array
            console.log('set timer fetch_timer_local')
            commit('set_timer', {id, date: data})
            
            let timer = await dispatch('create', {
              date: doc.data().date,
              timezone: ''
            })
            if(timer.finished){
              db.collection("timers").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
              }).catch(function(error) {
                  console.error("Error removing document: ", error);
              });
            }
            console.log({timer})
            return resolve(timer);
          })
        }
      })
        

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
    finishedTimer(){

      return {
        day: '00',
        hour: '00',
        min: '00',
        sec: '00',
        finished: true
      }
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
        return dispatch('finishedTimer')
      } else if (diff[0] > 0) {
        diff[1] += 12 * diff[0];
        diff[0] = 0;
      }
      if (diff[1] < 0) {
        //month
        return dispatch('finishedTimer')
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
        return dispatch('finishedTimer')
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