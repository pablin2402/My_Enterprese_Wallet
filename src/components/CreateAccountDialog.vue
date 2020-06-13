<template>
  <v-dialog v-model="show" persistent max-width="300px">
    <v-card>
      <v-card-title>
        <span class="headline">Create account</span>
      </v-card-title>
      <v-col cols="12">
        <v-text-field v-model="code" label="Code" required></v-text-field>
        <v-text-field v-model="name" label="Name" required></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click.stop="show = false"
        >Cancel</v-btn
      >
      <v-btn
        color="blue darken-1"
        text
        @click.stop="creaaccount(), (show = false)"
        >Create</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "createAccount",
  props: {
    value: Boolean
  },
  data() {
    return {
      code: "",
      name: "",
      quantity: ""
    };
  },
  methods: {
    creaaccount() {
      this.$emit("creaaccount", {
        code: this.code,
        accountname: this.name,
        quantity: "0",
        info: []
      });
      this.code = "";
      this.name = "";
      this.quantity = "";
    },
    closeDialog() {
      this.$emit("close-create");
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
