import Advert from "@/views/Advert.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "@/plugins/__mockPlugin__/mockVuetify";
import store from "@/store/__MockStore__/mockStore";

const localVue = createLocalVue();
localVue.use(Vuetify);

const factory = (propsData: any) =>
  mount(Advert, {
    localVue: localVue,
    store,
    propsData
  });

describe("Advert", () => {
  const wrapper = factory({
    advertId: "advertid"
  });

  it("renders update and delete button when user is the same user as poster", () => {
    const updateButton = wrapper.find(".update").text();

    const deleteButton = wrapper.find(".delete").text();

    const isSameUser = wrapper.vm.$data.isSameUser;

    expect(updateButton).toBe("Update advert");
    expect(deleteButton).toBe("Delete advert");
    expect(isSameUser).toBe(true);
    wrapper.destroy();
  });

  it("renders mail button when not the same user as poster", () => {
    const wrapper = factory({
      advertId: "testAdvertId"
    });

    const mail = wrapper.find(".mail").text();

    const isSameUser = wrapper.vm.$data.isSameUser;

    expect(mail).toBe("Mail owner of dog");
    expect(isSameUser).toBe(false);
    wrapper.destroy();
  });
});
