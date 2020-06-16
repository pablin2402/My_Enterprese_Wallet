<template>
  <div>
    <v-btn long depressed color="#F2F2F2" width="150px" @click="dialog = true">
      <v-icon left small>mdi-plus-circle-outline</v-icon>
      <span class="caption text-lowercase">Add New Category</span>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  v-model="categoryType"
                  row
                  label="Choose any type:"
                >
                  <v-radio label="Income" value="income"></v-radio>
                  <v-radio label="Expense" value="expense"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="categoryName"
                  label="Category Name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="addNewCategory(categoryType, categoryName)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CategoryDialog",
  data() {
    return {
      dialog: false,
      categoryType: "",
      categoryName: ""
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    categories() {
      return this.getCategoryList;
    }
  },
  methods: {
    ...mapActions(["addCategory"]),
    addNewCategory(type, name) {
      if (type === "") {
        alert("You must choose any category type!");
      } else if (name === "") {
        alert("You must fill the name field!");
      } else {
        this.addCategory({
          code: this.selfGenerateCode(),
          type: type,
          name: name
        });
        this.dialog = false;
        this.categoryName = "";
        this.categoryType = "";
      }
    },
    selfGenerateCode() {
      const { code } = this.categories[Object.keys(this.categories).length - 1];
      const newNumber = parseInt(code.split("-")[1]) + 1;
      return "cat-" + newNumber;
    }
  }
};
</script>
