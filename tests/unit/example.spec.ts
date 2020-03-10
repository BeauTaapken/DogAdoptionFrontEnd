import { shallowMount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";

describe("Navbar.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Navbar, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
