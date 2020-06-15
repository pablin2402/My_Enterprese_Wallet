import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Categories from "@/views/Categories.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";

//import { categoriesList } from "./mockStore";
import store from "@/store";

describe("Categories Module", () => {
  it("Default categories", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();

    const wrapper = mount(Categories, {
      store,
      vuetify,
      localVue
    });
    let expectedLength = 4;
    const categories = wrapper.vm.categories;
    assert.equal(categories.length, expectedLength);
  });

  it("Don't add any category if name and type are not filled", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();

    const wrapper = mount(Categories, {
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
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();

    const wrapper = mount(Categories, {
      store,
      vuetify,
      localVue
    });

    wrapper.vm.addNewCategory("income", "newCat3");
    await wrapper.vm.$forceUpdate();
    const list = wrapper.findAll(".list-name");
    assert.strictEqual(list.at(5).text(), "newCat3");
  });
});
