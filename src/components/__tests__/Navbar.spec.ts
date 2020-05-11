import Navbar from "@/components/Navbar.vue";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from "@/plugins/__mockPlugin__/mockVuetify";
import store from "@/store/__MockStore__/mockStore";

const localVue = createLocalVue();
localVue.use(Vuetify);

describe("Navbar", () => {
  it("renders and gets a username", () => {
    const wrapper = shallowMount(Navbar, {
      localVue: localVue,
      store
    });
    // const name = wrapper.find(".v-toolbar-title > span");

    const name = wrapper.vm.$data;

    expect(name.username).toBe("test");
  });
});
