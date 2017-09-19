<template>
  <div id="app">
    <div class="container" >
      <navbar></navbar>  
      <section class="section">
        <div class="columns">
          <div class="column is-8">
            <board></board>
          </div>
          <div class="column is-4">
              
          </div>
        </div>
      </section>
      
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import board from './components/board.vue'


export default {
  name: 'app',
  components:{
    'navbar':navbar,
    'board':board,
  }
}
</script>

<style lang="scss">
@import './../node_modules/bulma/bulma.sass';
</style>