import moment from "moment"

const state = {
    exDatas: [],
    inDatas: [],
    exCateDatas: [],
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
    },

    getExTotalPriceByCategory(state) {
        const totalExPriceByCategory = [];
        for(var exCate of state.exCateDatas) {
            const totalExPrice = 0;
            for(var ex of state.exDatas) {
                if(ex.ex_category_id === exCate.id){
                    totalExPrice += ex.expend_price;
                }else{
                    continue;
                }
            }
            totalExPriceByCategory.push(totalExPrice);
        }
        return totalExPriceByCategory;
    },

    getChartOptions(state) {
        const exCategoryName = [];
        const exBackgroundColor = [];
        const exBorderColor = [];
        for(var exCate of state.exCateDatas) {
            exCategoryName.push(exCate.ex_category_name);

            if(exCate.ex_category_color === 'red'){
                exBackgroundColor.push('rgba(255, 0, 0, 0.6)');
                exBorderColor.push('rgba(255, 0, 0, 1)');

            }else if(exCate.ex_category_color === 'pink'){
                exBackgroundColor.push('rgba(255, 192, 203, 0.6)');
                exBorderColor.push('rgba(255, 192, 203, 1)');

            }else if(exCate.ex_category_color === 'purple'){
                exBackgroundColor.push('rgba(128, 0, 128, 0.6)');
                exBorderColor.push('rgba(128, 0, 128, 1)');

            }else if(exCate.ex_category_color === 'deep-purple'){
                exBackgroundColor.push('rgba(148, 0, 211, 0.6)');
                exBorderColor.push('rgba(148, 0, 211, 1)');

            }else if(exCate.ex_category_color === 'indigo'){
                exBackgroundColor.push('rgba(65, 105, 225, 0.6)');
                exBorderColor.push('rgba(65, 105, 225, 1)');

            }else if(exCate.ex_category_color === 'blue'){
                exBackgroundColor.push('rgba(0, 0, 225, 0.6)');
                exBorderColor.push('rgba(0, 0, 225, 1)');

            }else if(exCate.ex_category_color === 'cyan'){
                exBackgroundColor.push('rgba(0, 255, 255, 0.6)');
                exBorderColor.push('rgba(0, 255, 211, 1)');

            }else if(exCate.ex_category_color === 'teal'){
                exBackgroundColor.push('rgba(0, 128, 128, 0.6)');
                exBorderColor.push('rgba(0, 128, 128, 1)');

            }else if(exCate.ex_category_color === 'green'){
                exBackgroundColor.push('rgba(0, 255, 0, 0.6)');
                exBorderColor.push('rgba(0, 255, 0, 1)');

            }else if(exCate.ex_category_color === 'amber'){
                exBackgroundColor.push('rgba(255, 193, 7, 0.6)');
                exBorderColor.push('rgba(255, 193, 7, 1)');

            }else if(exCate.ex_category_color === 'orange'){
                exBackgroundColor.push('rgba(255, 165, 0, 0.6)');
                exBorderColor.push('rgba(255, 165, 0, 1)');

            }else if(exCate.ex_category_color === 'brown'){
                exBackgroundColor.push('rgba(139, 69, 19, 0.6)');
                exBorderColor.push('rgba(139, 69, 19, 1)');
            }
        }

        const options = {
            labels: exCategoryName,
            title: {
                text: '支出割合',
                align: '',
            },
            colors: exBackgroundColor,
            stroke: {
                colors: exBorderColor
            }
        }
        return options;
    },
}

const mutations = {
    getExDatas(state, resData) {
        state.exDatas = resData;
    },

    getInDatas(state, resData) {
        state.inDatas = resData;
    },

    getExCateDatas(state, resData) {
        state.exCateDatas = resData;
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

    async getExCateDatas({commit}, userId) {
        await axios.get('/api/ex_categories/' + userId).then((res) => {
            commit("getExCateDatas", res.data);
        }).catch(error => console.log(error));
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