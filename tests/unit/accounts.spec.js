import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Accounts from "@/views/Home.vue";
import CreateAccount from "@/components/CreateAccountDialog.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";

import store from "@/store";

describe("Accounts Module", () => {
  it("Don't add any account if name is not filled", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();

    const wrapper = mount(CreateAccount, {
      store,
      vuetify,
      localVue
    });
    let expectedLength = 3;
    const accounts = wrapper.vm.accounts;

    wrapper.vm.creaaccount("");
    assert.equal(accounts.length, expectedLength);

    expectedLength = 4;
    wrapper.vm.creaacount("newAccount");
    assert.equal(accounts.length, expectedLength);
    assert.exists(wrapper.contains(name));
  });

  it("Default accounts", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();

    const wrapper = mount(Accounts, {
      store,
      vuetify,
      localVue
    });
    let expectedLength = 3;
    const accounts = wrapper.vm.accounts;
    assert.equal(accounts.length, expectedLength);
  });
  /*
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
  });*/
});
