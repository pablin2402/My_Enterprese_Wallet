<template>
  <div class="home">
    <v-container class="my-10" grid-list-md>
      <h1>My Enterprise Wallet</h1>
      <br />
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="(account, index) in accounts"
          :key="index"
        >
          <v-card class="mx-auto" max-width="330">
            <router-link
              :to="{
                name: 'CustomAccount',
                params: { id: account.accountname }
              }"
            >
              <v-card-title>
                <div class="subheading">{{ account.accountname }}</div>
              </v-card-title>
            </router-link>
            <router-link
              :to="{
                name: 'CustomAccount',
                params: { id: account.accountname }
              }"
            >
              <v-card-text>
                <div class="grey--text">{{ account.quantity }} Bs.</div>
              </v-card-text>
            </router-link>

            <v-card-actions>
              <v-btn color="red" text>Eliminar</v-btn>
              <v-btn text>Actualizar</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
//import Account from "./Account";
export default {
  name: "Home",
  components: {
    //Account
  },
  data() {
    return {
      accounts: [
        { accountname: "Ahorros", quantity: "300" },
        { accountname: "Universidad", quantity: "4300" },
        { accountname: "Alquiler", quantity: "3300" },
        { accountname: "Comida", quantity: "900" }
      ]
    };
  }
};
</script>
