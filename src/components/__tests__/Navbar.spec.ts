import Vue from "vue";
import Vuetify from "vuetify";

import Navbar from "@/components/Navbar";

import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();

describe("Navbar.vue", () => {
  let vuetify : any;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("renders props.msg when passed", () => {
    const wrapper = mount(Navbar, {
      localVue,
      vuetify,
      data: () => ({
        username: "tester",
      })
    });

    const name = wrapper.find("v-toolbar-title");

    expect(name.text()).toBe("tester");
  });
});
