<template>
  <NavBar :user="user"/>
  <RouterView :user="user"></RouterView>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar
  },
  data(){
    return{
      user:[]
    }
  },
  computed:{
    ...mapState([
      "userId"
    ])
  },
  created(){
    this.userId=this.user
  }
}
</script>

<style>

</style>
