<template>
  <div v-if="true" class="fullpage-page about">
      <h1 class="flat-shadow">What is it about?</h1>
      <div class="content content-about">
          <div class="input-container">
              <input @keydown.tab="$refs.description.focus()" @focusin="nameActive = !nameActive" @focusout="nameActive = !nameActive" ref="name" spellcheck="false" type="text" v-model="name">
              <label @click="$refs.name.focus()" :class="{'label-active': (nameActive || name !== '')}">Give it a name!</label>
          </div>
          <div class="input-container textfield-font">
              <div class="magic-div">{{about}}</div>
              <div class="textfield-container">
                <textarea @focusin="aboutActive = !aboutActive" @focusout="aboutActive = !aboutActive" ref="description" spellcheck="false" v-model="about"></textarea>
              </div>
              <label @click="$refs.description.focus()"  for="" :class="{'label-active': (aboutActive || about !== '')}">Description (optional)</label>              
          </div>
          <div class="next">
            <right-arrow @click.native="store()" :class="{'bttn-off': name.length < 4}"></right-arrow>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return{
      name: '',
      nameActive: false,
      about: '',
      aboutActive: false,
    }
  },
  computed: {
    ...mapGetters(['get_state'])
  },
  methods: {
    ...mapMutations(['set_name']),
    store() {
      console.log('123')
      this.set_name({name: this.name, about: this.about})
      this.$store.dispatch('store', {router: this.$router})
    }
  }
};
</script>

<style>
.about {
  background: #5affe9;
  --primary: #47beaf;
  --secondary: #2c3e50;
}
.next{
  display: flex;
  justify-content: flex-end;
  width: 80%;
  height: 60px;
  position: absolute;
  bottom: 5%;
}
.label-active{
  color: #47beaf;
  transform: translateX(calc(-100% - 20px));
}
label{
  z-index: 1;
  color: rgb(121, 121, 121);
  transition: 0.5s;
  position: absolute;
  top: 3px;
  left: 10px;
}
.textfield-font{
  font-size: 22px!important;
}
.content-about{
  top: 25%;
  justify-content: flex-start;  
}
.textfield-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.magic-div{
  padding: 3px 0 3px 10px;
  font-size: inherit;
  visibility: hidden;
  box-sizing: border-box;
  padding-left: 10px;
  min-height: 45px;
  width: 100%;
  word-break: break-all;
  white-space: pre-wrap;
}
textarea{
  overflow: hidden;
  height: 100%;
  width: 100%;
  resize: none;
  word-break: break-all;
}
.input-container{
  margin: 5vh 0 15vh 0;
  width: calc(180px + 20vw);
  position: relative;
  font-size: 30px;
}
.about input,.about textarea{
  background: transparent;
  border-bottom : 1px solid rgba(255, 255, 255, 0.6);
}
input, textarea{
  z-index: 3;
  border: none;
  border-bottom : 1px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  padding: 3px 0 3px 10px;
  width: 100%;
  outline: none;
  font-size: inherit;
  border-radius: 10px; 
}
.input-container *{
  font-family: 'Pacifico';
}

@media screen and (max-width: 900px) {
 .input-container{
   font-size: 25px;
 }
}
@media screen and (max-width: 840px) {
 .about .text{
    padding: 20px;
    font-size: 30px;
 }
 .label-active{
  color: #47beaf;
  transform: translateY(calc(-100% - 20px));
}
}
</style>
