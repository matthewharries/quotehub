<template>
  <div class="quotes">
    <div>
      <form v-on:submit.prevent="addQuote" class="quoteForm">
				<textarea v-model="text" placeholder=""/><br/>
				<div class="buttonWrap">
					<input class="wide" v-model="author" placeholder="Author">
	  			<button class="primary" type="submit">Add Quote</button>		
				</div>
      </form>
    </div>
    <div v-for="item in quotelist" class="item">
      <p class="quote">{{item.quote}}</p>
      <p class="author">{{item.author}}</p>
      <form v-on:submit.prevent="removeQuote(item)">
				<div class="buttonWrap">
					<button class="alternate delete" type="submit">Remove</button>		
				</div>
			</form>  
	</div>
  </div>
</template>

<script>
 import moment from 'moment';
 export default {
   name: 'QuoteList',
   data () {
     return {
       text: '',
			 author: ''
     }
   },
   created: function() {
     this.$store.dispatch('getQuoteList');
   },
   computed: {
     quotelist: function() {
       return this.$store.getters.quotelist;
     },
   },
   methods: {
     addQuote: function() {
			 if(this.text == "") return;
			 if (this.author == "") this.author = "Anonymous";
       this.$store.dispatch('addQuote',{
         quote: {text: this.text, author: this.author}
       }).then(quote => {
	 			 this.text = "";
	 			 this.author = "";
       });
     },
		 removeQuote: function(item){
			 this.$store.dispatch('removeQuote',{
         id: item.id
       }).then(quote => {
       });
		 }
   }
 }
</script>

<style scoped>
 .quotes {
     width: 600px;
 }
 .quoteForm {
     background: #8BD7D2;
     padding: 10px;
     margin-bottom: 10px;
	 	border-radius: 5px;
 }
 .buttonWrap {
     width: 100%;
     display: flex;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
 }
 textarea {
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
 }
 .item {
     padding: 10px;
 }
 .quote {
   margin-top: 0px;
	 font-style: italic;
	 
	}
.author {
	margin-bottom: 0px;
	border-bottom: 1px solid #ddd;
	width: 100%;
	text-align: right;
	font-weight: 600;
 }
	.delete {
		margin-top: 5px;
		float: right;
		background-color: coral;
	}

</style>