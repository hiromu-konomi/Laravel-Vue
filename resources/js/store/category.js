import axios from "axios";

const state = {
    exCateDatas: [],
    inCateDatas: [],
    exCateId: undefined,
    inCateId: undefined,
}

const getters = {
    getExCateName(state) {
        if (state.exCateId) {
            for (var eC of state.exCateDatas) {
                if (eC.id === state.exCateId) {
                    return eC.ex_category_name;
                }
            }
        } else {
            return '未選択'
        }
    },

    getInCateName(state) {
        if (state.inCateId) {
            for (var iC of state.inCateDatas) {
                if (iC.id === state.inCateId) {
                    return iC.in_category_name;
                }
            }
        } else {
            return '未選択'
        }
    },

    getExCateColor(state) {
        if (state.exCateId) {
            for (var eC of state.exCateDatas) {
                if (eC.id === state.exCateId) {
                    return eC.ex_category_color;
                }
            }
        } else {
            return 'grey'
        }
    },

    getInCateColor(state) {
        if (state.inCateId) {
            for (var iC of state.inCateDatas) {
                if (iC.id === state.inCateId) {
                    return iC.in_category_color;
                }
            }
        } else {
            return 'grey'
        }
    },
}

const mutations = {
    getExCateDatas(state, resData) {
        state.exCateDatas = resData;
    },

    getInCateDatas(state, resData) {
        state.inCateDatas = resData;
    },

    setExCateId(state, id) {
        state.exCateId = id;
    },

    setInCateId(state, id) {
        state.inCateId = id;
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

    setExCateId({commit}, id) {
        commit("setExCateId", id);
    },

    setInCateId({commit}, id) {
        commit("setInCateId", id);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}