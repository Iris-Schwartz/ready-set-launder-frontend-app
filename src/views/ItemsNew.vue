<template>
  <div class="items-new">
    <form v-on:submit.prevent="createItem()">
      <h2>Add Clothing Item to Inventory!</h2>
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
        <p>Select Wash Setting: </p>
        <div v-for="washSetting in washSettings">
          <input type="radio" v-model="washSettingId" :id="washSetting.id" :value="washSetting.id">
          <img :src="washSetting.image_url" style="width:48px;height:50px">
          <label :for="washSetting.name">{{ washSetting.name }}</label>
        </div>
      </div>
      <div class="form-group">
        <p>Select Dry Setting: </p>
        <div v-for="drySetting in drySettings">
          <input type="radio" v-model="drySettingId" :value="drySetting.id" :id="drySetting.id">
           <img :src="drySetting.image_url" style="width:48px;height:50px">
          <label :for="drySetting.name">{{ drySetting.name }}</label>
        </div>
      </div>
      <input type="submit" class="bt btn-primary" value="Submit">
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
      washSettings: [],
      drySettings: [],
      errors: [],
    };
  },
  created: function () {
    axios.get("/api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
    axios.get("/api/wash_settings").then((response) => {
      console.log(response.data);
      this.washSettings = response.data;
    });
    axios.get("/api/dry_settings").then((response) => {
      console.log(response.data);
      this.drySettings = response.data;
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
