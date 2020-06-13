<template>
  <v-dialog v-model="show" persistent max-width="300px">
    <v-card>
      <v-card-title>
        <span class="headline">Create account</span>
      </v-card-title>
      <v-col cols="12">
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
      name: ""
    };
  },
  methods: {
    creaaccount() {
      this.$emit("creaaccount", {
        code: "",
        name: this.name,
        totalAmount: 0,
        info: []
      });
      this.code = "";
      this.name = "";
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
