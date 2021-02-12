import router from '../router';

const state = {
    user: {
        id: undefined,
        name: undefined
    },
}

const getters = {}

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
    register({dispatch, commit}, request) {
        axios.post('api/register', request).then((result) => {
            commit("setUser", result.data.user);
            var exCategory = {
                ex_category_name: '食費',
                ex_category_color: 'red',
                user_id: result.data.user.id
            };
            axios.post('/api/ex_categories', exCategory);
            var exCategory = {
                ex_category_name: '交通費',
                ex_category_color: 'green',
                user_id: result.data.user.id
            };
            axios.post('/api/ex_categories', exCategory);
            var exCategory = {
                ex_category_name: '住居費',
                ex_category_color: 'indigo',
                user_id: result.data.user.id
            };
            axios.post('/api/ex_categories', exCategory);
            var exCategory = {
                ex_category_name: 'その他',
                ex_category_color: 'orange',
                user_id: result.data.user.id
            };
            axios.post('/api/ex_categories', exCategory);
            var inCategory = {
                in_category_name: '財布',
                in_category_color: 'red',
                user_id: result.data.user.id
            };
            axios.post('/api/in_categories', inCategory);
            var inCategory = {
                in_category_name: '銀行',
                in_category_color: 'blue',
                user_id: result.data.user.id
            };
            axios.post('/api/in_categories', inCategory);
            var inCategory = {
                in_category_name: 'その他',
                in_category_color: 'orange',
                user_id: result.data.user.id
            };
            axios.post('/api/in_categories', inCategory);
            dispatch("category/getExCateDatas", result.data.user.id, {root: true});
            dispatch("category/getInCateDatas", result.data.user.id, {root: true});
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
        });
    },

    async login({commit}, request) {
        var result = await axios.post('api/login', request);
        if(result.data.user.length){
            commit("setUser", result.data.user[0]);
            localStorage.setItem("auth", "true");
            router.push({name: "Form"});
        } else {
            alert("メールアドレスまたはパスワードが違います");
        }
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