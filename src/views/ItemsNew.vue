<template>
  <div class="items-new">
    <ul>
      <li v-for="error in errors" class="text-danger">{{ error }}</li>
    </ul>
    <form v-on:submit.prevent="createItem()">
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
        Select Wash Setting:
        <div
          class="mt-4 owl-nav-over owl-nav-over-lg"
          data-toggle="owl-carousel"
          data-owl-carousel-settings='{"responsive":{"0":{"items":1}, "600":{"items":2}, "980":{"items":4}}, "margin":10, "nav":true, "dots":false}'
        >
          <div class="row text-center mb-4">
            <div class="col-lg-4 py-2" v-for="washSetting in washSettings">
              <div class="form-group">
                <div class="card product-card overlay-hover">
                  <div
                    class="overlay-hover-content overlay-op-7 product-card-hover-tools"
                  >
                    <h7 class="text-white">
                      <input
                        type="radio"
                        v-model="washSettingId"
                        :id="washSetting.id"
                        :value="washSetting.id"
                      />
                      {{ washSetting.name }}
                    </h7>
                  </div>
                  <div class="pos-relative">
                    <img
                      class="card-img-top img-fluid"
                      :src="washSetting.image_url"
                      style="width:48px;height:50px"
                      alt="Card image cap"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        Select Dry Setting:
        <div
          class="mt-4 owl-nav-over owl-nav-over-lg"
          data-toggle="owl-carousel"
          data-owl-carousel-settings='{"responsive":{"0":{"items":1}, "600":{"items":2}, "980":{"items":4}}, "margin":10, "nav":true, "dots":false}'
        >
          <div class="row text-center mb-4">
            <div class="col-lg-4 py-2" v-for="drySetting in drySettings">
              <div class="form-group">
                <div class="card product-card overlay-hover">
                  <div
                    class="overlay-hover-content overlay-op-7 product-card-hover-tools"
                  >
                    <h7 class="text-white">
                      <input
                        type="radio"
                        v-model="drySettingId"
                        :id="drySetting.id"
                        :value="drySetting.id"
                      />
                      {{ drySetting.name }}
                    </h7>
                  </div>
                  <div class="pos-relative">
                    <img
                      class="card-img-top img-fluid"
                      :src="drySetting.image_url"
                      style="width:48px;height:50px"
                      alt="Card image cap"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="submit" class="bt btn-primary" value="Submit" />
    </form>
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
