import Vue from "vue";
import Vuetify from "vuetify";

import Login from "@/views/Login.vue";
import {mount, createLocalVue, shallowMount} from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuetify)

describe("Login.vue", () => {
  let wrapper: any;

  const email = "test@gmail.com";
  const password = "test";

  beforeEach(() => {
    // wrapper = shallowMount(Login, {
    //   localVue,
    //   vuetify,
    //   data: {
    //     email: "tester@gmail.com",
    //     password: "tester",
    //   }
    // });
    wrapper = shallowMount(Login, {
      localVue
    });
  });

  it("email value is text in email field", () => {

    //expect(wrapper.vm.email).toBe("tester@gmail.com");
    // const emailInput = wrapper.find('[name="email"]');
    // emailInput.setValue("Fuck this")
    // expect(emailInput.text()).toBe("tester@gmail.com");
    expect(wrapper.vm.email).toBe("tester@gmail.com");
  });
});