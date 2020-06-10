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
                <v-radio-group v-model="categoryType" row>
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
          <v-btn color="blue darken-1" text @click="addNewCategory">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CategoryDialog",

  data() {
    return {
      dialog: false,
      categoryType: "",
      categoryName: ""
    };
  }
};
</script>
