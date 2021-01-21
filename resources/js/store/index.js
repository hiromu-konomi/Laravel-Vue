import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import category from './category';
import payment from './payment';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        category,
        payment
    }
})

export default store