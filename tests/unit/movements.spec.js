import { assert } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import CustomAccount from "@/views/CustomAccount.vue";
//import Movement from "@/components/Movement.vue";
//import Transfer from "@/components/Transfer.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import store from "@/store";
//import router from "@/router";
//global.requestAnimationFrame = cb => cb();

describe("Movements Module", () => {
  let localVue;
  let vuetify;
  let router;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    vuetify = new Vuetify();
    router = new VueRouter({
      routes: [
        {
          path: "/customAccount/:id",
          name: "CustomAccount",
          component: CustomAccount
        }
      ]
    });
  });

  it("Find Index", async () => {
    const wrapper = shallowMount(CustomAccount, {
      store,
      vuetify,
      localVue,
      router
    });

    wrapper.vm.$router.push({
      name: "CustomAccount",
      params: { id: "Enterprise" }
    });

    wrapper.vm.findAccountIndex();

    const indexToFound = 2;
    const foundIndex = wrapper.vm.accountIndex;
    assert.equal(foundIndex, indexToFound);
  });

  it("Initial movements", async () => {
    const wrapper = shallowMount(CustomAccount, {
      store,
      vuetify,
      localVue,
      router
    });
    wrapper.vm.$router.push({
      name: "CustomAccount",
      params: { id: "newName" }
    });
    const movements = wrapper.vm.info;
    assert.equal(movements.length, 4);
  });

  it("Delete movement", async () => {
    global.alert = () => {};
    global.confirm = () => true;
    const wrapper = shallowMount(CustomAccount, {
      store,
      vuetify,
      localVue,
      router
    });

    wrapper.vm.$router.push({
      name: "CustomAccount",
      params: { id: "Clients" }
    });
    const movements = wrapper.vm.info;

    assert.equal(movements.length, 4);
    wrapper.vm.deleteMovement({
      id: "1-3",
      name: "Chair",
      category: "other",
      amount: "456",
      type: "expense",
      date: "2020-06-13"
    });
    await wrapper.vm.$forceUpdate();
    const afterDelete = wrapper.vm.info;
    assert.equal(afterDelete.length, 3);
  });
});
