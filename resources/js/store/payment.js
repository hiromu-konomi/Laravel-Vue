import axios from "axios"

const state = {
    exDatas: [],
    inDatas: [],
}

const getters = {}

const mutations = {}

const actions = {

    async getTotalThisYear({ commit }) {
        axios.get('api/totalYear')
            .then((res) => {
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