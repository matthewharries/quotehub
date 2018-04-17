<template>
  <div>
    <div v-if="loggedIn">
      <quote-list/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import QuoteList from './QuoteList';
 export default {
   name: 'HomePage',
   components: {WelcomePage,QuoteList},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
</style>