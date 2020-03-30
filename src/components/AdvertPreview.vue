<template>
  <v-card class="card">
    <div class="flex-container">
      <div >
        <v-img class="img" v-bind:src="data.img"></v-img>
      </div>
      <div>{{ data.title }}</div>
      <div>{{ correctBreed(data.breed) }}</div>
      <div>Age: {{ data.age }}</div>
    </div>
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

.img {
  object-fit: contain;
  background-size: cover;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.flex-container > div {
  width: 25%;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 20px;
}

.card {
  margin-bottom: 10px;
}
</style>
