<template>
	<div class="box">
		<canvas 
			v-graph 
			 :width="width" 
			 :height="height">
		</canvas>

		<a class="button" @click="zoomin">
			<i class="fa fa-search-plus"></i>
		</a>
		<a class="button" @click="zoomout">
			<i class="fa fa-search-minus"></i>
		</a>
	</div>
	

</template>

<script>
import Graphics from './../graphics.js'


export default {
	props:['functions'],


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

			var functions = this.functions
			for(var i=0;i<functions.length;i++){
				graphics.renderFunction(functions[i])
			}
		},

		zoomin(){
			this.graphics.zoom(1/1.5)
		},
		zoomout(){
			this.graphics.zoom(1.5)
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
