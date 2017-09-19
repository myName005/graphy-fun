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
		
		<a class="panel-block">
			<span class="panel-icon">
				<i class="fa fa-circle"></i>
			</span>
			<div class="container">
				Bureg
				<span class="delete is-pulled-right"></span>
			</div>
		</a>

	</nav>
</template>

<script>
export default {
	props:['functions'],
	

	data(){return{
		expression:''
	}},

	
	methods:{
		addFunction(){
			this.$emit('input',this.expression)
			this.expression = '';
		}
	}
}
</script>