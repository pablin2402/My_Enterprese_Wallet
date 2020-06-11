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
              :to="{ name: 'CustomAccount', params: { id: account } }"
            >
              <v-card-title>
                <div class="subheading">{{ account.accountname }}</div>
              </v-card-title>
            </router-link>
            <router-link
              :to="{ name: 'CustomAccount', params: { id: account } }"
            >
              <v-card-text>
                <div class="grey--text">{{ account.quantity }} Bs.</div>
              </v-card-text>
            </router-link>

            <v-card-actions>
              <v-btn
                color="red"
                text
                @click="(dialogDelete = false), (dialogDelete = true)"
                >Delete</v-btn
              >
              <v-btn text @click="dialogUpdate = false">Update</v-btn>
            </v-card-actions>
          </v-card>
          <v-dialog v-model="dialogDelete" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Are you sure</span>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="(dialogDelete = false), deleAccount(account)"
                >Yes</v-btn
              >
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
//import Account from "./Account";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    //Account
  },
  data() {
    return {
      dialogCreate: false,
      dialogDelete: false,
      dialogUpdate: false
    };
  },
  computed: {
    ...mapGetters(["getAccounts"]),
    accounts() {
      return this.getAccounts;
    }
  },
  methods: {
    ...mapActions(["createAccount"]),
    ...mapActions(["updateAccount"]),
    ...mapActions(["deleteAccount"]),
    deleAccount(account) {
      this.deleteAccount(account);
    }
  }
};
</script>
