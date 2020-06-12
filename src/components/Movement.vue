<template>
  <div>
    <v-btn small depressed color="#F2F2F2" width="100px" @click="dialog = true">
      <v-icon left small>mdi-plus-circle-outline</v-icon>
      <span class="caption text-lowercase">New</span>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Movimiento</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-radio-group
                v-model="type"
                row
                label="Type of movement: "
                :rules="[required('Type')]"
              >
                <v-radio label="Income" value="income"></v-radio>
                <v-radio label="Expense" value="expense"></v-radio>
              </v-radio-group>

              <v-select
                v-model="category"
                :items="filteredCategories"
                label="Choose category"
                :rules="[required('Category')]"
              ></v-select>

              <v-text-field
                v-model="name"
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
                v-model="amount"
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
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="createMovement()"
            :disabled="!valid"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Movement",
  data() {
    return {
      dialog: false,
      valid: false,
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
      type: "",
      category: "",
      name: "",
      amount: ""
    };
  },
  props: {
    accountIndex: {
      type: Number,
      default: -1
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
      if (this.type === "income") {
        for (let i = 0; i < Object.keys(this.categoriesObject).length; i++) {
          if (this.categoriesObject[i].type === "income") {
            categoriesArray.push([this.categoriesObject[i].name]);
          }
        }
      }
      if (this.type === "expense") {
        for (let i = 0; i < Object.keys(this.categoriesObject).length; i++) {
          if (this.categoriesObject[i].type === "expense") {
            categoriesArray.push([this.categoriesObject[i].name]);
          }
        }
      }
      return categoriesArray;
    }
  },
  methods: {
    ...mapActions(["addMovement", "updateMovement", "deleteMovement"]),
    createMovement() {
      this.addMovement({
        name: this.name,
        category: this.category[0],
        amount: this.amount,
        type: this.type,
        index: this.accountIndex
      });
      this.dialog = false;
      this.$refs.form.reset();
    },
    updateMovement() {
      // code
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
