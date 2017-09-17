<template>
  <div id="app">
    <div class="container" >
      <navbar></navbar>  
      <div class="columns">
        <div class="column is-8">
          
        </div>
        <div class="column is-4">
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'


export default {
  name: 'app',
  components:{
    'navbar':navbar
  }
}
</script>

<style lang="scss">
@import './../node_modules/bulma/bulma.sass';
</style>