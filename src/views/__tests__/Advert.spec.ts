import Advert from "@/views/Advert.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "@/plugins/__mockPlugin__/mockVuetify";
import store from "@/store/__MockStore__/mockStore";

const localVue = createLocalVue();
localVue.use(Vuetify);

let advertData = {
  advertId: "advertid",
  user: { UUID: "testuser", Username: "test" },
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

const factory = (propsData: any) =>
  mount(Advert, {
    localVue: localVue,
    store,
    propsData,
    data() {
      return{
        advert: advertData
      }
    }
  });

describe("Advert", () => {
  const wrapper = factory({
    advertId: "advertid"
  });

  it("renders update and delete button when user is the same user as poster", () => {
    advertData = {
      advertId: "advertid",
      user: { UUID: "testuser", Username: "test" },
      age: 1,
      breed: "Labrador",
      date: "2020-05-04T11:47:39",
      description: "testdescription",
      img: "testimg",
      latitude: 51.4519,
      longtitude: 5.48094,
      place: "Rachelsmolen R1, Eindhoven, Noord-Brabant 5612 MA, Nederland",
      title: "testname"
    };
    const updateButton = wrapper.find(".update").text();

    const deleteButton = wrapper.find(".delete").text();

    const isSameUser = wrapper.vm.$data.isSameUser;

    expect(updateButton).toBe("Update advert");
    expect(deleteButton).toBe("Delete advert");
    expect(isSameUser).toBe(true);
    wrapper.destroy();
  });

  it("renders mail button when not the same user as poster", () => {
    advertData = {
      advertId: "testAdvertId",
      user: { UUID: "othertestuser", Username: "othertestuser" },
      age: 1,
      breed: "Labrador",
      date: "2020-05-04T11:47:39",
      description: "testdescription",
      img: "testimg",
      latitude: 51.4519,
      longtitude: 5.48094,
      place: "Rachelsmolen R1, Eindhoven, Noord-Brabant 5612 MA, Nederland",
      title: "testname"
    };
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
