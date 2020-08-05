<template>
  <div class="items-new">
    <div id="content">
      <div class="container">
        <div class="card p-4">
          <h2 class="card-title mb-2">
            Add Item to Clothing Inventory!
          </h2>
          <hr class="my-3" />
          <ul>
            <li v-for="error in errors" class="text-danger">{{ error }}</li>
          </ul>

          <div class="row mb-4">
            <form v-on:submit.prevent="createItem()">
              <div class="form-group">
                <div class="col-md-12 text-sm text-uppercase">Name</div>
                <div class="col-md-4 mb-3">
                  <input type="text" v-model="name" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-12 text-sm text-uppercase">Category</div>
                <div class="col-md-4 mb-3">
                  <select name="categories" id="categories" v-model="categoryId">
                    <option v-for="category in categories" :value="category.id">{{
                      category.name
                    }}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-12 text-sm text-uppercase">
                  Wash Setting
                </div>
                <div class="col-md-12 col-lg-12 mb-3">
                  <div class="row text-center mb-4">
                    <div class="col-sm-4" v-for="washSetting in washSettings">
                      <div class="form-group">
                        <div class="card product-card overlay-hover">
                          <div
                            class="overlay-hover-content overlay-op-7 product-card-hover-tools"
                          >
                            <h6 class="text-white">
                              <input
                                type="radio"
                                v-model="washSettingId"
                                :id="washSetting.id"
                                :value="washSetting.id"
                              />
                              {{ washSetting.name }}
                            </h6>
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
                <div class="col-md-12 text-sm text-uppercase">
                  Dry Setting
                </div>
                <div class="col-md-12 col-lg-12 mb-3">
                  <div class="row text-center mb-4">
                    <div class="col-sm-4" v-for="drySetting in drySettings">
                      <div class="form-group">
                        <div class="card product-card overlay-hover">
                          <div
                            class="overlay-hover-content overlay-op-7 product-card-hover-tools"
                          >
                            <h6 class="text-white">
                              <input
                                type="radio"
                                v-model="drySettingId"
                                :id="drySetting.id"
                                :value="drySetting.id"
                              />
                              {{ drySetting.name }}
                            </h6>
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
        </div>
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
