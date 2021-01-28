import moment from "moment"

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
    },

    exInToCalender() {
        const events = [];
        for(let ex of state.exDatas){
            const exEvent = {
                name: '支出：' + Number(ex.expend_price).toLocaleString() + '円',
                start: moment(ex.expend_date).toDate(),
                end: moment(ex.expend_date).toDate(),
                color: 'blue',
                timed: false,
            }
            events.push(exEvent);
        }
        for (let inc of state.inDatas) {
            const inEvent = {
                name: '収入：' + Number(inc.income_price).toLocaleString() + '円',
                start: moment(inc.income_date).toDate(),
                end: moment(inc.income_date).toDate(),
                color: 'red',
                timed: false,
            }
            events.push(inEvent);
        }
        return events;
    }
}

const mutations = {
    getExDatas(state, resData) {
        state.exDatas = resData;
    },

    getInDatas(state, resData) {
        state.inDatas = resData;
    },

    setExDatasWithCateDatas(state, exDatas) {
        state.exDatas = exDatas;
    },

    setInDatasWithCateDatas(state, inDatas) {
        state.inDatas = inDatas;
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

    setExDatasWithCateDatas({commit}, exDatas) {
        commit("setExDatasWithCateDatas", exDatas);
    },

    setInDatasWithCateDatas({commit}, inDatas) {
        commit("setInDatasWithCateDatas", inDatas);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}