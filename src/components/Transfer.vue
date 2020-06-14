<template>
  <v-dialog v-model="dialog2" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Transfer</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <h3>Cuenta de Débito</h3>
                <v-divider></v-divider>
                <!--cuenta dueño-->
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedMovement.name"
                  autocomplete="off"
                  label="Name of the transfer"
                  counter="20"
                  :rules="rules.nameRules"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h3>Cuenta Abonado</h3>
                <v-divider></v-divider>
                <br />

                <v-select
                  v-model="selectedMovement.toaccount"
                  :items="getAccounts"
                  :rules="[v => !!v || 'Account is required']"
                  label="Account"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model.number="selectedMovement.amount"
                  label="Amount"
                  prefix="$"
                  counter="5"
                  :rules="[
                    minLength('Amount', 2),
                    maxLength('Amount', 5),
                    checkBudget()
                  ]"
                  min="1"
                  max="100"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="warning" text @click="reset">Cancel</v-btn>

        <v-btn :disabled="!valid" color="sucess" text @click="submitTransfer">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Transfer",
  components: {},
  data() {
    return {
      valid: true,
      initialMovementAmount: 0,

      minLength(propertyType, minLength) {
        return value =>
          (value + "").length >= minLength ||
          `${propertyType} must be at least ${minLength} characters`;
      },
      maxLength(propertyType, maxLength) {
        return value =>
          (value + "").length <= maxLength ||
          `${propertyType} must be less than ${maxLength} characters`;
      },
      checkBudget() {
        var budget = this.accountsObject[this.selectedMovement.index]
          .totalAmount;
        console.log(budget + this.initialMovementAmount);
        return value =>
          value <= budget + this.initialMovementAmount ||
          `Expense must be less than the remaining budget: ${budget +
            this.initialMovementAmount}`;
      },
      rules: {
        nameRules: [
          v => !!v || "Name is required",
          v => (v && v.length <= 20) || "Name must be less than 20 characters",
          v => (v && v.length >= 5) || "Name must have at least 5 characters"
        ]
      }
    };
  },
  methods: {
    //addStudent
    submitTransfer() {
      if (this.$refs.form.validate()) {
        let confirmation = confirm(
          "Are you sure you want to debit the amount of " +
            this.selectedMovement.amount +
            " from your savings bank " +
            this.accountsObject[this.selectedMovement.index].name +
            " and change it to the saving bank " +
            this.selectedMovement.toaccount
        );
        if (confirmation) {
          this.addTransfer();
          //this.addTransferToOtherAccount();
          this.uploadMyAmount();

          this.uploadAmount();
          return true;
        } else {
          return false;
        }
      }
    },
    uploadMyAmount() {
      let totalbadge = 0;
      totalbadge = this.getAmount(this.selectedMovement.toaccount);

      this.$store.dispatch("updateTransfer", {
        amount: this.selectedMovement.amount + totalbadge,
        name: this.selectedMovement.toaccount
      });
      //  this.reset();
    },
    uploadAmount() {
      let total = 0;
      total =
        this.getAmount(this.accountsObject[this.selectedMovement.index].name) -
        this.selectedMovement.amount;
      this.$store.dispatch("updateTransfer", {
        amount: total,
        name: this.accountsObject[this.selectedMovement.index].name
      });
    },
    getAmount(no) {
      let nt = this.accountsObject.findIndex(trans => trans.name === no);
      console.log(this.accountsObject[nt].totalAmount);
      return this.accountsObject[nt].totalAmount;
    },
    getAmount2(no) {
      let nt = this.accountsObject.findIndex(trans => trans.name === no);
      console.log(this.accountsObject[nt].totalAmount);
      return this.accountsObject[nt].totalAmount;
    },
    addTransferToOtherAccount() {
      this.generateTypeIncome(),
        this.generateNewId(),
        this.getCurrentDate(),
        this.generateCategory(),
        this.codeTransfer(),
        this.$store.dispatch(
          "addMovementToOtherAccount",
          this.selectedMovement
        );
    },
    addTransfer() {
      this.generateType(),
        this.generateNewId(),
        this.getCurrentDate(),
        this.generateCategory(),
        this.$store.dispatch("addMovement", this.selectedMovement);
    },
    generateType() {
      const type = "expense";
      return (this.selectedMovement.type = `${type}`);
    },
    codeTransfer() {
      const id_To = this.getIdAmountToCreate(this.selectedMovement.toaccount);
      return this.selectedMovement.code == `${id_To}`;
    },
    generateTypeIncome() {
      const type = "income";
      return (this.selectedMovement.type = `${type}`);
    },
    generateCategory() {
      const type = "transfer";
      return (this.selectedMovement.category = `${type}`);
    },
    generateNewId() {
      let id = +new Date() + "-" + Math.floor(Math.random() * 1000);
      return (this.selectedMovement.id = "TRANSFER " + "-" + `${id}`);
    },

    getIdAmountToCreate(no) {
      const nt = this.accountsObject.findIndex(trans => trans.name === no);
      console.log(this.accountsObject[nt].code);
      return this.accountsObject[nt].code;
    },
    getBudget() {
      const budget = this.accountsObject[this.selectedMovement.index]
        .totalAmount;
      console.log(budget);
      return budget;
    },
    getCurrentDate() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      return (this.selectedMovement.date = `${yyyy}-${mm}-${dd}`);
    },
    infoAccountMovement() {
      const nameAccount = this.accounts[this.getIdAmountToCreate()].info;
      return nameAccount;
    },
    reset() {
      this.$refs.form.reset();
      this.$emit("close");
    }
  },
  props: {
    dialog2: {
      type: Boolean,
      default: false
    },
    account: {
      type: Number,
      default: -1
    },
    selectedMovement: {
      type: Object,
      default: function() {
        return {
          id: "",
          name: "",
          category: "",
          amount: "",
          type: "",
          date: "",
          index: "",
          code: "",
          //Other Account
          toaccount: ""
          // income_to: "",
          // index_to: ""
        };
      }
    },
    newMovement: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["getAccountList", "getCategoryList"]),

    accountsObject() {
      return this.getAccountList;
    },
    categoryObject() {
      return this.getCategoryList;
    },
    getAccounts() {
      let accountsArray = [];
      for (let i = 0; i < this.accountsObject.length; i++) {
        accountsArray.push(this.accountsObject[i].name);
      }
      return accountsArray;
    },

    getCategories() {
      let categoriesArray = [];
      for (let i = 0; i < this.categoryObject.length; i++) {
        if (this.categoryObject[i].name === "transfer") {
          categoriesArray.push(this.categoryObject[i].name);
        }
      }
      return categoriesArray;
    }
  }
};
</script>
<style scoped>
h3 {
  color: green;
}
</style>
