import axios from "axios"
export default {
    namespaced: true,
    state: {
        datas: [],
        page: 0,
        pageSize: 5,
        cont: 0,
        filter: {
            strot: ""
        }
    },
    actions: {
        get_Commodity_Data({ commit, state }, pylod) {
            const page = pylod ? pylod.page : state.page;
            let api = `/api/manage/list?page=${page}&pageSize=${state.pageSize}`;
            for (let key in state.filter) {
                if (state.filter[key]) {
                    api += '&' + key + '=' + state.filter[key];
                };
            };
            fetch(api).then(res => {
                return res.json();
            }).then(data => {
                commit('addd_Commodity_list', data);
                commit('set_Pagination_Page', page);
            });
        },
        set_filters({ commit, dispatch }, plody) {
            console.log(plody)
            commit("setfilter", plody)
            dispatch("get_Commodity_Data", {
                page: 0
            })
        },
        get_Release({ dispatch }, newId) {
            return new Promise((resolve, reject) => {
                // axios.post("/api/manage/updata", { body: JSON.stringify(newId) }).then(s => {
                //         dispatch("get_Commodity_Data")
                //         resolve()
                //     })
                fetch('/api/manage/updata', {
                    method: 'post',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newId),
                }).then(res => {
                    return res.json();
                }).then(data => {
                    dispatch('get_Commodity_Data', {
                        page: 0
                    })
                    resolve()
                });
            })
        }

    },
    mutations: {
        addd_Commodity_list(state, paylode) {
            console.log(paylode)
            state.datas = paylode.data;
            state.cont = paylode.count
        },
        set_Pagination_Page(state, ploat) {
            state.page = ploat.page
        },
        setfilter(state, text) {
            console.log(text)
            state.filter = text
        }
    },
    modules: {}
}