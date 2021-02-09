import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import auth from './auth';
import category from './category';
import payment from './payment';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        category,
        payment
    },

    plugins: [createPersistedState(
        {
            key: 'LaravelKakebo',
            paths: [
                'auth.user.id',
                'auth.user.name'
            ],
        }
    )]
})

export default store