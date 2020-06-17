<template>
  <div class="customAccount">
    <v-container class="my-10" grid-list-md>
      <h1>Custom Account: {{ accountName }}</h1>
      <h2>Saldo {{ budget }} Bs.</h2>
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
          <v-select
            :items="categories"
            label="Filter by category"
            v-model="categorieSelect"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-card
        color="#F2F2F2"
        flat
        v-for="data in filterOfFilter"
        :key="/*data.id,*/ (data.categorieSelect, data.selectedDate)"
      >
        <div>
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
        </div>
      </v-card>
      <v-divider></v-divider>
      <Transfer
        :dialog2="dialog2"
        :selectedMovement="selectedMovement"
        :newMovement="newMovement"
        :account="accountIndex"
        @close="dialog2 = false"
        @addTransfer="addTransfer"
        @addTransferToAnotherAccount="addTransferToAnotherAccount"
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
      accountName: "",
      accountIndex: null,
      selectedMovement: {},
      newMovement: false,
      categorieSelect: "",
      infoArray: [],
      dateArray: []
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
    categoriesList() {
      const infoArray = [];
      let infoAccount = [];
      infoAccount = this.accounts[this.accountIndex].info;
      for (let i = 0; i < infoAccount.length; i++) {
        if (
          this.accounts[this.accountIndex].info[i].category ===
          this.categorieSelect[0]
        ) {
          infoArray[i] = this.accounts[this.accountIndex].info[i];
        }
      }
      return infoArray;
    },
    info() {
      //return this.accounts[this.accountIndex].info;
      if (this.$route.params.id) {
        const accountName = this.$route.params.id;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.accountIndex = this.accounts.findIndex(
          account => account.name === accountName
        );
        if (this.accountIndex !== -1) {
          console.log(
            `ACCOUNT-> Index found ${this.accountIndex} for ${accountName} this.accountIndex: ${this.accountIndex}`
          );
          return this.accounts[this.accountIndex].info;
        } else {
          console.log(
            `ACCOUNT-> Index not found for ${accountName} this.accountIndex: ${this.accountIndex}`
          );
          return [];
        }
      } else {
        return [];
      }
    },
    budget() {
      let currentBudget = 0;
      if (this.dialog) {
        console.log("ACCOUNT -> Updating budget");
      }
      if (this.info.length !== 0) {
        this.info.forEach(movement => {
          if (movement.type === "income") {
            currentBudget += parseInt(movement.amount);
          } else {
            currentBudget -= parseInt(movement.amount);
          }
        });
        console.log(
          `ACCOUNT-> CalculatedBudget: ${currentBudget} for ${this.accountIndex}`
        );
        this.$store.dispatch("updateAccountBudget", {
          amount: currentBudget,
          index: this.accountIndex
        });
      }

      return currentBudget;
    },
    filterList() {
      let filtered =
        this.categorieSelect[0] === undefined
          ? this.info
          : this.categoriesList.filter(item => {
              return item.category === this.categorieSelect[0];
            });
      /*filtered =
        this.selectedDate === null
          ? filtered
          : this.filtered.filter(item => item.date === this.selectedDate);
      console.log(this.selectedDate);*/
      return filtered;
    },
    filterOfFilter() {
      let filtered = this.filterList;
      filtered =
        this.selectedDate === null
          ? filtered
          : filtered.filter(item => {
              return item.date === this.selectedDate;
            });
      return filtered;
    }
  },
  methods: {
    redirectToCategories() {
      this.$router.push("/categories");
    },
    findAccountIndex() {
      console.log(`ACCOUNT-> FINDACCOUNTINDEX`);
      if (this.$route.params.id) {
        this.accountName = this.$route.params.id;
        this.accountIndex = this.accounts.findIndex(
          account => account.name === this.accountName
        );
        console.log(
          `ACCOUNT->FINDACCOUNTINDEX-> Found index ${this.accountIndex} for ${this.accountName}`
        );
      }
    },
    sendDataTransfer(selectedMovement, newMovement) {
      this.selectedMovement = {
        ...selectedMovement,
        index: this.accountIndex
      };
      this.dialog2 = true;
      this.newMovement = newMovement;
    },
    ...mapActions(["addMovement", "addTransferTo"]),

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
    addTransferToAnotherAccount(newAccount) {
      this.addTransferTo(newAccount, {
        id: newAccount.id,
        name: newAccount.name,
        category: newAccount.category,
        amount: newAccount.amount,
        type: newAccount.type,
        toaccount: newAccount.toaccount,
        date: newAccount.date,
        index: newAccount.index,
        code: this.code
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
      console.log(JSON.stringify(deletedMovement));
      if (
        deletedMovement.type === "income" &&
        this.budget - parseInt(deletedMovement.amount) < 0
      ) {
        alert("You cant delete this income, budget can't be lower tha 0");
      } else if (deletedMovement.category === "transfer") {
        alert("You cant delete a transfer type movement");
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
