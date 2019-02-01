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
	],
})
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
		return true;
	},
	create: ()=> true,
	about: ()=> true,
	explore: ()=> true
}
let rules = {
	index: ()=> {
		store.state.stopHomeTimer = false;
		return true
	},
	create: ()=> true,
	about: ()=> store.state.state !== null,
	explore: ()=> true
}

export default router
//error flag, if set true, do not parallax and stay at the same page
let flag = false;


router.beforeEach((to, from, next) => {
	let $to = to.hash.replace('#', '')
	$to = ($to == '')? 'index': $to
	
	if(pages[$to] == undefined){
		// flag = true;
		next(false)
		return;
	}
	next()
})

router.afterEach((to, from) => {
	if(flag){
		flag = false;
		return;
	}
	parallax();
	function parallax(){

		let $transition_time = 1;
		let perc = '%'
		let $to = to.hash
		
		let $from = from.hash
		// no parallax, if user loads index page
		if (to.path != "/" || ($to == "" && $from == "") || ($to == $from)) {
			return;
		}
		if(from.name == null || from.name == "timer"){
			$transition_time = 0;
		}
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
		

		
		if(rulesFrom[$from]){
			rulesFrom[$from]();
		}

		// if rules not allow, return to previous page
		// debugger
		if(rules[$to] && !rules[$to]()){
			flag = true;
			window.history.back();
			return;
		}
		// debugger
		let $to_id = pages[$to]
		let $from_id = pages[$from]

		let $forward = ($to_id > $from_id) ? true : false

		perc = ($to_id - 1)*-100 + '%'
		// debugger
		Vue.nextTick(() => {
			tween()
		})
		function tween() {
			
			let $cur = document.querySelector('#' + $from)
			let $next = document.querySelector('#' + $to)
			let main = document.querySelector('#fullpage')
			// debugger
			// main.scrollIntoView()
			TweenLite.set($cur, {
				css: {zIndex:2}
			})
			TweenLite.set($next, {
				css: {zIndex:1}
			})
			if($forward){
				TweenLite.fromTo($next, $transition_time, {
					x: '-=40%'
				}, {
					x: '0%'
				});
			}
			else{
				TweenLite.fromTo($next, $transition_time, {
					x: '+=40%'
				}, {
					x: '0%'
				});
			}
				TweenLite.to(main, $transition_time,
				{
					x: perc,
					// onStart: function() {
					// 	document.getElementById('fullpage').scrollIntoView()
					// }
				});
		}
	}
})