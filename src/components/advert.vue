<template>
  <div class="wrapper">
    <div class="img">
      <v-img v-bind:src="data.img" ></v-img>
    </div>
    <h1>{{data.title}}</h1>
    <h2>Breed: {{data.breed}}</h2>
    <h2>Age: {{data.age}}</h2>
  </div>
</template>

<script>
export default {
  name: "advert",
  props: {
    data: {
      required: true
    }
  }
};
</script>

<style scoped>
  .img {
    height: 25%;
    width: 25%;
    float: left;
  }

  .wrapper {
    display: grid;
    grid-gap: 5px;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    padding-bottom: 20px;
  }

</style>
