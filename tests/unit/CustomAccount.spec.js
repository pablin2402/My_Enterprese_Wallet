import { assert } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import CustomAccount from "@/views/CustomAccount.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";
import store from "@/store";
import VueRouter from "vue-router";

describe("CustomAccount Module", () => {
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

  /*it("Filter with categorieSelect", async () => {
    const wrapper = shallowMount(CustomAccount, {
      store,
      vuetify,
      localVue,
      router,
      data: {
        categorieSelect: "transfer"
      }
    });
    wrapper.vm.$router.push({
      name: "CustomAccount",
      params: { id: "Clients" }
    });
    wrapper.vm.$data.categorieSelect = "transfer";
    await wrapper.vm.$forceUpdate();
    const options = wrapper.find(".categorieSelect_class");
    options.element.value = "transfer";
    options.trigger("change");

    await wrapper.vm.$forceUpdate();
    console.log("tamaño: " + wrapper.vm.filterList.length);
    assert.equal(wrapper.vm.filterList.length, 2);
  });*/

  it("Filter with selectedDate", async () => {
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
    wrapper.vm.$data.selectedDate = "2020-06-10";
    await wrapper.vm.$forceUpdate();
    const options = wrapper.find(".selectedDate_class");
    options.trigger("change");

    await wrapper.vm.$forceUpdate();
    console.log("tamaño: " + wrapper.vm.filterList.length);
    assert.equal(wrapper.vm.filterList.length, 1);
  });
});
