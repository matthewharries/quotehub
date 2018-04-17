<template>
  <div id="app">
    <app-header/>
    <router-view/>
		<footer><a href="https://github.com/matthewharries/quotehub" target="_blank">Github</a></footer>
  </div>
</template>

<script>
 import AppHeader from './components/AppHeader';
 export default {
   name: 'App',
   components: { AppHeader }
 }
</script>

<style>
	
	/*
		color scheme:
		#49C6E5
		#54DEFD
		#FFFBFA
		#00BD9D
		#8BD7D2
	*/
	
 body {
     font-size: 18px;
     padding: 20px 100px 0px 100px;
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
 }
 button {
     color: #fff;
     min-width: 100px;
     line-height: 1em;
     border: none;
     border-radius: 2px;
     color: white;
     padding: 10px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 1.2rem;
     padding-top: 5px;	 
 }
 button.primary {
     background-color: #49C6E5;
 }
 button.alternate {
     background-color: #00BD9D;
 }
 button:focus {
     outline: none;
 }
 button.primary:hover {
	 background-color: #54DEFD;
 }
	button.alternate:hover {
		background-color: #8BD7D2;
	}
 input {
     height: 15px;
     padding: 10px;
 }
 .flexWrapper {
     display:flex;
 }
 .flexRight {
     margin-left: auto;
 }
 .error {
     color: #F35537;
 }
 .column {
     width: 800px;
 }
	footer {
		margin-top: 100px;
		text-align: center;
	}
	
</style>
