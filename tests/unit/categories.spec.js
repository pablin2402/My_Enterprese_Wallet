import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Categories from "@/views/Categories.vue";
import CategoryDialog from "@/components/CategoryDialog.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";
import store from "@/store";

describe("Categories Module", () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);

    vuetify = new Vuetify();
  });
  it("Default categories", () => {
    const wrapper = mount(CategoryDialog, {
      store,
      vuetify,
      localVue
    });
    let expectedLength = 4;
    const categories = wrapper.vm.categories;
    assert.equal(categories.length, expectedLength);
  });

  it("Don't add any category if name and type are not filled", () => {
    global.alert = message => {
      console.log(message);
    };

    const wrapper = mount(CategoryDialog, {
      store,
      vuetify,
      localVue
    });
    let expectedLength = 4;
    const categories = wrapper.vm.categories;

    wrapper.vm.addNewCategory("", "");
    assert.equal(categories.length, expectedLength);

    expectedLength = 5;
    wrapper.vm.addNewCategory("income", "newCat");
    assert.equal(categories.length, expectedLength);
  });
  it("Rendering categories list after adding a new one", async () => {
    const wrapper = mount(Categories, {
      store,
      vuetify,
      localVue,
      stubs: {
        CategoryDialog
      }
    });

    await wrapper.vm.$store.dispatch("addCategory", {
      code: "cat-6",
      type: "income",
      name: "newCat3"
    });
    await wrapper.vm.$forceUpdate();
    const list = wrapper.findAll(".list-name");
    assert.strictEqual(list.at(5).text(), "newCat3");
  });
});

