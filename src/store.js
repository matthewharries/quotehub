import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		user: {},
    loggedIn: false,
    loginError: '',
    registerError: '',
    quotelist: [],
  },
  getters: {
		user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    quotelist: state => state.quotelist,
  },
  mutations:{ 
		setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setQuoteList (state, quoteData) {
      state.quotelist = quoteData;
    },
  },
  actions: {
		// Registration, Login //
    register(context,user) {
      axios.post("/api/users",user).then(response => {
				context.commit('setUser', response.data.user);
				context.commit('setLogin',true);
				context.commit('setRegisterError',"");
				context.commit('setLoginError',"");
      }).catch(error => {
				context.commit('setLoginError',"");
				context.commit('setLogin',false);
				if (error.response) {
					if (error.response.status === 403)
						context.commit('setRegisterError',"That email address already has an account.");
					else if (error.response.status === 409)
						context.commit('setRegisterError',"That user name is already taken.");
					return;
				}	
				context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },
		
		login(context,user) {
      axios.post("/api/login",user).then(response => {
				context.commit('setUser', response.data.user);
				context.commit('setLogin',true);
				context.commit('setRegisterError',"");
				context.commit('setLoginError',"");
      }).catch(error => {
				context.commit('setRegisterError',"");
				if (error.response) {
					if (error.response.status === 403 || error.response.status === 400)
						context.commit('setLoginError',"Invalid login.");
					context.commit('setRegisterError',"");
					return;
				}
				context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
		logout(context,user) {
      context.commit('setUser', {});
      context.commit('setLogin',false);
    },
		getQuoteList(context) {
      axios.get("/api/users/" + context.state.user.id + "/quotes").then(response => {
				context.commit('setQuoteList',response.data.quotes);
      }).catch(err => {
				console.log("getQuoteList failed:",err);
      });
    },
		addQuote(context, quote) {
      axios.post("/api/users/" + context.state.user.id + "/quotes", quote).then(response => {
				return context.dispatch('getQuoteList');
      }).catch(err => {
				console.log("addQuote failed:",err);
      });
    },
		removeQuote(context, quote) {
      axios.delete("/api/quotes/" + quote.id).then(response => {
				return context.dispatch('getQuoteList');
      }).catch(err => {
				console.log("deleteQuote failed:",err);
      });
    }
  }
});
