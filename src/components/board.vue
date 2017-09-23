<template>
	<div class="box">
		<canvas 
			:class="{draged:mouse.clicking}" 
			v-graph 
			:width="width" 
			:height="height"
			@mouseup="mouseup"
			@mousedown="mousedown"
			@mousemove="mousemove"
			@mouseleave="mouseup">
		</canvas>

		<a class="button" @click="zoomin">
			<i class="fa fa-search-plus"></i>
		</a>
		<a class="button" @click="zoomout">
			<i class="fa fa-search-minus"></i>
		</a>
	</div>
	

</template>



<style scoped lang="css">
.draged{
	cursor:grabbing;
}
</style>




<script>
import Graphics from './../graphics.js'


export default {
	props:['functions'],


	data(){return{
		width:800,
		height:600,
		graphics: {},
		mouse:{
			clicking:false
		}
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
		},

		testT(){
			alert('zefzef')
		},

		mousedown(){
			this.mouse.clicking = true;
		},
		mouseup(){
			this.mouse.clicking = false;
		},
		mousemove(e){
			if(this.mouse.clicking){
				var {movementX,movementY} = e
				this.graphics.drag(movementX,movementY)
			}
		},

	},




	directives:{
		graph:{
			
			bind:function (e,binding,vnode) {
				var viewport = {left:-8 , right:8,top:6   , bottom:-6}
				var ctx = e.getContext('2d')
				vnode.context.graphics = new Graphics(e.getContext('2d'),viewport)
				vnode.context.render()
			},

			update:function(e,binding,vnode){
				vnode.context.render()
			}
			



		}
	}
}
</script>


