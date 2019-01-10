<template>
  <div class="fullpage-page explore">
      <h1 class="text">Explore Timers</h1>
      <div class="searchbox container" spellcheck="false">
        <input  @keydown.enter="search" placeholder="Search for a Keyword" ref="input" type="text" :class="{search: true, searchIsOpen: searchIsOpen}">
        <svg @click="search" class="svg" x="0px" y="0px" viewBox="0 0 699 695" style="enable-background:new 0 0 699 695;" xml:space="preserve">
          <g>
            <path class="st0" d="M280.8,81.4C173.3,81.4,86,167.6,86,273.9c0,106.3,87.2,192.5,194.8,192.5c107.6,0,194.8-86.2,194.8-192.5
              C475.7,167.6,388.4,81.4,280.8,81.4z M188.6,345.1c-2.9,0-5.8-0.9-8.2-2.8c-5.7-4.5-6.6-12.7-2.1-18.3l136.1-169.2
              c4.5-5.6,12.8-6.5,18.5-2.1c5.7,4.5,6.7,12.6,2.1,18.3L198.9,340.2C196.3,343.4,192.4,345.1,188.6,345.1z M392,227.4L255.9,396.6
              c-2.6,3.2-6.4,4.9-10.3,4.9c-2.9,0-5.8-0.9-8.2-2.8c-5.7-4.5-6.7-12.7-2.1-18.3l136.1-169.2c4.5-5.6,12.8-6.6,18.5-2.1
              C395.6,213.6,396.5,221.8,392,227.4z"/>
            <path class="st1" d="M675.6,601.2l-2.9-2.9l-71.1,70.3l1.7,1.7l18.9,18.6c12.1,12,37.8,5.9,57.4-13.5
              c19.6-19.4,25.7-44.8,13.7-56.8L675.6,601.2L675.6,601.2z"/>
            <polygon class="st2" points="655.2,581.4 584.1,651.6 601.5,668.6 672.6,598.3 670.6,596.3 670.5,596.3 	"/>
            <path class="st1" d="M277,0.1C124,0.1,0,122.7,0,273.9c0,151.2,124,273.8,277,273.8c56.7,0,109.4-16.9,153.3-45.8l153.8,149.7
              l71.1-70.2L502.5,432.7c32.4-44.8,51.6-99.5,51.6-158.8C554.1,122.7,430.1,0.1,277,0.1z M280.8,466.5
              C173.3,466.5,86,380.3,86,273.9c0-106.3,87.2-192.5,194.8-192.5c107.6,0,194.8,86.2,194.8,192.5
              C475.7,380.3,388.4,466.5,280.8,466.5z"/>
            <path class="st3" d="M314.3,154.8L178.2,324c-4.5,5.6-3.6,13.8,2.1,18.3c2.4,1.9,5.3,2.8,8.2,2.8c3.9,0,7.7-1.7,10.3-4.9L334.9,171
              c4.5-5.6,3.6-13.8-2.1-18.3C327.1,148.3,318.8,149.2,314.3,154.8z"/>
            <path class="st3" d="M371.4,211.2L235.3,380.4c-4.5,5.6-3.6,13.8,2.1,18.3c2.4,1.9,5.3,2.8,8.2,2.8c3.9,0,7.7-1.7,10.3-4.9
              L392,227.4c4.5-5.6,3.6-13.8-2.1-18.3C384.2,204.6,375.9,205.6,371.4,211.2z"/>
          </g>
        </svg>
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
      searchIsOpen: false,
    }
  },
  methods: {
    ...mapMutations(['set_name']),
    load() {
      this.splitTimers
    },
    search() {
      this.searchIsOpen = !this.searchIsOpen
      if(!this.searchIsOpen){
        //closed, was open
        this.$refs.input.blur();
        let key = this.$refs.input.value.trim().split(' ')[0]
        this.$store.dispatch('search', key)
      }else{
        //open
        this.$refs.input.select();
      }
        
    }
  },
  computed: {
    ...mapGetters(['get_timers']),
    split_keys() {
      console.log('split keys ')
      let keys = Object.keys(this.get_timers)
      keys.reverse()
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
.svg{
  width: 30px;
  height: 32px;
  order: 2 ;
}
.searchbox{
  margin-top: 0px!important;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
}
.searchIsOpen{
  width: calc(200px + 12vw)!important;
}
.search{
  outline: none;
  width: 0px;
  transition: 0.5s all;
  order: 1;
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-family: 'Pacifico';
  border-bottom: 1px solid rgba(30,30,30,0.3);
  height: 35px;
}
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
  box-sizing: border-box;
  max-width: 970px;
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
.st0{fill:none;}
.st1{fill:#616E7D;}
.st2{fill:#AAD4C8;}
.st3{fill:#82BFAB;}
</style>
