import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [
      {
        code: "",
        name: "Ahorros",
        totalAmount: "",
        info: [
          {
            name: "Ahorro1",
            category: "transfer",
            amount: "234",
            type: "income"
          },
          {
            name: "Ahorro2",
            category: "other",
            amount: "321",
            type: "expense"
          },
          {
            name: "Ahorro3",
            category: "transfer",
            amount: "123",
            type: "income"
          },
          { name: "Ahorro4", category: "other", amount: "456", type: "expense" }
        ]
      },
      {
        code: "",
        name: "Universidad",
        totalAmount: "",
        info: [
          {
            name: "Books",
            category: "transfer",
            amount: "234",
            type: "income"
          },
          { name: "Class", category: "other", amount: "321", type: "expense" },
          { name: "Desk", category: "transfer", amount: "123", type: "income" },
          { name: "Chair", category: "other", amount: "456", type: "expense" }
        ]
      },
      {
        code: "",
        name: "Alquiler",
        totalAmount: "",
        info: []
      },
      {
        code: "",
        name: "Comida",
        totalAmount: "",
        info: []
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
    addMovement({ commit }, newMovemment) {
      commit("addMovement", newMovemment);
    },
    updateMovement({ commit }, updatedMovemment) {
      commit("updateMovement", updatedMovemment);
    },
    deleteMovement({ commit }, deletedMovemment) {
      commit("deleteMovement", deletedMovemment);
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
    addMovement(state, newMovement) {
      state.accounts[newMovement.index].info.push({
        name: newMovement.name,
        category: newMovement.category,
        amount: newMovement.amount,
        type: newMovement.amount
      });
    }
    /*updateMovement(state, updatedMovement) {
      state.accounts[updatedMovement.index].info.push({
        name: updatedMovement.name,
        category: updatedMovement.category,
        amount: updatedMovement.amount,
        type: updatedMovement.amount
      });
    },
    deleteMovement(state, deeltedMovement) {
      state.accounts[deeltedMovement.index].info.push({
        name: deeltedMovement.name,
        category: deeltedMovement.category,
        amount: deeltedMovement.amount,
        type: deeltedMovement.amount
      });
    }*/
  },

  getters: {
    getCategoryList(state) {
      return state.categories;
    },
    getAccountList(state) {
      return state.accounts;
    },
    ListDetails(state) {
      return state.accounts.info;
    }
  },

  modules: {}
});
