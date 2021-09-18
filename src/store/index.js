import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    messages: [],
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  },
  getters: {
    markedMessages: (state) => (mark) => {
      let markedMessage = state.messages.map((message) => {
        return {
          ...message,
          name: mark + message.name + mark,
        };
      });

      return markedMessage;
    },
  },
  actions: {
    async postMessage(ctx, payload) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(
          "http://message-vuex.herokuapp.com/api/messages",
          { ...payload },
          config
        );
        console.log(response.data);
      } catch (err) {
        console.err(err);
      }
    },
    async getAllMessages({ state, commit }) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        };

        const response = await axios.get(
          "http://message-vuex.herokuapp.com/api/messages",
          config
        );
        const message = response.data;
        commit("SET_MESSAGE", message);
      } catch (err) {
        console.err(err);
      }
    },
    async register({ commit }, payload) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(
          "http://message-vuex.herokuapp.com/api/users/register",
          { ...payload },
          config
        );
        const { token } = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        commit("SET_TOKEN", token);
        router.push("/messages");
      } catch (err) {
        console.log(err);
      }
    },
    async login({ commit }, payload) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
          "http://message-vuex.herokuapp.com/api/users/login",
          { ...payload },
          config
        );
        const { token } = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        commit("SET_TOKEN", token);

        router.push("/messages");
      } catch (error) {
        console.log("[ Login ]", error);
      }
    },
  },
  mutations: {
    SET_MESSAGE: (state, payload) => {
      state.messages = payload;
    },
    ADD_MESSAGE: (state, payload) => {
      state.messages.push(payload);
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
  },
});