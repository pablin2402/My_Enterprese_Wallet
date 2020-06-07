<template>
  <div class="account">
    <v-container class="my-10">
      <h1>ACCOUNT</h1>
      <h2>{{ accountname }}</h2>
      <h3>{{ quantity }}</h3>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Account",
  components: {},
  data() {
    return {
      accountname: this.$route.params.id.accountname,
      quantity: this.$route.params.id.quantity
    };
  }
};
</script>
