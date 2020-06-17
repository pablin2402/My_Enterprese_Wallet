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

    console.log("TEST -> Router push Enterprise");
    wrapper.vm.$router.push({
      name: "CustomAccount",
      params: { id: "Enterprise" }
    });

    wrapper.vm.findAccountIndex();
    const index = wrapper.vm.accountIndex;
    const name = wrapper.vm.accountName;
    console.log(`TEST-> IndexFound: ${index} AccountName: ${name}`);

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
    //const accounts = wrapper.vm.accounts;
    //console.log(`TEST -> Acounts: ${JSON.stringify(accounts)}`);
    console.log("TEST -> Router push newName");
    wrapper.vm.$router.push({
      name: "CustomAccount",
      params: { id: "newName" }
    });
    const index = wrapper.vm.accountIndex;
    console.log(`TEST -> accountIndex: ${index}`);
    const movements = wrapper.vm.info;
    //console.log(`TEST -> Info: ${JSON.stringify(movements)}`);
    assert.equal(movements.length, 4);
  });

  it("Delete movement", async () => {
    global.alert = message => {
      console.log(`ACCOUNT-> ${message}`);
    };
    global.confirm = () => true;
    const wrapper = shallowMount(CustomAccount, {
      store,
      vuetify,
      localVue,
      router
    });

    console.log("TEST -> Router push clients");
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
    assert.equal(movementsList.length, initialLength + 1);
  });*/
});
