import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [
      {
        code: "account-1",
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
        code: "account-2",
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
        code: "account-3",
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
      var aux = state.accounts[state.accounts.length - 1].code.split("-");
      var aux2 = Number(aux[1]) + 1;
      account.code = "account-" + aux2;
      state.accounts.push(account);
    },
    mutateUpdateAccount(state, codeName) {
      const foudAccountIndex = state.accounts.findIndex(
        account => account.code === codeName.code
      );
      state.accounts[foudAccountIndex].accountname = codeName.name;
    },
    mutateDeleteAccount(state, code) {
      const foudAccountIndex = state.accounts.findIndex(
        account => account.code === code
      );
      if (state.accounts[foudAccountIndex].info.length === 0) {
        state.accounts = state.accounts.filter(
          account1 => account1.code !== code
        );
      } else {
        alert("Can't delete this account");
      }
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
