import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import CustomAccount from "@/views/CustomAccount.vue";
//import Movement from "@/components/Movemets.vue";
//import Transfer from "@/components/Transfer.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";

import store from "@/store";
import router from "@/router";

describe("CreateAccount Module", () => {
  it("Initial rendering", async () => {
    console.log("Initial rendering initialized");
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);

    const vuetify = new Vuetify();

    const wrapper = mount(CustomAccount, {
      store,
      vuetify,
      localVue,
      router
    });

    wrapper.vm.$data.accountname = "Savings";
    wrapper.vm.$data.accountIndex = 0;

    const movements = wrapper.vm.info;
    assert.equal(movements.length, 4);

    /*console.log("Account HTML: " + wrapper.html());

    const list = wrapper.findAll(".movement-tipe");
    assert.strictEqual(list.length, 4);*/
  });
});
