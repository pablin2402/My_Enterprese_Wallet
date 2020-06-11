import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [
      {
        code: "",
        accountname: "Saving",
        quantity: "300",
        info: [
          {
            code: "",
            name: "Books",
            category: "transfer",
            amount: "234",
            type: "income"
          },
          {
            code: "",
            name: "Books",
            category: "transfer",
            amount: "234",
            type: "expense"
          }
        ]
      },
      {
        code: "",
        accountname: "Clients",
        quantity: "300",
        info: [
          {
            code: "",
            name: "Books",
            category: "transfer",
            amount: "234",
            type: "income"
          },
          {
            code: "",
            name: "Books",
            category: "transfer",
            amount: "234",
            type: "expense"
          }
        ]
      },
      {
        code: "",
        accountname: "Enterprise",
        quantity: "300",
        info: [
          {
            code: "",
            name: "Books",
            category: "transfer",
            amount: "234",
            type: "income"
          },
          {
            code: "",
            name: "Books",
            category: "transfer",
            amount: "234",
            type: "expense"
          }
        ]
      }
    ],
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
    },
    addTransfer({ commit }, transfer) {
      //student.accountName = student.accountName + "-inserted";
      commit("mutateTransfertList", transfer);
    },
    updateTransfer({ commit }, updated) {
      //student.accountName = student.accountName + "-inserted";
      commit("mutateUpdate", updated);
    },
    createAccount({ commit }, accountCreated) {
      commit("muteateCreateAccount", accountCreated);
    },
    updateAccount({ commit }, accountUpdated) {
      commit("muteateUpdateAccount", accountUpdated);
    },
    deleteAccount({ commit }, accountDeleted) {
      commit("muteateDeleteteAccount", accountDeleted);
    }
  },
  mutations: {
    mutateTransfertList(state, transfer) {
      state.accounts.info.push(transfer);
    },
    mutateUpdate(state, upTransfer) {
      let upload;
      state.accounts.info.find(
        trans => trans.accountname === upTransfer.accountname
      );
      upload = state.accounts.info.indexOf(this.trans);
      if (this.trans !== null) {
        state.accounts.info.splice(upload, 1, upTransfer);
      }
    },
    mutateCategoryList(state, category) {
      state.categories.push(category);
    },
    mutateCreateAccount(state, account) {
      state.accounts.push(account);
    },
    mutateUpdateAccount(state, account) {
      let upload;
      state.accounts.accountname.find(
        name => name.accountname === account.accountname
      );
      upload = state.accounts.info.indexOf(this.name);
      if (this.name !== null) {
        state.accounts.accountname.splice(upload, 1, account);
      }
    },
    mutateDeleteAccount(state, account) {
      state.accounts = state.accounts.filter(account1 => account1 !== account);
    }
  },
  getters: {
    getCategoryList(state) {
      return state.categories;
    },
    getTransferList(state) {
      return state.accounts;
    },
    ListDetails(state) {
      return state.accounts.info;
    },
    getAccounts(state) {
      return state.accounts;
    }
  },
  modules: {}
});
