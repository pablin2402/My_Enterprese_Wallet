<template>
  <v-dialog v-model="show" persistent max-width="300px">
    <v-card>
      <v-card-title>
        <span class="headline">Update account</span>
      </v-card-title>
      <v-col cols="12">
        <v-text-field v-model="name" label="New name" required></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click.stop="show = false"
        >Cancel</v-btn
      >
      <v-btn
        color="blue darken-1"
        text
        @click.stop="updaaccount(), (show = false)"
        >Change</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "updateAccount",
  props: {
    value: Boolean
  },
  data() {
    return {
      code: "",
      name: ""
    };
  },
  methods: {
    updaaccount() {
      this.$emit("updaaccount", { code: this.code, name: this.name });
      this.code = "";
      this.name = "";
    },
    closeDialog() {
      this.$emit("close-update");
    },
    setCode(code) {
      this.code = code;
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
