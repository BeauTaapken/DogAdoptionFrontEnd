<template>
  <div>
    {{ advert.title }}
  </div>
</template>

<script lang="ts">
  // import noPersistStore from "@/store/noPersistStore";
  import store from "@/store/persistStore";

export default {
  name: "Advert",
  props: {
    advertId: {
      required: true
    }
  },
  data: function() {
    return {
      advert: "" as any
    };
  },
  mounted(): void {
    this.advert = store.getters.getAdvert(this.advertId);
    console.log(this.advert)
    //TODO get advert based on advertid with api call
  },
  methods: {
    test(advert: any){
      console.log(store.getters.getAdverts);
      // console.log(noPersistStore.getters.getAdvert(advert));
    }
  }
};
</script>

<style scoped></style>
