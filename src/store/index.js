import { createStore } from "vuex";

export default new createStore({
    state: {
        token: sessionStorage.getItem("TOKEN"),
        user: JSON.parse(sessionStorage.getItem("USER")),
    },
    mutations: {
        // set
        SET_TOKENN: (state, token) => {
            state.token = token;
            sessionStorage.setItem("TOKEN", token);
        },
        SET_USER: (state, user) => {
            state.user = user;
            sessionStorage.setItem("TOKEN", JSON.stringify(user));
        },
        LOGOUT: (state) => {
            state.token = '';
            state.user = {};
            sessionStorage.setItem("TOKEN", '');
            sessionStorage.setItem("USER", JSON.stringify(''));
        }
    },
    getters: {

    },
    actions: {},
    modules: {}
})