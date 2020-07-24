<template>
  <div class="items-index">
    <div class="form-group">
      <input list="titles" class="form-control" v-model="filter">
    </div>
    <datalist id="titles">
      <option v-for="category in categories">{{ category.name }}</option>
    </datalist>
    <div v-for="item in filterBy(items, filter, 'category_name')">
      <h2>{{ item.name }}</h2>
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
      categories: [],
      filter: "",
    };
  },
  created: function () {
    axios.get("api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
    axios.get("api/items").then((response) => {
      console.log(response.data);
      this.items = response.data;
    });
  },
};
</script>

