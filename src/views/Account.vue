<template>
  <div class="home">
    <v-container class="my-10" grid-list-md>
      <h1>Account</h1>
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
      ]
    };
  }
};
</script>
