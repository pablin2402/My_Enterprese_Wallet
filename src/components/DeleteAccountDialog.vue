<template>
  <v-dialog v-model="show" persistent max-width="560px">
    <v-card>
      <v-card-title>
        <span class="headline">Are you sure you want to delete this account?</span>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click.stop="show = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click.stop="deleaccount(), (show = false)">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "deleteAccount",
  props: {
    value: Boolean
  },
  data() {
    return {
      code: ""
    };
  },
  methods: {
    deleaccount() {
      this.$emit("deleaccount", this.code);
      this.code = "";
    },
    closeDialog() {
      this.$emit("close-delete");
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
