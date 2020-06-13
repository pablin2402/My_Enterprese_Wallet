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
          @click.stop="dialogCreate = true"
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
              :to="{
                name: 'CustomAccount',
                params: { id: account.name }
              }"
            >
              <v-card-title>
                <div class="subheading">{{ account.code }}</div>
              </v-card-title>
              <v-card-title>
                <div class="subheading">{{ account.name }}</div>
              </v-card-title>
            </router-link>
            <router-link
              :to="{
                name: 'CustomAccount',
                params: { id: account.name }
              }"
            >
              <v-card-text>
                <div class="grey--text">{{ account.totalAmount }} Bs.</div>
              </v-card-text>
            </router-link>
            <v-card-actions>
              <v-btn
                color="red"
                text
                @click.stop="
                  openDeleteDialog(account);
                  dialogDelete = true;
                "
                >Delete</v-btn
              >
              <v-btn
                text
                @click="
                  openUpdateDialog(account);
                  dialogUpdate = true;
                "
                >Update</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <deleteAccountDialog
      ref="deleteDialog"
      v-model="dialogDelete"
      @deleaccount="deleaccount"
    />
    <updateAccountDialog
      ref="updateDialog"
      v-model="dialogUpdate"
      @updaaccount="updaaccount"
    />
    <createAccountDialog
      ref="createDialog"
      v-model="dialogCreate"
      @creaaccount="creaaccount"
    />
  </div>
</template>

<script>
//import Account from "./Account";
import { mapActions, mapGetters } from "vuex";
import deleteAccountDialog from "../components/DeleteAccountDialog.vue";
import updateAccountDialog from "../components/UpdateAccountDialog.vue";
import createAccountDialog from "../components/CreateAccountDialog.vue";

export default {
  name: "Home",
  components: {
    deleteAccountDialog,
    updateAccountDialog,
    createAccountDialog
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
    deleaccount(code) {
      this.deleteAccount(code);
    },
    updaaccount(codeName) {
      this.updateAccount(codeName);
    },
    creaaccount(newAccount) {
      this.createAccount(newAccount);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeUpdate() {
      this.dialogUpdate = false;
    },
    closeCreate() {
      this.dialogUpdate = false;
    },
    openDeleteDialog(account) {
      this.$refs.deleteDialog.setCode(account.code);
    },
    openUpdateDialog(account) {
      this.$refs.updateDialog.setCode(account.code);
    }
  }
};
</script>
