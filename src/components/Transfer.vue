<template>
  <v-dialog v-model="dialog2" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">Transferencia</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h3>Cuenta Debito</h3>
                <v-divider></v-divider>

                <v-text-field label="Cuenta de débito" v-model="nameAccount">{{
                  account
                }}</v-text-field>

                <p class="font-weight-bold">Monto Total: {{ amounts }}</p>

                <br />
                <div :key="index" v-for="(transfer, index) in details">
                  <ul>
                    <li>DESDE: {{ transfer.accountname }}</li>

                    <li>DESCRIPCION: {{ transfer.description }}</li>
                    <li>Monto:{{ transfer.amount }}</li>
                    <li>FECHA: {{ transfer.date }}</li>

                    <li>PARA: {{ transfer.to_account }}</li>
                  </ul>
                </div>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-bold">Categoria: Transfer</p>
              </v-col>
              <v-col cols="12">
                <h3>Cuenta Abonado</h3>
                <v-divider></v-divider>
                <br />

                <!--v-select
                  v-model="select"
                  :items="i"
                  :rules="[v => !!v || 'Account is required']"
                  label="Account"
                  required
                ></v-select-->
                <v-text-field
                  v-model="to_account"
                  label="Destination"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="description"
                  :counter="10"
                  :rules="descriptionRules"
                  label="Description"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="amount"
                  :counter="5"
                  :rules="amountRules"
                  label="Amount"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="warning" text @click="dialog2 = false">Cancel</v-btn>
          <v-btn color="error" text @click="reset">Clear</v-btn>

          <v-btn :disabled="!valid" color="sucess" @click="submitTransfer"
            >Save</v-btn
          >
          <v-btn color="sucess" @click="modifyTransfer">Actualizae</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "Transfer",
  components: {},
  data() {
    return {
      valid: true,
      amount: "",
      description: "",
      nameAccount: "",
      to_account: "",
      descriptionRules: [
        v => !!v || "Description is required",
        v =>
          (v && v.length <= 10) || "Description must be less than 10 characters"
      ],

      amountRules: [
        v => !!v || "Amount is required",
        v => (v && v.length < 5) || "Amount must be less than 10000$",
        v =>
          (v && v <= this.amounts) ||
          " You cannot deposit more money than you have in your account"
      ]
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    ...mapActions(["addTransfer"]),
    ...mapActions(["updateTransfer"]),

    //addStudent
    submitTransfer() {
      if (this.$refs.form.validate()) {
        this.addTransfer({
          description: this.description,
          amount: this.amount,
          date: this.Date,
          accountname: this.nameAccount,
          to_account: this.to_account
        });
      }
    },
    modifyTransfer() {
      this.updateTransfer({
        description: this.description,
        amount: this.amount,
        date: this.Date,
        accountname: this.nameAccount
      });
    }
  },
  props: ["visible", "account", "amounts"],
  computed: {
    dialog2: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    },
    ...mapGetters(["ListDetails"]),
    ...mapGetters(["getAccountList"]),

    tr() {
      return this.getAccountList;
    },
    details() {
      return this.ListDetails;
    },
    Date() {
      let date = moment();
      return date;
    }
  }
};
</script>
