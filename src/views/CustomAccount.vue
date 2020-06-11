<template>
  <div class="customAccount">
    <v-container class="my-10" grid-list-md>
      <h1>Custom Account</h1>
      <br />
      <v-layout row justify-space-around>
        <v-flex md1 class="pt-6">
          <v-btn
            small
            depressed
            color="#F2F2F2"
            width="100px"
            @click="dialog = true"
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
            @click.stop="dialog2 = true"
          >
            <v-icon left small>mdi-bank-transfer</v-icon>
            <span class="caption text-lowercase">Transfer</span>
            <Transfer
              :visible="dialog2"
              :account="accountname"
              :amounts="quantity"
              @close="dialog2 = false"
            ></Transfer>
          </v-btn>
        </v-flex>
        <v-flex md1 class="pt-6">
          <router-link to="/categories">
            <v-btn small depressed color="#F2F2F2" width="100px">
              <v-icon left small>mdi-clipboard-list-outline</v-icon>
              <span class="caption text-lowercase">Categories</span>
            </v-btn>
          </router-link>
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
      <v-card color="#F2F2F2" flat v-for="data in info" :key="data.name">
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
            <div>{{ data.amount }}</div>
          </v-flex>
          <v-flex md2>
            <v-btn small>
              <v-icon>mdi-trash-can-outline</v-icon>
              <span>Delete</span>
            </v-btn>
          </v-flex>
          <v-flex md2>
            <v-btn small>
              <v-icon>mdi-pencil-outline</v-icon>
              <span>Update</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <v-divider></v-divider>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Movimiento</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-radio-group v-model="movementType" row>
                    <v-radio label="Income" value="income"></v-radio>
                    <v-radio label="Expense" value="expense"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="category"
                    :items="filteredCategories"
                    label="Choose category"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Amount" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Transfer from "../components/Transfer";

export default {
  name: "CustomAccount",
  components: {
    Transfer
  },
  data() {
    return {
      info: [
        { name: "Books", category: "transfer", amount: "234", type: "income" },
        { name: "Class", category: "other", amount: "321", type: "expense" },
        { name: "Desk", category: "transfer", amount: "123", type: "income" },
        { name: "Chair", category: "other", amount: "456", type: "expense" }
      ],
      selectedDate: null,
      dialog: false,
      dialog2: false,
      category: "",
      movementType: "",
      accountname: this.$route.params.id.accountname,
      quantity: this.$route.params.id.quantity
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
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
    filteredCategories() {
      let categoriesArray = [];
      if (this.movementType === "income") {
        for (let i = 0; i < Object.keys(this.categoriesObject).length; i++) {
          if (this.categoriesObject[i].type === "income") {
            categoriesArray.push([this.categoriesObject[i].name]);
          }
        }
      }
      if (this.movementType === "expense") {
        for (let i = 0; i < Object.keys(this.categoriesObject).length; i++) {
          if (this.categoriesObject[i].type === "expense") {
            categoriesArray.push([this.categoriesObject[i].name]);
          }
        }
      }
      return categoriesArray;
    }
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
