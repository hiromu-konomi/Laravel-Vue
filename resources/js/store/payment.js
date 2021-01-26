import axios from "axios";

const state = {
    exDatas: [],
    inDatas: [],
}

const getters = {
    sumExpenditure(state)  {
        var totalExpenditure = 0;
        for(var exData of state.exDatas){
            totalExpenditure += Number(exData.expend_price);
        }
        return totalExpenditure;
    },

    sumIncome(state) {
        var totalIncome = 0;
        for(var inData of state.inDatas){
            totalIncome += Number(inData.income_price);
        }
        return totalIncome;
    },

    sumBalance() {
        return getters.sumIncome(state) - getters.sumExpenditure(state);
    }
}

const mutations = {
    getExDatas(state, resData) {
        state.exDatas = resData;
    },

    getInDatas(state, resData) {
        state.inDatas = resData;
    },
}

const actions = {
    async getExDatas({commit}) {
        await axios.get('/api/expends').then((res) => {
            commit("getExDatas", res.data);
        });
    },

    async getInDatas({commit}) {
        await axios.get('/api/incomes').then((res) => {
            commit("getInDatas", res.data);
        });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}