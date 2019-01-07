import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			component: () => import('./views/main/Fullpage.vue')
		},
		{
			path: '/:id',
			name: 'timer',
			component: () => import('./views/Show.vue')
		},
	]
})
console.log(router.mode)
// javascript search table
let pages = {
	explore: '1',
	index: '2',
	create: '3',
	about: '4',
	
}
let rulesFrom = {
	index: () => {
		store.state.stopHomeTimer = true;
		console.log(`set store.state.stopHomeTimer to ${store.state.stopHomeTimer}`)
	},
	create: ()=> true,
	about: ()=> store.state.state !== null,
	explore: ()=> true
}
let rules = {
	index: ()=> {
		store.state.stopHomeTimer = false;
		console.log(`set store.state.stopHomeTimer to ${store.state.stopHomeTimer}`)
		return true
	},
	create: ()=> true,
	about: ()=> true,
	explore: ()=> true
}

export default router
router.afterEach((to, from) => {
	console.log(store.state)
	parallax();
	
	function parallax(){
		// make parallax effect only index page
		if(to.path != "/"){
			console.log('return')
			return
		}
		
		let perc = '%'
		let $to = to.hash
		let $from = from.hash
		// no parallax, if user loads index page
		if (($to == "" && $from == "") || ($to == $from)) {
			
			return;
		}
		console.log(from, $to)
		if ($from == "") {
			$from = 'index'
		} else {
			$from = $from.split('#').pop() // get id of current fullpage
		}
		if ($to == "") {
			$to = 'index'
		} else {
			$to = $to.split('#').pop() // get id of current fullpage
		}
		
		rulesFrom[$from]();
		// if rules not allow, return to previous page
		if(!rules[$to]()){
			console.log('error')
			return router.replace({name: 'home'})
		}
		console.log('fak yu')
		let $to_id = pages[$to]
		let $from_id = pages[$from]
		console.log($to, $from)
		let $forward = ($to_id > $from_id) ? true : false
		console.log($forward)
		perc = ($to_id - 1)*-100 + '%'

		Vue.nextTick(() => {
			tween()
		})
		function tween() {
			
			let $cur = document.querySelector('#' + $from)
			let $next = document.querySelector('#' + $to)
			let main = document.querySelector('#fullpage')
			
			TweenLite.set($cur, {
				css: {zIndex:2}
			})
			TweenLite.set($next, {
				css: {zIndex:1}
			})
			if($forward){
				TweenLite.fromTo($next, 1, {
					x: '-=40%'
				}, {
					x: '0%'
				});
			}
			else{
				TweenLite.fromTo($next, 1, {
					x: '+=40%'
				}, {
					x: '0%'
				});
			}
			TweenLite.to(main, 1, 
				{
					x: perc
				});
		}
	}
})