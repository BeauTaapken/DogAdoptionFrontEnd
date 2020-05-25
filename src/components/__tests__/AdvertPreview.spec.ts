import AdvertPreview from "@/components/AdvertPreview";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "@/plugins/__mockPlugin__/mockVuetify";
import store from "@/store/__MockStore__/mockStore";

const localVue = createLocalVue();
localVue.use(Vuetify);

const factory = (propsData: any) =>
  mount(AdvertPreview, {
    localVue: localVue,
    store,
    propsData
  });

describe("AdverPreview", () => {
  const wrapper = factory({
    data: {
      advertId: "advertid",
      UUID: { UUID: "testuser", Username: "test" },
      age: 1,
      breed: "Labrador",
      date: "2020-05-04T11:47:39",
      description: "testdescription",
      img: "testimg",
      latitude: 51.4519,
      longtitude: 5.48094,
      place: "Rachelsmolen R1, Eindhoven, Noord-Brabant 5612 MA, Nederland",
      title: "testname"
    }
  });

  it("renders an AdvertPreview component with the needed data", () => {
    const title = wrapper.find(".v-list-item__title");
    const breed = wrapper.findAll(".v-list-item__subtitle").at(0);
    const age = wrapper.findAll(".v-list-item__subtitle").at(1);

    expect(title.text()).toBe("testname");
    expect(breed.text()).toBe("Breed: Labrador");
    expect(age.text()).toBe("Age: 1");
  });
});
