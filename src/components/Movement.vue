<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Movimiento</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-radio-group
              v-model="selectedMovement.type"
              row
              label="Type of movement: "
              :rules="[required('Type')]"
            >
              <v-radio label="Income" value="income"></v-radio>
              <v-radio label="Expense" value="expense"></v-radio>
            </v-radio-group>

            <v-select
              v-model="selectedMovement.category"
              :items="filteredCategories"
              label="Choose category"
              :rules="[required('Category')]"
            ></v-select>

            <v-text-field
              v-model="selectedMovement.name"
              autocomplete="off"
              label="Name"
              counter="20"
              :rules="[
                required('Name'),
                minLength('Amount', 5),
                maxLength('Amount', 20)
              ]"
            ></v-text-field>

            <v-text-field
              v-model="selectedMovement.amount"
              autocomplete="off"
              label="Amount"
              counter="9"
              :rules="[
                required('Amount'),
                minLength('Amount', 2),
                maxLength('Amount', 9),
                checkType('Amount')
              ]"
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="reset">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="dispatchAction"
          :disabled="!valid"
          >{{ newMovement ? "SAVE" : "UPDATE" }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Movement",
  data() {
    return {
      valid: false,
      actionTag() {
        return {};
      },
      required(propertyType) {
        return value =>
          (value && value.length > 0) || `${propertyType} is required`;
      },
      minLength(propertyType, minLength) {
        return value =>
          value.length >= minLength ||
          `${propertyType} must be at least ${minLength} characters`;
      },
      maxLength(propertyType, maxLength) {
        return value =>
          value.length <= maxLength ||
          `${propertyType} must be less than ${maxLength} characters`;
      },
      checkType(propertyType) {
        return value => value > 0 || `${propertyType} must be an number`;
      },
      checkBudget() {
        return value =>
          (this.selectedMovement.type == "expense" &&
            value <= this.accounts[this.selectedMovement.index].amount) ||
          "Expense must be less than remaining budget";
      }
    };
  },
  props: {
    dialog: {
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
    accounts() {
      return this.getAccountList;
    },
    categoriesObject() {
      return this.getCategoryList;
    },
    filteredCategories() {
      let categoriesArray = [];
      if (this.selectedMovement.type === "income") {
        for (let i = 0; i < this.categoriesObject.length; i++) {
          if (this.categoriesObject[i].type === "income") {
            categoriesArray.push(this.categoriesObject[i].name);
          }
        }
      }
      if (this.selectedMovement.type === "expense") {
        for (let i = 0; i < this.categoriesObject.length; i++) {
          if (this.categoriesObject[i].type === "expense") {
            categoriesArray.push(this.categoriesObject[i].name);
          }
        }
      }
      return categoriesArray;
    }
  },
  methods: {
    dispatchAction() {
      if (this.newMovement) {
        this.generateNewId();
        this.$store.dispatch("addMovement", this.selectedMovement);
      } else {
        this.$store.dispatch("updateMovement", this.selectedMovement);
      }
      this.reset();
    },
    generateNewId() {
      const numberOfMovements = this.accounts[this.selectedMovement.index].info
        .length;
      const lastId = this.accounts[this.selectedMovement.index].info[
        numberOfMovements - 1
      ].id;
      const newId = parseInt(lastId.split("-")[1]) + 1;
      this.selectedMovement.id = `${this.selectedMovement.index}-${newId}`;
    },
    reset() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$emit("close");
    }
  }
};
</script>
