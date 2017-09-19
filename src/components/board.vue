<template>
	<canvas v-graph class="card" :width="width" :height="height"></canvas>
</template>

<script>
import Graphics from './../graphics.js'


export default {
	data(){return{
		width:800,
		height:600,
		graphics: {}
	}},



	methods:{
		render(){
			var graphics = this.graphics
			graphics.clear()
			graphics.renderGrid()
			graphics.renderAxies()
		}
	},




	directives:{
		graph:{
			
			bind:function (e,binding,vnode) {
				var viewport = {left:-8 , right:8,top:6   , bottom:-6}
				var ctx = e.getContext('2d')
				vnode.context.graphics = new Graphics(e.getContext('2d'),viewport)
				vnode.context.render()
			},


			update:function (e,binding,vnode) {
				vnode.context.render()
			}


		}
	}
}
</script>
