import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import category from './category';
import payment from './payment';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        category,
        payment
    }
})