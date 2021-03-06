import axios from "axios";

const state = {
    exCateDatas: [],
    inCateDatas: [],
    exCateId: undefined,
    inCateId: undefined
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

    removeCateDatas(state) {
        state.exCateDatas = [];
        state.inCateDatas = [];
        state.exCateId = undefined;
        state.inCateId = undefined;
    }
}

const actions = {
    async getExCateDatas({commit}, userId) {
        await axios.get('/api/ex_categories/' + userId).then((res) => {
            commit("getExCateDatas", res.data.exCategories);
        }).catch(error => console.log(error));
    },

    async getInCateDatas({commit}, userId) {
        await axios.get('/api/in_categories/' + userId).then((res) => {
            commit("getInCateDatas", res.data.inCategories);
        }).catch(error => console.log(error));
    },

    setExCateId({commit}, id) {
        commit("setExCateId", id);
    },

    setInCateId({commit}, id) {
        commit("setInCateId", id);
    },

    removeCateDatas({commit}) {
        commit("removeCateDatas");
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}