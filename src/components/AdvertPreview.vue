<template>
  <v-card class="mx-auto ma-7 card" max-width="700" outlined>
    <v-img
            height="300"
            v-bind:src="data.img"
    ></v-img>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{ data.title }}</v-list-item-title>
        <v-list-item-subtitle>Breed: {{ correctBreed(data.breed) }}</v-list-item-subtitle>
        <v-list-item-subtitle>Age: {{ data.age }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

  </v-card>
</template>

<script>
export default {
  name: "advert",
  props: {
    data: {
      required: true
    }
  },
  methods: {
    correctBreed(breed) {
      const lowercaseBreed = breed.toLowerCase().replace(/_/g, " ");
      return lowercaseBreed.charAt(0).toUpperCase() + lowercaseBreed.slice(1);
    },

    goToAdvert() {
      //TODO make advert page that has props asking for data
    }
  }
};
</script>

<style scoped>
.flex-container > div {
  width: 25%;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 20px;
}

.card {
  transition: transform .2s;
}

.card:hover {
  transform: scale(1.05);
  cursor: pointer;
  box-shadow: 0px 0px 20px 3px dimgray;
}
</style>
