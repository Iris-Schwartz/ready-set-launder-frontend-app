<template>
  <div class="items-wash">
    <h2>Wash List</h2>
    <div v-for="washSetting in washSettings">
      <h3>{{ washSetting.name }}</h3>
      <div v-for="item in filterBy(items, washSetting.name, 'wash_setting_name')">{{ item.name }}</div>
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
    };
  },
  created: function () {
    axios.get("/api/items").then((response) => {
      console.log(response.data);
      this.items = this.filterBy(response.data, "wash", "status");
    });
    axios.get("/api/wash_settings").then((response) => {
      console.log(response.data);
      this.washSettings = response.data;
    });
  },
};
</script>