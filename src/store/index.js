import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: {
      code: "",
      accountName: "Items",
      totalAmount: "",
      info: []
    }
  },
  actions: {
    addTransfer({ commit }, transfer) {
      //student.accountName = student.accountName + "-inserted";
      commit("mutateTransfertList", transfer);
    },
    updateTransfer({ commit }, updated) {
      //student.accountName = student.accountName + "-inserted";
      commit("mutateUpdate", updated);
    }
  },
  mutations: {
    mutateTransfertList(state, transfer) {
      state.accounts.info.push(transfer);
    },
    mutateUpdate(state, upTransfer) {
      let upload;
      state.accounts.info.find(trans => trans.accountname === upTransfer.accountname);
      upload = state.accounts.info.indexOf(this.trans);
      if (this.trans !== null) {
        state.accounts.info.splice(upload, 1, upTransfer);
      }
    },
  },
  getters: {
    getTransferList(state) {
      return state.accounts;
    },
    ListDetails(state) {
      return state.accounts.info;
    }
  },
  modules: {}
});
