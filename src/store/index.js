import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [
      {
        code: "a",
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
        code: "b",
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
        code: "c",
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
      commit("mutateCreateAccount", accountCreated);
    },
    updateAccount({ commit }, accountUpdated) {
      commit("mutateUpdateAccount", accountUpdated);
    },
    deleteAccount({ commit }, accountDeleted) {
      commit("mutateDeleteAccount", accountDeleted);
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
    mutateUpdateAccount(state, code, name) {
      let upload;
      state.accounts.find(account => account.code === code);
      upload = state.accounts.indexOf(this.account);
      if (this.account !== null) {
        this.account.accountname = name;
        state.accounts.splice(upload, 1, this.account);
      }
    },
    mutateDeleteAccount(state, code) {
      state.accounts = state.accounts.filter(
        account1 => account1.code !== code
      );
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
