const state = {
    exCateDatas: [],
    inCateDatas: [],
}

const getters = {}

const mutations = {
    getExCateDatas(state, resData) {
        state.exCateDatas = resData;
    },

    getInCateDatas(state, resData) {
        state.inCateDatas = resData;
    },
}

const actions = {
    async getExCateDatas({commit}) {
        await axios.get('/api/ex_categories').then((res) => {
            commit("getExCateDatas", res.data);
        }).catch(error => console.log(error));
    },

    async getInCateDatas({commit}) {
        await axios.get('/api/in_categories').then((res) => {
            commit("getInCateDatas", res.data);
        }).catch(error => console.log(error));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}