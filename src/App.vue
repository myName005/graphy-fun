<template>
  <div id="app">
    <div class="container" >
      <navbar></navbar>  
      <section class="section">
        <div class="columns">
          <div class="column is-8">
            <board :functions="functions"></board>
          </div>
          <div class="column is-4">
            <function-list :functions="functions"
            @input="addFunction" @delete="deleteFunction"></function-list>
          </div>
        </div>
      </section>
      
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import board from './components/board.vue'
import functionList from './components/functionsList.vue'

export default {
  name: 'app',
  components:{
    'navbar':navbar,
    'board':board,
    'function-list':functionList
  },

  data(){return{
    functions:[]
  }},

  methods:{
    addFunction(func){
      this.functions.push(func)
    },
    deleteFunction(key){
      this.functions.splice(key,1)
    }

  }
}
</script>

<style lang="scss">
@import './../node_modules/bulma/bulma.sass';
</style>