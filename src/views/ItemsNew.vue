<template>
  <div class="items-new">
    <!-- ======== @Region: #content ======== -->
    <div id="content" class="p-0">
      <form v-on:submit.prevent="createItem()">
        <ul>
          <li v-for="error in errors" class="text-danger">{{ error }}</li>
        </ul>
        <div class="container py-4 py-lg-6">
          <hr class="hr-lg mt-0 mb-3 w-10 mx-auto hr-primary" />
          <h2 class="text-center text-uppercase font-weight-bold my-0">
            Wash Settings
          </h2>
          <hr class="mb-5 w-50 mx-auto" />
          <div
            class="mt-4 owl-nav-over owl-nav-over-lg"
            data-toggle="owl-carousel"
            data-owl-carousel-settings='{"responsive":{"0":{"items":1}, "600":{"items":2}, "980":{"items":4}}, "margin":10, "nav":true, "dots":false}'
          >
            <div v-for="washSetting in washSettings">
              <div class="form-group">
                <div class="card product-card overlay-hover">
                  <div
                    class="overlay-hover-content overlay-op-7 product-card-hover-tools"
                  >
                    <h4 class="text-white">
                      {{ washSetting.name }}
                    </h4>
                    <input
                      type="radio"
                      v-model="washSettingId"
                      :id="washSetting.id"
                      :value="washSetting.id"
                    />
                  </div>
                  <div class="pos-relative">
                    <img
                      class="card-img-top img-fluid"
                      src="../assets/Smile.png"
                      style="width:48px;height:50px"
                      alt="Card image cap"
                    />
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
