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
  it("Initial movements", async () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);
    const router = new VueRouter({
      routes: [
        {
          path: "/customAccount/:id",
          name: "CustomAccount",
          component: CustomAccount
        }
      ]
    });

    const vuetify = new Vuetify();

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
    //const accounts = wrapper.vm.accounts;
    const movements = wrapper.vm.info;

    /*console.log(JSON.stringify(accounts));
    console.log(JSON.stringify(movements));*/
    assert.equal(movements.length, 4);
  });
  /*it("Movement added", async () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    const vuetify = new Vuetify();

    const wrapper = mount(Movement, {
      store,
      vuetify,
      localVue /*,
      props: {
        dialog: false,
        newComponent: false,
        selectedMovement: {
          id: "0-0",
          name: "Saving-0",
          category: "transfer",
          amount: "100",
          type: "income",
          date: "2020-06-11",
          index: 0
        }
      }/
    });
    wrapper.vm.dialog = true;
    wrapper.vm.newComponent = false;
    wrapper.vm.selectedMovement = {
      id: "0-0",
      name: "Saving-0",
      category: "transfer",
      amount: "100",
      type: "income",
      date: "2020-06-11",
      index: 1
    };
    const movementsList = wrapper.vm.info;
    const initialLength = 4;
    console.log(`before: ${JSON.stringify(movementsList)}`);
    assert.equal(movementsList.length, initialLength);
    //wrapper.vm.dispatchAction;
    //await wrapper.vm.$forceUpdate();
    /*console.log(`after: ${JSON.stringify(movementsList)}`);
    assert.equal(movementsList.length, initialLength + 1);*/
  //});
  it("Delete movement", async () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);
    const router = new VueRouter({
      routes: [
        {
          path: "/customAccount/:id",
          name: "CustomAccount",
          component: CustomAccount
        }
      ]
    });

    const vuetify = new Vuetify();
    global.alert = message => {
      console.log(message);
    };
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
    //const accounts = wrapper.vm.accounts;
    const movements = wrapper.vm.info;

    /*console.log(JSON.stringify(accounts));
    console.log(JSON.stringify(movements));*/
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
  it("Find Index", async () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);
    const router = new VueRouter({
      routes: [
        {
          path: "/customAccount/:id",
          name: "CustomAccount",
          component: CustomAccount
        }
      ]
    });

    const vuetify = new Vuetify();
    const wrapper = shallowMount(CustomAccount, {
      store,
      vuetify,
      localVue,
      router
    });

    const index = wrapper.vm.accountIndex;
    console.log(index);

    wrapper.vm.$router.push({
      name: "CustomAccount",
      params: { id: "Clients" }
    });

    wrapper.vm.findAccountIndex;
    const indexToFound = 1;
    const foundIndex = wrapper.vm.accountIndex;
    assert.equal(foundIndex, indexToFound);
  });
});
