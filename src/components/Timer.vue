<template>
<div class="wrap" @click="create">
    <div ref="countdown" class="countdown">
        <div class="bloc-time days" data-init-value="105">
            <span class="count-title">Days</span>

            <div ref="days" class="figure days days-1">
                <span class="top">2</span>
                <span class="top-back">
            <span>2</span>
                </span>
                <span class="bottom">2</span>
                <span class="bottom-back">
            <span>2</span>
                </span>
            </div>

            <div class="figure days days-2">
                <span class="top">4</span>
                <span class="top-back">
            <span>4</span>
                </span>
                <span class="bottom">4</span>
                <span class="bottom-back">
            <span>4</span>
                </span>
            </div>

            <div class="figure days days-3">
                <span class="top">4</span>
                <span class="top-back">
            <span>4</span>
                </span>
                <span class="bottom">4</span>
                <span class="bottom-back">
            <span>4</span>
                </span>
            </div>
        </div>
        <div class="bloc-time hours" data-init-value="23">
            <span class="count-title">Hours</span>

            <div ref="hours" class="figure hours hours-1">
                <span class="top">2</span>
                <span class="top-back">
            <span>2</span>
                </span>
                <span class="bottom">2</span>
                <span class="bottom-back">
            <span>2</span>
                </span>
            </div>

            <div class="figure hours hours-2">
                <span class="top">4</span>
                <span class="top-back">
            <span>4</span>
                </span>
                <span class="bottom">4</span>
                <span class="bottom-back">
            <span>4</span>
                </span>
            </div>
        </div>

        <div class="bloc-time min" data-init-value="10">
            <span class="count-title">Minutes</span>

            <div ref="min" class="figure min min-1">
                <span class="top">0</span>
                <span class="top-back">
            <span>0</span>
                </span>
                <span class="bottom">0</span>
                <span class="bottom-back">
            <span>0</span>
                </span>
            </div>

            <div class="figure min min-2">
                <span class="top">0</span>
                <span class="top-back">
            <span>0</span>
                </span>
                <span class="bottom">0</span>
                <span class="bottom-back">
            <span>0</span>
                </span>
            </div>
        </div>
        

        <div class="bloc-time sec" data-init-value="3">
            <span class="count-title">Seconds</span>

            <div ref="sec" class="figure sec sec-1">
                <span class="top">0</span>
                <span class="top-back">
            <span>0</span>
                </span>
                <span class="bottom">0</span>
                <span class="bottom-back">
            <span>0</span>
                </span>
            </div>

            <div class="figure sec sec-2">
                <span class="top">0</span>
                <span class="top-back">
            <span>0</span>
                </span>
                <span class="bottom">0</span>
                <span class="bottom-back">
            <span>0</span>
                </span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            key: "3f78886939f04d83ac2a5333fac287b0",
            days: 4,
            hours: "",
            minutes: "",
            seconds: ""
        };
    },
    methods: {
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
        async create() {
            let now = await Date.now();
            let { data } = await axios.get(
                "https://api.ipgeolocation.io/timezone?apiKey=3f78886939f04d83ac2a5333fac287b0"
            );
            let currentTime = data.date_time;
            let timezone = data.timezone;

            // split ' ', '-', ':'
            currentTime = currentTime.split(/(?:-|:| )+/);
            let arr = ["2023", "7", "12", "17", "28", "16"];

            let diff = [];
            let l = arr.length;
            for (let i = 0; i < l; i++) {
                diff[i] = arr[i] - currentTime[i];
            }
            console.log(diff);
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
                diff[2] += this.monthToDays(diff[1]);
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
            console.log(diff[0] + " years " + diff[1] + " month " + diff[2] + " days " + diff[3] + " hours " + diff[4] + " minutes " + diff[5] + "seconds");
            console.log(diff);

            let offset = await (Date.now() - now);
            console.log(offset);
            if (offset > 1000) {
                // bla bla bla
            }
        }
    },
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
            init: function () {
                // DOM
                this.$ = {
                    days: document.querySelectorAll(".bloc-time.days .figure"),
                    hours: document.querySelectorAll(".bloc-time.hours .figure"),
                    minutes: document.querySelectorAll(".bloc-time.min .figure"),
                    seconds: document.querySelectorAll(".bloc-time.sec .figure")
                };
                // Init countdown values
                let future = new Date(2018, 11, 20, 15, 32, 45).getTime();
                let now = Date.now();
                var timeDiff = Math.abs(future - now);
                var diffSecs = Math.ceil(timeDiff / 1000);
                this.total_seconds = diffSecs;
                this.values = {
                    days: this.$.days[0].parentElement.getAttribute("data-init-value"),
                    hours: this.$.hours[0].parentElement.getAttribute("data-init-value"),
                    minutes: this.$.minutes[0].parentElement.getAttribute(
                        "data-init-value"
                    ),
                    seconds: this.$.seconds[0].parentElement.getAttribute(
                        "data-init-value"
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

            count: function () {
                var that = this,
                    $day_1 = this.$.days[0],
                    $day_2 = this.$.days[1],
                    $day_3 = this.$.days[2],
                    $hour_1 = this.$.hours[0],
                    $hour_2 = this.$.hours[1],
                    $min_1 = this.$.minutes[0],
                    $min_2 = this.$.minutes[1],
                    $sec_1 = this.$.seconds[0],
                    $sec_2 = this.$.seconds[1];

                this.countdown_interval = setInterval(function () {
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

                        // Update DOM values
                        // Days
                        that.checkHour(that.values.days, $day_1, $day_2, $day_3);

                        // Hours
                        that.checkHour(that.values.hours, $hour_1, $hour_2);

                        // Minutes
                        that.checkHour(that.values.minutes, $min_1, $min_2);

                        // Seconds
                        that.checkHour(that.values.seconds, $sec_1, $sec_2);

                        --that.total_seconds;
                    } else {
                        clearInterval(that.countdown_interval);
                    }
                }, 1000);
            },

            animateFigure: function ($el, value) {
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
                TweenMax.to($top, 0.8, {
                    rotationX: "-180deg",
                    transformPerspective: 300,
                    ease: Quart.easeOut,
                    onComplete: function () {
                        $top.innerHTML = value;

                        $bottom.innerHTML = value;

                        TweenMax.set($top, {
                            rotationX: 0
                        });
                    }
                });

                TweenMax.to($back_top, 0.8, {
                    rotationX: 0,
                    transformPerspective: 300,
                    ease: Quart.easeOut,
                    clearProps: "all"
                });
            },

            checkHour: function (value, $el_1, $el_2, $el_3) {
                var val_1 = value.toString().charAt(0),
                    val_2 = value.toString().charAt(1),
                    fig_1_value = $el_1.querySelector(".top").innerHTML,
                    fig_2_value = $el_2.querySelector(".top").innerHTML;
                if($el_3){
                    var val_3 = value.toString().charAt(1)
                    var fig_3_value = $el_3.querySelector(".top").innerHTML
                }

                if (value >= 10) {
                    // console.log(value)
                    // Animate only if the figure has changed
                    if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
                    if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
                } else {
                    // If we are under 10, replace first figure with 0
                    if (fig_1_value !== "0") this.animateFigure($el_1, 0);
                    if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
                }
            }
        });

        // Let's go !
        Countdown.init();
    }
};
</script>

<style lang="scss">

.wrap {
    z-index: 9;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
}

.countdown {
    margin: 0 auto;
    display: flex;
    width: 100%;
    justify-content: center;
}

.countdown .bloc-time:not(:last-child) {
    margin-right: 2vw;
    text-align: center;
}

.countdown .count-title {
    font-family: 'Myfont'!important;
    display: block;
    margin-bottom: 1vw;
    font: normal 1.8vw "Lato";
    color: #2d3436;
    text-transform: uppercase;
}

.countdown .figure {
    position: relative;
    float: left;
    height: calc(8.5vw);
    width: 6.7vw;
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
.countdown .figure>span {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    font-size: calc(7.1vw + 5px);
    font-family: "Lato";
    font-weight: 700;
    color: #2d3436;
}
.countdown .figure .top-back {
    width: 100%;
}
 .top-back{
    width: 99%!important;
    margin-left: 1!important;
}
@media screen and (max-width: 1470px) {
    body{
        background-color: red;
    }
}
@media screen and (max-width: 1100px) {
    body{
        background-color: green;
    }
    .countdown .figure {
        height: calc(9.6vw);
        width: 8.8vw;
        // overflow: hidden;
    }
    .countdown .figure>span{
        font-size: calc(7.5vw + 5px);
    }
}
// @media screen and (min-width: 1450px) {
    
//     .countdown .figure>span {
//         font-size: calc(10vw + 5px);
//     }

    // .countdown .figure {
    //     height: calc(12vw);
    //     width: 8.8vw;
    // }
// }

// @media screen and (min-width: 950px) {
//     body{
//         background-color: green;
//     }
//     .countdown .figure>span {
//         font-size: calc(9vw + 5px);
//     }

//     .countdown .figure {
//         height: calc(12vw);
//         width: 8.8vw;
//     }
// }

// @media screen and (min-width: 1250px) {
//     .wrap {
//         bottom: 12%;
//     }
// }
</style>
