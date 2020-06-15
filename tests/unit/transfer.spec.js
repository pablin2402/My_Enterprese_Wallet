import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";

import store from "@/store";
import Home from "@/views/Home.vue";


describe("ParentWithAPICallChild.vue", () => {
  it("buttonDeleteandUpdateExists", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();

    const wrapper = mount(Home, {
      store,
      vuetify,
      localVue
    });
    const deleteButton = wrapper.find("#delete");
    const uploadButton = wrapper.find("#upload");

    assert.exists(deleteButton && uploadButton);
  });
  it("First name Right", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();

    const wrapper = mount(Home, {
      store,
      vuetify,
      localVue
    });
    const accounts = wrapper.vm.accounts[0];
    const saving = "Saving";
    assert.equal(accounts.name, saving);
    const code = "account-1";
    assert.equal(accounts.code, code);
  });
  it(" Delete Account", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();
    const wrapper = mount(Home, {
      store,
      vuetify,
      localVue
    });
    const initiallength = wrapper.vm.accounts.length;
    const expectedlength = initiallength - 1;
    wrapper.vm.deleaccount("account-3");
    assert.equal(
      wrapper.vm.accounts.length,
      expectedlength
    );
  });
});
