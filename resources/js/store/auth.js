import axios from "axios"
import { result } from "lodash"

const state = {
    user: null,
    token: window.localStorage.getItem('token')
}

const getters = {}

const mutations = {
    setUser(state, user) {
        state.user = user;
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

    logout({commit}) {
        axios.post('api/logout', null, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            commit("setUser", null);
            commit("setToken", null);
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