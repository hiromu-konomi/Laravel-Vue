const state = {
    user: {},
}

const getters = {}

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
}

const actions = {
    register({commit}, request) {
        console.log("request = " + request);
        axios.post('api/register', request).then((result) => {
            commit("setUser", result.data.user);
            localStorage.setItem("auth", "true");
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