import axios from "axios"

const state = {
    exDatas: [],
    inDatas: [],
}

const getters = {}

const mutations = {
    getExDatas(state, resData) {
        state.exDatas = resData;
    },

    getInDatas(state, resData) {
        state.inDatas = resData;
    },
}

const actions = {
    async getExDatas({commit}) {
        await axios.get('/api/expends').then((res) => {
            commit("getExDatas", res.data);
        });
    },

    async getInDatas({commit}) {
        await axios.get('/api/incomes').then((res) => {
            commit("getInDatas", res.data);
        });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}