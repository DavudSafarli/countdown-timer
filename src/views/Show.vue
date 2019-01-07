<template>
  <div class="fullpage-page show">
    <div class="text">
      <h1>After</h1>
    </div>
    <timer v-if="create"
      :day="create.day"
      :hour="create.hour"
      :min="create.min"
      :sec="create.sec"
      :stop="stop"
    ></timer>
  </div>  
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import store from "../store";
export default {
  async mounted() {
    
    let id = this.$route.params.id;
    store.dispatch("fetch_timer_local", id)
    this.id=id
  },
  asyncComputed: {
    async create(){
      return new Promise((resolve, reject) => {
        if(this.get_mine(this.id)){
          this.$store.dispatch('create', {date: this.get_mine(this.id), timezone: ''})
          .then(res=>{
            this.timer = res;
            return resolve(res)
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters(["get_mine"]),
    },
  data() {
    return {
      timer: {},
      stop: false,
      id: null
    }
  },
};
</script>

<style scoped>
.text{
  cursor: pointer;
  font-family: "Pacifico";
  top: 0;
  position: absolute;
  padding-top: 5px;
  color: #fff;
  font-size: 40px;
}
.show {
  background: #ff4757;
}
</style>
