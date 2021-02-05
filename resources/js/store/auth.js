import axios from "axios"
import { result } from "lodash"

const state = {
    user: null,
    token: window.localStorage.getItem('token'),
    message: null
}

const getters = {}

const mutations = {
    setUser(state, user) {
        state.user = user;
    },

    setMessage(state, message) {
        state.message = message;
    },

    setToken(state, token) {
        window.localStorage.setItem('token', token);
    }
}

const actions = {
    register({commit}, request) {
        console.log("request = " + request);
        axios.post('api/register', request).then((result) => {
            commit("setUser", result.data.user);
            commit("setToken", result.data.token);
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
        });
    },

    login({commit}, request) {
            axios.post('/api/login', request)
                .then((result) => {
                    console.log(result);
                    commit("setUser", result.data.user);
                    commit("setMessage", result.data.message);
                    localStorage.setItem("auth", "true");
                    console.log("user = " + result.data.user + " + " + this.state.user);
                    console.log("message = " + result.data.message + " + " + this.state.message);
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
    },

    logout({commit}) {
        axios.post('api/logout').then(() => {
            commit("removeUser");
            localStorage.removeItem("auth")
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}