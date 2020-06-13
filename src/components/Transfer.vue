<template>
  <v-dialog v-model="dialog2" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Transferencia</span>
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
                <v-select
                  v-model="selectedMovement.name"
                  :items="getAccounts"
                  :rules="[v => !!v || 'Account is required']"
                  label="Account"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedMovement.amount"
                  autocomplete="off"
                  label="Amount"
                  counter="5"
                  :rules="amountRules"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="selectedMovement.category"
                  :items="getCategories"
                  :rules="[v => !!v || 'Category is required']"
                  label="Category"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <h3>Cuenta Abonado</h3>
                <v-divider></v-divider>
                <br />

                <v-select
                  v-model="to_account"
                  :items="getAccounts"
                  :rules="[v => !!v || 'Account is required']"
                  label="Account"
                  required
                ></v-select>
                <v-text-field
                  v-model="to_account"
                  label="Destination"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="amount"
                  :counter="5"
                  :rules="amountRules"
                  label="Amount"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="warning" text @click="reset">Cancel</v-btn>
        <v-btn color="error" text @click="reset">Clear</v-btn>

        <v-btn :disabled="!valid" color="sucess" text @click="submitTransfer"
          >Save</v-btn
        >
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
      id: "",
      category: "",
      amount: "",
      type: "",
      name: "", //nameaccount
      date: "",
      to_account: "",
      type_account: "",

      amountRules: [
        v => !!v || "Amount is required",
        v => (v && v.length < 5) || "Amount must be less than 10000$"
        /* v =>
          (v && v <= this.amounts) ||
          " You cannot deposit more money than you have in your account"*/
      ]
    };
  },
  methods: {
    //addStudent
    submitTransfer() {
      if (this.$refs.form.validate()) {
        this.generateNewId();
        this.getCurrentDate();
        this.getOutcome();
        this.$store.dispatch("addMovement", this.selectedMovement);
      }
    },
    generateNewId() {
      let id = +new Date() + "-" + Math.floor(Math.random() * 1000);

      this.selectedMovement.id = "TRANSFER " + "-" + id;
    },
    getOutcome() {
      const outcome = "expense";

      this.selectedMovement.type = `${outcome}`;
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
          index: ""
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
