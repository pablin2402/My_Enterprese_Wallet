<template>
  <div class="home">
    <v-container class="my-10" grid-list-md>
      <h1>My Enterprise Wallet</h1>
      <br />
      <v-flex md1 class="pt-6">
        <v-btn
          small
          depressed
          color="#F2F2F2"
          width="100px"
          @click="dialogCreate = true"
        >
          <v-icon left small>mdi-plus-circle-outline</v-icon>
          <span class="caption text-lowercase">New Account</span>
        </v-btn>
      </v-flex>
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
              <v-btn text @click="(dialogUpdate = false), (dialogUpdate = true)"
                >Update</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-dialog v-model="dialogDelete" persistent max-width="300px">
            <v-card>
              <v-card-title>
                <span class="headline">Are you sure</span>
              </v-card-title>
              <v-text-field
                v-model="code3"
                label="Code"
                required
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="(dialogDelete = false), deleAccount()"
                >Yes</v-btn
              >
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogUpdate" persistent max-width="300px">
            <v-card>
              <v-card-title>
                <span class="headline">Updating</span>
              </v-card-title>
              <v-col cols="12">
                <v-text-field
                  v-model="code2"
                  label=" Code"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newName"
                  label="New name"
                  required
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogUpdate = false"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="(dialogUpdate = false), updaAccount()"
                >Change</v-btn
              >
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-dialog v-model="dialogCreate" persistent max-width="300px">
        <v-card>
          <v-card-title>
            <span class="headline">New account</span>
          </v-card-title>
          <v-col cols="12">
            <v-text-field v-model="code" label="Code" required></v-text-field>
            <v-text-field v-model="name" label="Name" required></v-text-field>
            <v-text-field
              v-model="quantity"
              label="Quantity"
              required
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCreate = false"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="(dialogCreate = false), creaAccount()"
            >Create</v-btn
          >
        </v-card>
      </v-dialog>
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
      dialogUpdate: false,
      newName: "",
      code: "",
      name: "",
      quantity: "",
      code2: "",
      code3: ""
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
    deleAccount() {
      this.deleteAccount(this.code3);
      this.code3 = "";
    },
    updaAccount() {
      this.updateAccount({ code: this.code2, name: this.newName });
      this.code2 = "";
      this.newName = "";
    },
    creaAccount() {
      this.createAccount({
        code: this.code,
        accountname: this.name,
        quantity: this.quantity,
        info: []
      });
      this.code = "";
      this.name = "";
      this.quantity = "";
    }
  }
};
</script>
