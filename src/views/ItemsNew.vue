<template>
  <div class="items-new">
    <!-- ======== @Region: #content ======== -->
    <div id="content">
      <div class="container">
        <!-- Services -->
        <h2 class="title-divider">
          <span
            >Add Clothing
            <span class="font-weight-normal text-muted">Items</span></span
          >
          <small>Core features included in all plans.</small>
        </h2>
        <form v-on:submit.prevent="createItem()">
          <ul>
            <li v-for="error in errors" class="text-danger">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label>Item Name: </label>
            <input type="text" v-model="name" />
          </div>
          <div class="form-group">
            <label for="categories">Select Category: </label>
            <select name="categories" id="categories" v-model="categoryId">
              <option v-for="category in categories" :value="category.id">{{
                category.name
              }}</option>
            </select>
          </div>
          <div class="form-group">
            <p>Select Wash Setting:</p>
            <div class="row text-center mb-4">
              <div class="col-lg-4 py-2" v-for="washSetting in washSettings">
                <input
                  type="radio"
                  v-model="washSettingId"
                  :id="washSetting.id"
                  :value="washSetting.id"
                />
                <img
                  :src="washSetting.image_url"
                  style="width:48px;height:50px"
                  class="text-primary"
                  data-animate="fadeIn"
                  data-animate-delay="0.1"
                />

                <h4 class="mt-2">
                  {{ washSetting.name }}
                </h4>
              </div>
            </div>
          </div>
          <div class="form-group">
            <p>Select Dry Setting:</p>
            <div class="row text-center mb-4">
              <div class="col-lg-4 py-2" v-for="drySetting in drySettings">
                <input
                  type="radio"
                  v-model="drySettingId"
                  :id="drySetting.id"
                  :value="drySetting.id"
                />
                <img
                  :src="drySetting.image_url"
                  style="width:48px;height:50px"
                  class="text-primary"
                  data-animate="fadeIn"
                  data-animate-delay="0.1"
                />

                <h4 class="mt-2">
                  {{ drySetting.name }}
                </h4>
              </div>
            </div>
          </div>
          <input type="submit" class="bt btn-primary" value="Submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
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
  created: function() {
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
    createItem: function() {
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
