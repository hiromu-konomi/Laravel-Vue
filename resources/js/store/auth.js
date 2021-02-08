const state = {
    user: {
        id: undefined,
        name: undefined
    },
    token: window.localStorage.getItem("auth")
}

const getters = {
    userName(state) {
        const userName = state.user.name;
        console.log("userName = " + userName);
        return userName;
    }
}

const mutations = {
    setUser(state, user) {
        state.user.id = user.id;
        state.user.name = user.name;
    },

    removeUser(state) {
        state.user.id = undefined;
        state.user.name = undefined;
    }
}

const actions = {
    register({commit}, request) {
        axios.post('api/register', request).then((result) => {
            commit("setUser", result.data.user);
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
        });
    },

    logout({commit}) {
        axios.post('api/logout').then(() => {
            commit("removeUser");
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