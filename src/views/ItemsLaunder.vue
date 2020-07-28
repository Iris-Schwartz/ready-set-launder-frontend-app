<template>
  <div class="items-launder">
    <h2>Wash List</h2>
    <div v-for="washSetting in washSettings">
      <h3>{{ washSetting.name }}</h3>
      <div v-for="item in filterBy(itemsWash, washSetting.name, 'wash_setting_name')">
        {{ item.name }}
      </div>
    </div>

    <br> 
  
    <h2>Dry List</h2>
    <div v-for="drySetting in drySettings">
      <h3>{{ drySetting.name }}</h3>
      <div v-for="item in filterBy(itemsDry, drySetting.name, 'dry_setting_name')">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      items: [],
      washSettings: [],
      drySettings: [],
      itemsWash: [],
      itemsDry: [],
    };
  },
  created: function () {
    axios.get("/api/items").then((response) => {
      console.log(response.data);
      this.itemsWash = this.filterBy(response.data, "wash", "status");
      this.itemsDry = this.filterBy(response.data, "dry", "status");
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
};
</script> 