import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Create from './views/Create.vue'
Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/p',
			name: 'p',
			component: Home
		},
		{
			path: '/create',
			name: 'create',
			component: Create
		},
	]
})

export default router
router.afterEach((to, from) => {
	// console.log(from, to)
	let perc = '-=100%'
	let $to = to.hash
	let $from = from.hash
	// console.log($from, $to)
	if (($to == "" && $from == "") || ($to == $from)) {
		return;
	}

	if ($from == "") {
		$from = 'container1'
	} else {
		$from = $from.split('#').pop()
	}
	if ($to == "") {
		$to = 'container1'
	} else {
		$to = $to.split('#').pop()
	}
	// console.log($from, $to)
	let between = $to.split('container').pop() - $from.split('container').pop()
	// console.log('from: ' + $from.split('container').pop() + '  , to: ' + $to.split('container').pop())
	let $forward = (between > 0) ? true : false
	// console.log($forward)

	perc = Math.abs(between) * 100 + '%';
	let perc2 = '40%';
	if ($forward) {
		perc = '-=' + perc
		perc2 = '-=' + perc2
	} else {
		perc = '+=' + perc
		perc2 = '+=' + perc2
	}
	console.log(perc, perc2)

	Vue.nextTick(() => {
		tween()
	})
	function tween() {

		let $cur = document.querySelector('#' + $from)
		let $next = document.querySelector('#' + $to)
		let main = document.querySelector('#home')
	
		console.log($cur, $next)
		// TweenLite.fromTo($next, 2, {
		// 	x: '-=40%'
		// }, {
		// 	x: '0%'
		// });

		// TweenMax.to($cur, 1, {
		// 	x: '-=40%'
		// });

		TweenLite.to(main, 1, 
		{
		    x: perc
		});
	}

})