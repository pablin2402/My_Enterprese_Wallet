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
                  :rules="nameRules"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h3>Cuenta Abonado</h3>
                <v-divider></v-divider>
                <br />

                <v-select
                  id="cuenta"
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
                  autocomplete="off"
                  label="Amount"
                  counter="5"
                  :rules="amountRules"
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

      amountRules: [
        v => !!v || "Amount is required",
        v => (v && v.length < 5) || "Amount must be less than 10000$"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 20) || "Name must be less than 20 characters",
        v => (v && v.length >= 5) || "Name must have at least 5 characters"
      ]
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
            this.selectedMovement.index +
            " and change it to the saving bank " +
            this.selectedMovement.toaccount
        );
        if (confirmation) {
          this.addTransfer();
          this.uploadAmount();
          return true;
        } else {
          return false;
        }
      }
    },

    uploadAmount() {
      this.$store.dispatch("updateTransfer", {
        name: document.getElementById(this.selectedMovement.amount).value,
        totalAmount: this.getAmount("Clients")
      });
    },
    name() {
      const name = `${this.cuenta}`;
      return name;
    },
    addTransfer() {
      //this.getAmmount("Saving");

      this.generateNewId();
      this.getCurrentDate();
      this.getOutcome();
      this.getTransfer();
      this.getIncome();
      this.$store.dispatch("addMovement", this.selectedMovement);
      this.reset();
    },
    generateNewId() {
      let id = +new Date() + "-" + Math.floor(Math.random() * 1000);
      this.selectedMovement.id = "TRANSFER " + "-" + id;
    },
    getOutcome() {
      const outcome = "expense";
      this.selectedMovement.type = `${outcome}`;
    },
    getTransfer() {
      const transfer = "transfer";
      this.selectedMovement.category = `${transfer}`;
    },
    getIncome() {
      const income = "income";
      this.selectedMovement.income_to = `${income}`;
    },
    getAmount(name) {
      const ammount = this.accountsObject.findIndex(
        trans => trans.name === name
      );
      // console.log(this.accountsObject[ammount].totalAmount);
      return this.accountsObject[ammount].totalAmount;
    },

    getCurrentDate() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      this.selectedMovement.date = `${yyyy}-${mm}-${dd}`;
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
          //Other Account
          toaccount: "",
          income_to: "",
          index_to: ""
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
