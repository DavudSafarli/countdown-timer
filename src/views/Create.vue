<template>
  <div class="fullpage-page create-timer">
    <div class="content">
      <h1 @click="open() " class="flat-shadow">Select a date</h1>
      <datetime
        type="datetime"
        zone="local"
        value-zone="local"
        v-model="date"
        @close="close"
        class="theme-orange"
      ></datetime>

      <!-- <div @click="open"  class="select">
               <div style="transition: 1s all;" class="loader border-animation spinner">
                   <div class="hide">Create<i class="fas fa-angle-double-right"></i></div>
                </div>
      </div>-->
      <a @click.prevent="set_state('created'); calculateDays(); $emit('link', $event); " href="#about" class="bttn-off bttn">Continue</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Datetime } from "vue-datetime";
import axios from "axios";
export default {
  mounted() {
    let vue = this
    window.addEventListener('load', function(){
      vue.open()
    }, false)
  },
  data() {
    return {
      date: ""
    };
  },
  components: {
    datetime: Datetime
  },
  methods: {
    ...mapMutations(["set_futureDate", 'set_state']),
    calculateDays() {
      console.log("calc");
      let arr = this.date.split(/(?:-|:|[T]|[Z])+/);
      let futureDate = [];
      for (let i = 0; i < 5; i++) {
        futureDate[i] = arr[i];
      }
      futureDate[5] = "00";
      console.log(futureDate);
      this.set_futureDate(futureDate);
    },
    monthToDays(num) {
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
    close() {
      if (this.date == "") {
      } else {
        setTimeout(() => {
          document.querySelector(".bttn").classList.remove("bttn-off");
        }, 50);
      }
    },
    open() {
      let el = document.querySelector(".vdatetime-input");
      var event = new Event("click");
      el.dispatchEvent(event);
    }
  }
};
</script>
<style lang="scss">
.create-timer {
  align-items: flex-start;
  background: #ff6666;
  --primary: #cc5252;
  --secondary: #2c3e50;
}
.bttn-off {
  overflow: hidden;
  max-height: 0px !important;
  padding: 0px !important;
  border-width: 0px !important;
}
.bttn {
  color: var(--secondary);
  text-decoration: none;
  transition: 0.3s ease all;
  cursor: pointer;
  max-height: 55px;
  margin-top: 50px;
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  width: 270px;
  font-weight: bold;
  padding: 14px 0px;
  border: 3px solid var(--secondary);
  border-radius: 2px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
  &:focus {
    color: #fff;
  }
  &:hover {
    color: #fff;
  }
  &:before {
    -webkit-transition: 0.5s all ease;
    transition: 0.5s all ease;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    bottom: 0;
    opacity: 0;
    content: "";
    background-color: var(--secondary);
    z-index: -2;
  }
  &:hover {
    &:before {
      -webkit-transition: 0.5s all ease;
      transition: 0.5s all ease;
      left: 0;
      right: 0;
      opacity: 1;
    }
  }
  &:focus {
    &:before {
      transition: 0.5s all ease;
      left: 0;
      right: 0;
      opacity: 1;
    }
  }
}
.flat-shadow {
  cursor: pointer;
  font-family: "Pacifico";
  top: 0;
  position: absolute;
  padding-top: 20px;
  color: #fff;
  font-size: 40px;
  text-shadow: 1px 1px var(--primary), 2px 2px var(--primary),
    3px 3px var(--primary), 4px 4px var(--primary), 5px 5px var(--primary),
    6px 6px var(--primary), 7px 7px var(--primary), 8px 8px var(--primary),
    9px 9px var(--primary), -1px 1px var(--primary), -2px 2px var(--primary);
}

.vdatetime-overlay {
  background: rgba(0, 0, 0, 0.2) !important;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.vdatetime-input {
  width: 300px;
  height: 50px;
  border: none;
  cursor: pointer;
  font-size: 22px;
  box-sizing: border-box;
  padding: 0 0 0 15px;
  // overflow: hidden;
  // visibility: hidden;
}
.vdatetime-overlay {
  position: absolute !important;
  display: none;
}
.vdatetime-popup {
  transform: translate(-50%, -250px) !important;
  position: absolute !important;
  box-shadow: none!important;
}

.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #ff6666;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff6666;
}
</style>
