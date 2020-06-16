<template>
  <div class="customAccount">
    <v-container class="my-10" grid-list-md>
      <h1>Custom Account: {{ accounts[accountIndex].name }}</h1>
      <h2>Saldo {{ accounts[accountIndex].totalAmount }} Bs.</h2>
      <br />
      <v-layout row justify-space-around>
        <v-flex md1 class="pt-6">
          <v-btn
            small
            depressed
            color="#F2F2F2"
            width="100px"
            @click="sendData(selectedMovement, true)"
          >
            <v-icon left small>mdi-plus-circle-outline</v-icon>
            <span class="caption text-lowercase">New</span>
          </v-btn>
        </v-flex>
        <v-flex md1 class="pt-6">
          <v-btn
            small
            depressed
            color="#F2F2F2"
            width="100px"
            @click="sendDataTransfer(selectedMovement, true)"
          >
            <v-icon left small>mdi-bank-transfer</v-icon>
            <span class="caption text-lowercase">Transfer</span>
          </v-btn>
        </v-flex>
        <v-flex md1 class="pt-6">
          <v-btn
            small
            depressed
            color="#F2F2F2"
            width="100px"
            @click="redirectToCategories()"
          >
            <v-icon left small>mdi-clipboard-list-outline</v-icon>
            <span class="caption text-lowercase">Categories</span>
          </v-btn>
        </v-flex>
        <v-flex md3>
          <v-menu ref="menu1" :close-on-content-click="true">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="selectedDate"
                label="Filter by Date"
                prepend-icon="mdi-calendar-range"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              @input="menu1 = true"
              v-model="selectedDate"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md3>
          <v-select :items="categories" label="Filter by category"></v-select>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-card color="#F2F2F2" flat v-for="data in info" :key="data.id">
        <v-layout
          row
          wrap
          justify-space-around
          :class="`pa-3 data ${data.type}`"
        >
          <v-flex md3>
            <div class="caption grey--text">Name</div>
            <div>{{ data.name }}</div>
          </v-flex>
          <v-flex md3>
            <div class="caption grey--text">Category</div>
            <div>{{ data.category }}</div>
          </v-flex>
          <v-flex md2>
            <div class="caption grey--text">Amount</div>
            <div>{{ data.amount }} Bs.</div>
          </v-flex>
          <v-flex md2>
            <v-btn small :type="data.type" @click="deleteMovement(data)">
              <v-icon>mdi-trash-can-outline</v-icon>
              <span>Delete</span>
            </v-btn>
          </v-flex>
          <v-flex md2>
            <v-btn small @click="sendData(data, false)">
              <v-icon>mdi-pencil-outline</v-icon>
              <span>Update</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <v-divider></v-divider>
      <Transfer
        :dialog2="dialog2"
        :selectedMovement="selectedMovement"
        :newMovement="newMovement"
        :account="accountIndex"
        @close="dialog2 = false"
        @addTransfer="addTransfer"
      ></Transfer>

      <Movement
        :dialog="dialog"
        :selectedMovement="selectedMovement"
        :newMovement="newMovement"
        @close="dialog = false"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Transfer from "../components/Transfer";
import Movement from "../components/Movement";

export default {
  name: "CustomAccount",
  components: {
    Transfer,
    Movement
  },
  data() {
    return {
      selectedDate: null,
      dialog: false,
      dialog2: false,
      accountname: "",
      accountIndex: "",
      selectedMovement: {},
      newMovement: false
    };
  },
  computed: {
    ...mapGetters(["getAccountList", "getCategoryList"]),
    accounts() {
      return this.getAccountList;
    },
    categoriesObject() {
      return this.getCategoryList;
    },
    categories() {
      const categoriesArray = [];

      for (let i = 0; i < Object.keys(this.categoriesObject).length; i++) {
        if (
          categoriesArray.findIndex(
            category => category == this.categoriesObject[i].name
          ) === -1
        ) {
          categoriesArray.push([this.categoriesObject[i].name]);
        }
      }

      return categoriesArray;
    },
    info() {
      return this.accounts[this.accountIndex].info;
    },
    budget() {
      let currentBudget = 0;
      this.info.forEach(movement => {
        if (movement.type === "income") {
          currentBudget += parseInt(movement.amount);
        } else {
          currentBudget -= parseInt(movement.amount);
        }
      });
      this.$store.dispatch("updateAccountBudget", {
        amount: currentBudget,
        index: this.accountIndex
      });
      return currentBudget;
    }
  },
  methods: {
    redirectToCategories() {
      this.$router.push("/categories");
    },
    findAccountIndex() {
      this.accountname = this.$route.params.id;
      this.accountIndex = this.accounts.findIndex(
        account => account.name === this.accountname
      );
    },
    sendDataTransfer(selectedMovement, newMovement) {
      this.selectedMovement = {
        ...selectedMovement,
        index: this.accountIndex
      };
      this.dialog2 = true;
      this.newMovement = newMovement;
    },
    ...mapActions(["addMovement"]),

    addTransfer(newAccount) {
      this.addMovement(newAccount, {
        id: newAccount.id,
        name: newAccount.name,
        category: newAccount.category,
        amount: newAccount.amount,
        type: newAccount.type,
        toaccount: newAccount.toaccount,
        date: newAccount.date,
        index: newAccount.index
      });
    },
    sendData(selectedMovement, newMovement) {
      if (!newMovement && selectedMovement.category === "transfer") {
        alert("You cant update transfer type movements");
      } else {
        this.selectedMovement = {
          ...selectedMovement,
          index: this.accountIndex
        };
        this.dialog = true;
        this.newMovement = newMovement;
      }
    },
    deleteMovement(deletedMovement) {
      if (
        deletedMovement.type === "income" &&
        this.budget - parseInt(deletedMovement.amount) < 0
      ) {
        alert("You cant delete this income");
      } else {
        const response = confirm(
          `Are you sure you want to delete ${deletedMovement.name}`
        );
        if (response) {
          this.$store.dispatch("deleteMovement", {
            ...deletedMovement,
            index: this.accountIndex
          });
        }
      }
    },
    updateBudget() {
      let currentBudget = 0;
      this.info.forEach(movement => {
        if (movement.type === "income") {
          currentBudget += parseInt(movement.amount);
        } else {
          currentBudget -= parseInt(movement.amount);
        }
      });
      this.$store.dispatch("updateAccountBudget", {
        amount: currentBudget,
        index: this.accountIndex
      });
    }
  },
  created() {
    this.findAccountIndex();
  }
};
</script>
<style scoped>
.data.income {
  border-left: 4px solid green;
}
.data.expense {
  border-left: 4px solid red;
}
</style>
