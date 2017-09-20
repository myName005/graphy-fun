<template>
	<nav class="panel">
		<p class="panel-heading">
			Functions
		</p>
		<div class="panel-block">
			<p class="control has-icons-left">

				<input class="input" v-model="expression"
				@keyup.enter="addFunction" placeholder="type function expression...">
				<span class="icon is-small is-left">
					y =
				</span>
			</p>
		</div>
		
		<a class="panel-block" v-for="(func,key) in functions">
			<span class="panel-icon">
				<i class="fa fa-circle"></i>
			</span>
			<div class="container">
				{{func.expression}}
				<span class="delete is-pulled-right" @click="deleteFunction(key)"></span>
			</div>
		</a>

	</nav>
</template>

<script>
import functionParse from './../functionParse.js'
import randomColor from './../tools/colors.js'

export default {
	props:['functions'],
	

	data(){return{
		expression:''
	}},

	
	methods:{
		addFunction(){
			var func = {};
			func.expression = this.expression
			func.calculate = functionParse(this.expression)
			func.color = randomColor()

			this.$emit('input',func)
			this.expression = ''
		},

		deleteFunction(key){
			this.$emit('delete',key)
		}
	}
}
</script>