<template>
  <div class="customAccount">
    <v-container class="my-10" grid-list-md>
      <h1>Custom Account</h1>
      <br />
      <v-layout row justify-space-around>
        <v-flex md1 class="pt-6">
          <v-btn small depressed color="#F2F2F2" width="100px">
            <v-icon left small>mdi-plus-circle-outline</v-icon>
            <span class="caption text-lowercase">New</span>
          </v-btn>
        </v-flex>
        <v-flex md1 class="pt-6">
          <v-btn small depressed color="#F2F2F2" width="100px">
            <v-icon left small>mdi-bank-transfer</v-icon>
            <span class="caption text-lowercase">Transfer</span>
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
          <v-select :items="categories" label="Filter by category"> </v-select>
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
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CustomAccount",
  components: {},
  data() {
    return {
      info: [
        { name: "Books", category: "transfer", amount: "234", type: "income" },
        { name: "Class", category: "other", amount: "321", type: "expense" },
        { name: "Desk", category: "transfer", amount: "123", type: "income" },
        { name: "Chair", category: "other", amount: "456", type: "expense" }
      ],
      categories: ["Transfer", "Other"],
      selectedDate: null
    };
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
