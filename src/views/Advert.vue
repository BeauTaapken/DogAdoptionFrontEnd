<template>
  <div>
    <v-btn @click="test(advertId)"></v-btn>
    {{ advertId }}
  </div>
</template>

<script lang="ts">
  import noPersistStore from "@/store/noPersistStore";

export default {
  name: "Advert",
  props: {
    advertId: {
      required: true
    }
  },
  mounted(): void {

    //TODO get advert based on advertid with api call
  },
  methods: {
    test(advert: any){
      console.log(noPersistStore.getters.getAdverts)
      console.log(noPersistStore.getters.getAdvert(advert));
    }
  }
};
</script>

<style scoped></style>
