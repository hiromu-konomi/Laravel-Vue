const state = {
    message: null,
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

    setMessage(state, message) {
        state.message = message;
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

    login({commit}, request) {
            axios.post('api/login', request)
                .then((result) => {
                    console.log(result);
                    commit("setUser", result.data.user[0]);
                    // commit("setMessage", result.data.message);
                    localStorage.setItem("auth", "true");
                    // console.log("message = " + result.data.message + " + " + this.state.message);
                })
                .catch(error => {
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