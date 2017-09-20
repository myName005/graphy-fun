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
				<span class="delete is-pulled-right"></span>
			</div>
		</a>

	</nav>
</template>

<script>
import functionParse from './../functionParse.js'

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

			this.$emit('input',func)
			this.expression = ''
		}
	}
}
</script>