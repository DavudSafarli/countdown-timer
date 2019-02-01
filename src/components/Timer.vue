<template>
  <div v-if="day" class="wrap">
    
    <div ref="countdown" class="countdown">
      <div class="bloc-time days" :data-init-value="day">
        <!-- <router-link :to="{name: 'timer', params: {id: 'Wy1HoteTEMXPRFBqCoy9'}}">asd</router-link> -->
        <span class="count-title">Days</span>

        <div v-for="(i, index) in day" :key="index" :class="'figure days days-' + (index+1)">
          <span class="top">{{i}}</span>
          <span class="top-back">
            <span>{{i}}</span>
          </span>
          <span class="bottom">{{i}}</span>
          <span class="bottom-back">
            <span>{{i}}</span>
          </span>
        </div>
      </div>
      <div class="flex">
        <div class="bloc-time hours" :data-init-value="hour">
          <span class="count-title">Hours</span>

          <div v-for="(i, index) in hour" :key="index" :class="'figure hours hours-' + (index+1)">
            <span class="top">{{i}}</span>
            <span class="top-back">
              <span>{{i}}</span>
            </span>
            <span class="bottom">{{i}}</span>
            <span class="bottom-back">
              <span>{{i}}</span>
            </span>
          </div>
        </div>

        <div class="bloc-time min" :data-init-value="min">
          <span class="count-title">Minutes</span>

          <div v-for="(i, index) in min" :key="index" :class="'figure min min-' + (index+1)">
            <span class="top">{{i}}</span>
            <span class="top-back">
              <span>{{i}}</span>
            </span>
            <span class="bottom">{{i}}</span>
            <span class="bottom-back">
              <span>{{i}}</span>
            </span>
          </div>
        </div>

        <div class="bloc-time sec" :data-init-value="sec">
          <span class="count-title">Seconds</span>

          <div v-for="(i, index) in sec" :key="index" :class="'figure sec sec-' + (index+1)">
            <span class="top">{{i}}</span>
            <span class="top-back">
              <span>{{i}}</span>
            </span>
            <span class="bottom">{{i}}</span>
            <span class="bottom-back">
              <span>{{i}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["day", "hour", "min", "sec", "stop", "time"],
  name: "timer",
  mounted() {
    // Create Countdown
   
      let vue = this;
      var Countdown = (window.Countdown = {
      // Backbone-like structure
      $el: vue.$refs.countdown,

      // Params
      countdown_interval: null,
      total_seconds: 0,

      // Initialize the countdown
      init: function() {
        // DOM
        this.$ = {
          days: vue.$el.querySelectorAll(".bloc-time.days .figure"),
          hours: vue.$el.querySelectorAll(".bloc-time.hours .figure"),
          minutes: vue.$el.querySelectorAll(".bloc-time.min .figure"),
          seconds: vue.$el.querySelectorAll(".bloc-time.sec .figure")
        };
        // Init countdown values
        let future = new Date(2018, 11, 28, 23, 27, 4, 0).getTime();
        let now = Date.now();
        var timeDiff = Math.abs(future - now);
        var diffSecs = Math.ceil(timeDiff / 1000);
        this.total_seconds = diffSecs;
        this.values = {
          days: parseInt(
            this.$.days[0].parentElement.getAttribute("data-init-value")
          ),
          hours: parseInt(
            this.$.hours[0].parentElement.getAttribute("data-init-value")
          ),
          minutes: parseInt(
            this.$.minutes[0].parentElement.getAttribute("data-init-value")
          ),
          seconds: parseInt(
            this.$.seconds[0].parentElement.getAttribute("data-init-value")
          )
        };
        // Initialize total seconds

        this.total_seconds =
          this.values.days * 24 * 60 * 60 +
          this.values.hours * 60 * 60 +
          this.values.minutes * 60 +
          this.values.seconds;

        // Animate countdown to the end
        this.count();
      },

      count: function() {
        var that = this,
          $hour_1 = this.$.hours[0],
          $hour_2 = this.$.hours[1],
          $min_1 = this.$.minutes[0],
          $min_2 = this.$.minutes[1],
          $sec_1 = this.$.seconds[0],
          $sec_2 = this.$.seconds[1];
        this.countdown_interval = setInterval(function() {
          
          if (that.total_seconds > 0) {
            --that.values.seconds;

            if (that.values.minutes >= 0 && that.values.seconds < 0) {
              that.values.seconds = 59;
              --that.values.minutes;
            }

            if (that.values.hours >= 0 && that.values.minutes < 0) {
              that.values.minutes = 59;
              --that.values.hours;
            }

            if (that.values.days >= 0 && that.values.hours < 0) {
              that.values.hours = 59;
              --that.values.days;
            }

            if (vue.stop == true) {
              return;
            }
            // Update DOM values
            // Days
            that.checkDay(that.values.days, that.$.days);

            // Hours
            that.checkHour(that.values.hours, $hour_1, $hour_2);

            // Minutes
            that.checkHour(that.values.minutes, $min_1, $min_2);

            // Seconds
            that.checkHour(that.values.seconds, $sec_1, $sec_2);

            --that.total_seconds;
          } else {
            // Timeout finidhed
            // tell database
            clearInterval(that.countdown_interval);
          }
        }, 1000);
      },
      checkDay: function(value, arr) {
        value = value.toString();
        if (value.length < arr.length) {
          value = "0" + value;
        }
        let figure_vals = [];
        let l = arr.length;
        for (let i = 0; i < l; i++) {
          figure_vals[i] = arr[i].querySelector(".top").innerHTML;
        }
        // console.log(value, arr, figure_vals)
        // if(value != Math.pow(10, l - 1)){
        if (true) {
          for (let i = 0; i < l; i++) {
            if (figure_vals[i] !== value[i])
              this.animateFigure(arr[i], value[i]);
          }
        } else {
          // for (let i = 0; i < arr.length; i++) {
          //     if(figure_vals[i] !== "0") {
          //         this.animateFigure(arr[i], 0);
          //         continue
          //     }
          //     if (figure_vals[i] !== figure_vals[i-1]){
          //         this.animateFigure(arr[i], value[i-1]);
          //     }
          // }
          // if (fig_1_value !== "0") this.animateFigure($el_1, 0);
          // if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
        }
      },
      animateFigure: function($el, value) {
        var that = this,
          $top = $el.querySelector(".top"),
          $bottom = $el.querySelector(".bottom"),
          $back_top = $el.querySelector(".top-back"),
          $back_bottom = $el.querySelector(".bottom-back");

        // Before we begin, change the back value
        $back_top.querySelector("span").innerHTML = value;

        $back_bottom.querySelector("span").innerHTML = value;
        // Also change the back bottom value

        // Then animate
        TweenLite.to($top, 0.8, {
          rotationX: "-180deg",
          transformPerspective: 300,
          ease: Quart.easeOut,
          onComplete: function() {
            $top.innerHTML = value;

            $bottom.innerHTML = value;

            TweenLite.set($top, {
              rotationX: 0
            });
          }
        });

        TweenLite.to($back_top, 0.8, {
          rotationX: 0,
          transformPerspective: 300,
          ease: Quart.easeOut,
          clearProps: "all"
        });
      },

      checkHour: function(value, $el_1, $el_2) {
        value = value.toString();
        // var val_1 = value.toString().charAt(0),
        //     val_2 = value.toString().charAt(1),
        var fig_1_value = $el_1.querySelector(".top").innerHTML,
          fig_2_value = $el_2.querySelector(".top").innerHTML;

        if (value < 10) {
          value = "0" + value;
        }
        if (true) {
          // console.log(value)
          // Animate only if the figure has changed
          if (fig_1_value !== value[0]) this.animateFigure($el_1, value[0]);
          if (fig_2_value !== value[1]) this.animateFigure($el_2, value[1]);
        }
        // else {
        //     // If we are under 10, replace first figure with 0
        //     if (fig_1_value !== "0") this.animateFigure($el_1, 0);
        //     if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
        // }
      }
    });

    if (this.day && !this.stop) Countdown.init();
  },
  watch: {
    stop() {
      console.log(this.stop)
    }
  }
};
</script>

<style lang="scss">
.figure *, .vdatetime-popup {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
.wrap {
  z-index: 9;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
}
.flex {
  display: flex;
}
.countdown {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.countdown .bloc-time:not(:last-child) {
  margin-right: 2vw;
  text-align: center;
}

.countdown .count-title {
  font-family: "museo" !important;
  display: block;
  margin-bottom: 1vw;
  color: #2d3436;
  text-transform: uppercase;
}



.countdown .figure:not(:last-child) {
  margin-right: 0.7vw;
}

.countdown .figure .top:after,
.countdown .figure .bottom-back:after {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% - 1px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.countdown .figure .top {
  z-index: 3;
  background-color: #f7f7f7;
  transform-origin: 50% 100%;
  -webkit-transform-origin: 50% 100%;
  -moz-border-radius-topleft: 10px;
  -webkit-border-top-left-radius: 10px;
  border-top-left-radius: 10px;
  -moz-border-radius-topright: 10px;
  -webkit-border-top-right-radius: 10px;
  border-top-right-radius: 10px;
  -moz-transform: perspective(200px);
  -ms-transform: perspective(200px);
  -webkit-transform: perspective(200px);
  transform: perspective(200px);
}

.countdown .figure .bottom {
  z-index: 1;
}

.countdown .figure .bottom:before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.02);
}

.countdown .figure .bottom-back {
  z-index: 2;
  top: 0;
  height: 50%;
  overflow: hidden;
  background-color: #f7f7f7;
  -moz-border-radius-topleft: 10px;
  -webkit-border-top-left-radius: 10px;
  border-top-left-radius: 10px;
  -moz-border-radius-topright: 10px;
  -webkit-border-top-right-radius: 10px;
  border-top-right-radius: 10px;
}

.countdown .figure .bottom-back span {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.countdown .figure .top,
.countdown .figure .top-back {
  height: 50%;
  overflow: hidden;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.countdown .figure .top-back {
  // left: 1px;
  z-index: 4;
  bottom: 0;
  background-color: #fff;
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
  -moz-transform: perspective(300px) rotateX(180deg);
  -ms-transform: perspective(300px) rotateX(180deg);
  -webkit-transform: perspective(300px) rotateX(180deg);
  transform: perspective(300px) rotateX(180deg);
  -moz-border-radius-bottomleft: 10px;
  -webkit-border-bottom-left-radius: 10px;
  border-bottom-left-radius: 10px;
  -moz-border-radius-bottomright: 10px;
  -webkit-border-bottom-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.countdown .figure .top-back span {
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  margin: auto;
}

.countdown .figure > span {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 115px;
  font-family: "Lato";
  font-weight: 700;
  color: #2d3436;
}
.countdown .figure {
  position: relative;
  float: left;
  height: 150px;
  width: 120px;
  //   max-width: px;
  background-color: #fff;
  border-radius: 5px;
  -moz-box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2),
    inset 2px 4px 0 0 rgba(255, 255, 255, 0.08);
  -webkit-box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2),
    inset 2px 4px 0 0 rgba(255, 255, 255, 0.08);
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2),
    inset 2px 4px 0 0 rgba(255, 255, 255, 0.08);
}

.countdown .figure .top-back {
  width: 100%;
}

.top-back {
  width: 99% !important;
  margin-left: 1 !important;
}

@media only screen and (max-width: 1200px) {
  .countdown .figure {
    height: 132px;
    width: 100px;
  }
  .countdown .figure > span {
    font-size: 100px;
  }
}
@media only screen and (max-width: 800px) {
  .countdown .figure {
    height: 102px;
    width: 80px;
  }
  .countdown .figure > span {
    font-size: 77px;
  }
}
@media only screen and (max-width: 600px) {
  .countdown .figure {
    height: 80px;
    width: 65px;
  }
  .countdown .figure > span {
    font-size: 62px;
  }
}
@media only screen and (max-width: 500px) {
  .countdown .figure {
    height: 62px;
    width: 50px;
  }
  .countdown .figure > span {
    font-size: 47px;
  }
}
</style>
