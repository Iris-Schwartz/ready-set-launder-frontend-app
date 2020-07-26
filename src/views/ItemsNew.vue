<template>
  <div class="items-new">
    <form v-on:submit.prevent="createItem()">
      <h1>Add Your Clothing Item!</h1>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Item Name: </label>
        <input type="text" v-model="name">
      </div>
      <div class="form-group">
        <label for="categories">Select Category: </label>
        <select name="categories" id="categories" v-model="categoryId">
          <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Select Wash Setting: </label>
        <input type="number" v-model="washSettingId">
      </div> 
      <div class="form-group">
        <label>Select Dry Setting: </label>
        <input type="number" v-model="drySettingId">
      </div>
       <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      name: "",
      washSettingId: null,
      drySettingId: null,
      categories: [],
      categoryId: "",
      errors: [],
    };
  },
  created: function () {
    axios.get("api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
  },
  methods: {
    createItem: function () {
      var params = {
        name: this.name,
        category_id: this.categoryId,
        wash_setting_id: this.washSettingId,
        dry_setting_id: this.drySettingId,
      };
      axios
        .post("/api/items", params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
