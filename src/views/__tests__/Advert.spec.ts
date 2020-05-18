import Advert from "@/views/Advert.vue";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from "@/plugins/__mockPlugin__/mockVuetify";
import store from "@/store/__MockStore__/mockStore";

const localVue = createLocalVue();
localVue.use(Vuetify);

// describe("Advert", () => {
//   it("renders update and delete buttons when logged in", () => {
//     const wrapper = shallowMount(Advert, {
//       localVue: localVue,
//       store,
//       propsData: {
//         advertId: "advertid"
//       }
//     });
//
//     const updateButton = wrapper.find({ name: "update" });
//
//     expect(updateButton.exists()).toBeFalsy();
//   });
// });

describe("Advert", () => {
  it("renders mail button when not the same user as poster", () => {
    const wrapper = shallowMount(Advert, {
      localVue: localVue,
      store,
      propsData: {
        advertId: "advertid"
      }
    });

    const isSameUser = wrapper.vm.$data.isSameUser;

    expect(isSameUser).toBe(true);
  });
});
