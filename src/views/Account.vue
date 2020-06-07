<template>
  <div class="home">
    <v-container class="my-10" grid-list-md>
      <v-row>
        <v-col>
          <v-btn @click="dialog = true">Crear Movimiento</v-btn>
        </v-col>
      </v-row>
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
                    :items="categories"
                    label="Choose category"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Amount" required></v-text-field>
                </v-col>
                <div v-if="category == 'Transfer'">
                  <v-col cols="12">
                    <v-select
                      v-model="destination"
                      :items="accounts.map((account) => account.accountname)"
                      label="Choose an Account"
                    ></v-select>
                  </v-col>
                </div>
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
export default {
  name: "Home",
  components: {},
  data() {
    return {
      accounts: [
        { accountname: "Ahorros", quantity: "300" },
        { accountname: "Universidad", quantity: "4300" },
        { accountname: "Alquiler", quantity: "3300" },
        { accountname: "Comida", quantity: "900" }
      ],
      dialog: false,
      categories: ["Transfer", "Other"],
      category: "",
      movementType: ""
    };
  }
};
</script>
