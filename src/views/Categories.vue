<template>
  <div>
    <v-container class="my-10" grid-list-md>
      <H1>Categories</H1>
      <br />
      <CategoryDialog />
      <v-layout row justify-space-around>
        <v-flex md1 class="pt-6"></v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-card
        color="#F2F2F2"
        flat
        v-for="category in categories"
        :key="category.code"
      >
        <v-layout row wrap justify-space-around class="pa-3">
          <v-flex md2>
            <div class="caption grey--text">Code</div>
            <div>{{ category.code }}</div>
          </v-flex>
          <v-flex md2>
            <div class="caption grey--text">Name</div>
            <div>{{ category.name }}</div>
          </v-flex>
          <v-flex md2>
            <div class="caption grey--text">Type</div>
            <div>{{ category.type }}</div>
          </v-flex>
          <v-flex md2>
            <v-btn small>
              <v-icon>mdi-trash-can-outline</v-icon>
              <span>Delete</span>
            </v-btn>
          </v-flex>
          <v-flex md2>
            <v-btn small>
              <v-icon>mdi-pencil-outline</v-icon>
              <span>Update</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryDialog from "@/components/CategoryDialog.vue";

export default {
  name: "Categories",

  components: { CategoryDialog },

  computed: {
    ...mapGetters(["getCategoryList"]),
    categories() {
      return this.getCategoryList;
    }
  }
};
</script>
