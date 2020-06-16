<template>
  <div class="account">
    <v-container class="my-10">
      <h1>ACCOUNT</h1>
      <h2>{{ this.accounts[0].info[0].name }}</h2>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Account",
  components: {},
  data() {
    return {
      accountIndex: "",
      ac: " "
    };
  },
  computed: {
    ...mapGetters(["getAccountList"]),
    accounts() {
      console.log(this.getAccountList[0].info[0].name);
      return this.getAccountList;
    }
  }
};
</script>
