import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Accounts from "@/views/Home.vue";
import VueRouter from "vue-router";
import CustomAccount from "@/views/CustomAccount.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";

import store from "@/store";

describe("Accounts Module", () => {
  it("Default accounts", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    const vuetify = new Vuetify();
    const router = new VueRouter({
      routes: [{
        path: "/customAccount/:id",
        name: "CustomAccount",
        component: CustomAccount
      }]
    });
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(Accounts, {
      store,
      router,
      vuetify,
      localVue
    });
    let expectedLength = 3;
    const accounts = wrapper.vm.accounts;
    assert.equal(accounts.length, expectedLength);
  });
  it("Don't add any account if name is not filled", () => {
    global.alert = message => {
      console.log(message);
    };

    const localVue = createLocalVue();
    global.alert = message => {
      console.log(message);
    };
    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    const router = new VueRouter({
      routes: [{
        path: "/customAccount/:id",
        name: "CustomAccount",
        component: CustomAccount
      }]
    }); const vuetify = new Vuetify();

    const wrapper = mount(Accounts, {
      store,
      router,
      vuetify,
      localVue
    });
    let expectedLength = 3;
    const accounts = wrapper.vm.accounts;

    wrapper.vm.creaaccount({
      code: "",
      name: "",
      totalAmount: 0,
      info: []
    });
    assert.equal(accounts.length, expectedLength);

    expectedLength = 4;
    wrapper.vm.creaaccount({
      code: "",
      name: "newAccount",
      totalAmount: 0,
      info: []
    });
    assert.equal(accounts.length, expectedLength);
  });
  it("Don't update any account if new name is not filled and doesn't repeate", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    const router = new VueRouter({
      routes: [{
        path: "/customAccount/:id",
        name: "CustomAccount",
        component: CustomAccount
      }]
    });
    const vuetify = new Vuetify();

    const wrapper = mount(Accounts, {
      store,
      router,
      vuetify,
      localVue
    });
    const accounts = wrapper.vm.accounts;

    wrapper.vm.updaaccount({
      code: "account-1",
      name: ""
    });
    assert.isTrue(accounts[0].name !== "");

    wrapper.vm.updaaccount({
      code: "account-1",
      name: "Clients"
    });
    assert.isTrue(accounts[0].name !== "Clients");

    wrapper.vm.updaaccount({
      code: "account-1",
      name: "newName"
    });
    assert.isTrue(accounts[0].name === "newName");
  });
});
