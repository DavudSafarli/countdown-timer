<template>
  <div class="fullpage-page explore">
      <h1 class="text">Explore Timers</h1>
      <div class="container">
        <div class="search">
          <input @keydown.tab="$event.preventDefault()" type="search" class="search-box" spellcheck="false" />
          <span @click="click" class="search-button">
              <span class="search-icon"></span>
          </span>
        </div>
      </div>
      <div class="content content-explore container">
        <div class="timers">
            <div class="scrollable">
              <div class="scrollable hidden">

                <div v-for="(i, index) in split_keys" :key="index" class="flex">
                <div v-for="(j, jndex) in i" :key="jndex" class="card-holder">

                  <div class="card" >
                    <div class="title">{{get_timers[j].name}}</div>
                    <router-link :to="{name: 'timer', params: {id: j}}"><i class="goto fas fa-arrow-right"></i></router-link>
                    <div class="date" v-scope="scope = get_timers[j].date">
                      Date: {{scope[0]}}-{{scope[1]}}-{{scope[2]}}  {{scope[3]}}:{{scope[4]}}:{{scope[5]}}
                      </div>
                    <div class="desc">{{get_timers[j].about}}</div>
                    <div class="timezone">{{get_timers[j].timezone}}</div>
                  </div>
                    <!-- {{get_timers[j]}} -->  
                  </div>  
              </div>
                <!-- <div v-for="i in 3" :key="i" class="flex">
                  
                    <div class="card-holder">
                      <div class="card">
                        <div class="title">New Year (2020)</div>
                        <i class="goto fas fa-arrow-right"></i>
                        <div class="date">Date: 2020 - 01 - 01  00:00:00</div>
                        <div class="desc"></div>
                        <div class="timezone">Asia/Baku</div>
                      </div>
                    </div>
                    <div class="card-holder">
                      <div class="card">
                        <div class="title">New Year (2020)</div>
                        <i class="goto fas fa-arrow-right"></i>
                        <div class="date">Date: 2020 - 01 - 01  00:00:00</div>
                        <div class="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, nostrum.</div>
                        <div class="timezone">Asia/Baku</div>
                      </div>
                    </div>
                </div> -->
                <div @click="load" class="load">
                  <svg class="load" x="0px" y="0px" viewBox="0 0 405.456 405.456" style="enable-background:new 0 0 405.456 405.456;" xml:space="preserve" width="512px" height="512px">
                    <path d="M74.134,64.147c-4.985,0.078-9.911,2.163-13.438,5.688l-55,55C2.096,128.432,0,133.492,0,138.583 s2.096,10.151,5.697,13.75l183.281,183.281c3.599,3.601,8.659,5.697,13.75,5.697s10.151-2.096,13.75-5.697l183.281-183.281   c3.601-3.599,5.697-8.659,5.697-13.75s-2.096-10.151-5.697-13.75l-55-55c-3.598-3.591-8.651-5.681-13.734-5.681   c-5.083,0-10.136,2.09-13.734,5.681L202.728,184.397L88.166,69.833C84.499,66.169,79.318,64.07,74.134,64.147L74.134,64.147z" fill="#575757"/>
                  </svg>
                </div>
              </div>
            </div>
        </div>
      </div>
      
  </div>
</template>

<script>

import { mapMutations, mapGetters } from "vuex";
export default {
  directives: {
		scope: {}
	},
    mounted(){
      window.addEventListener('keydown', e=>{
          if(e.code == 'Tab' || e.keyCode == 9){
              e.preventDefault()
          }
      })
    },
  data() {
    return{
      tweenLock: false,
    }
  },
  methods: {
    ...mapMutations(['set_name']),
    click(e) {
        document.querySelector('.search-box').focus()
        e.currentTarget.parentElement.classList.toggle('open');
    },
    load() {
      this.splitTimers
    }
  },
  computed: {
    ...mapGetters(['get_timers']),
    split_keys() {
      let keys = Object.keys(this.get_timers)
      let arr = [];
      let chunk = [];
      let l = keys.length
      for (let i = 0; i < l; i++) {
        if(i !== 0 && (i) % 2 == 0){
          arr.push(chunk)
          chunk = [];
        }
        chunk.push(keys[i])
      }
      arr.push(chunk)
      return arr;
    }
  }
};
</script>

<style lang="scss">
.flex:nth-child(3) .card-holder  {
  margin-bottom: 0!important;
}
.load{
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 100px;
}
.load svg{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.card-bg{
  width: calc(100% - 40px)!important;
  padding: 0 20px;
  transition: 0.3s;
  left: 0;
  top: 0;
  position: absolute!important;
  opacity: 0;
  background: #fff;
  border: none;
}

.explore{
  flex-direction: column;
  justify-content: flex-start;
}
.text{
  font-family: "Pacifico";
  font-size: 40px;
  color: #fff;
  padding-top: 20px;
}
.scrollable, .timers{
  height: 100%;
}
.scrollable, .timers, .timers .flex{
  width: 100%;
}

.scrollable.hidden{
  width: calc(100% + 17px)!important;
  height: 100%!important;
  overflow-y: scroll!important;
  padding-right: 17px!important;
  box-sizing: border-box!important;
}

.card{
  cursor: default;
  color: #2f2f2f;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(30,30,30,0.1);
  padding: 10px;
  box-sizing: border-box;
  max-width: 450px;
  width: 46vw;
  // height: 220px;
  border-radius: 4px;
  position: relative;
}
.card:hover{
  border-color: rgba(30,30,30,0.3);
}
.scrollable{
  position: relative;   
  overflow: hidden;
  font-family: 'Pacifico';
  .flex{
    .card-holder{
      margin-bottom: 80px;
      flex-grow: 1;
      flex-basis: 50%;
      display: flex;
      justify-content: center;
    }
    .title{
      font-size: 30px;
    }
    .goto{
      cursor: pointer;
      position: absolute;
      margin: 0;
      top: 0;
      right: 0;
      padding: 10px 12px;
    }
    .date{
      font-size: 25px;
      text-align: left;
      padding-bottom: 20px;
    }
    .desc{
      color: #444;
      font-size: 15px;
      text-align: left;
      width: 75%;
      flex-grow: 1;
    }
    .timezone{
      text-align: right;
      padding-right: 15px;
      font-size: 16px;
    }
  }
} 

.container{
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}
.content-explore{
    top: 160px;
    align-items: flex-start;
    justify-content: flex-start;
}

$bg: linear-gradient(-45deg, #AD0057, #FF1360, #FC724C);
$search-bg-color: #2ccf7e;


$icon-color: white;
$transition: all .5s ease;

.explore{
    background: $bg;
}

.search-button, .search-icon {
  box-sizing: border-box;
}

.search {
  align-self: flex-start;
  width: 50px;
  max-width: 50px;
  height: 50px;    
  background-color: $search-bg-color;
  position: relative;
  overflow: hidden;
  transition: $transition;
  &:before {
    content: '';
    display: block;
    width: 3px;
    height: 100%;
    position: relative;
    background-color: $icon-color;
    transition: $transition;
  }
  &.open {
    max-width: 550px;
    width: calc(90vw);
    &:before {
      height: 30px;
      margin: 10px 0 0 30px;
      position: absolute;
    }
  }
}
.search-box {
  width: 100%;
  height: 100%;
  box-shadow: none;
  border: none;
  background: transparent;
  color: #fff;
  padding: 10px 100px 10px 45px;
  font-size: 25px;
  font-family: 'Pacifico';
  &:focus {
    outline: none;
  }
}
@media screen and (max-width: 500px) {
    .search-box {
        font-size: calc(10px + 4vw);
    }
}
.search-button {
  width: 45px;
  height: 45px;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  padding: 4px;
  cursor: pointer;
}

.search-icon {
  margin-top: 4px;
  margin-left: 3px;
  width: 25px;
  height: 25px;
  border-radius: 40px;
  border: 3px solid $icon-color;
  display: block;
  position: relative;
  transition: $transition;
  &:before {
    content: '';
    width: 3px;
    height: 12px;
    position: absolute;
    right: -4px;
    top: 17px;
    display: block;
    background-color: $icon-color;
    transform: rotate(-45deg);
    transition: $transition;
  }
  &:after {
    content: '';
    width: 3px;
    height: 6px;
    position: absolute;
    right: -8px;
    top: 24px;
    display: block;
    background-color: $icon-color;
    transform: rotate(-45deg);
    transition: $transition;
  }
  .open & {
    margin: 0;
    margin-top: 5px;
    width: 35px;
    height: 35px;
    border-radius: 60px;
    &:before {
      transform: rotate(52deg);
      right: 11px;
      top: 11px;
      height: 14px;
    }
    &:after {
      transform: rotate(-230deg);
      right: 11px;
      top: 3px;
      height: 14px;
    }
  }
}
@media screen and (max-width: 800px) {
  .text{
    padding-top: 0px;
  }
  .content-explore{
    top: 140px;
  }
  .card{
    width: 100vw;
  }
  .scrollable{
    .flex{
      flex-direction: column;
      .card-holder{
        margin-bottom: 5px;
      }
      .title{
        font-size: 25px;
      }
      .date{
        font-size: 20px;
      }
    }
  }
}
</style>
