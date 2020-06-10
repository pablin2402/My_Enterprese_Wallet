import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      { code: "cat-1", type: "income", name: "transfer" },
      { code: "cat-2", type: "income", name: "other" },
      { code: "cat-3", type: "expense", name: "transfer" },
      { code: "cat-4", type: "expense", name: "other" }
    ]
  },
  actions: {
    addCategory({ commit }, category) {
      commit("mutateCategoryList", category);
    }
  },
  mutations: {
    mutateCategoryList(state, category) {
      state.categories.push(category);
    }
  },
  getters: {
    getCategoryList(state) {
      return state.categories;
    }
  },
  modules: {}
});
