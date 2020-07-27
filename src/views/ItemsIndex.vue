<template>
  <div class="items-index">
    <h2>Select Items to Wash!</h2>
    <div class="form-group">
      <select v-model="categoryFilter">
        <option value="">All Categories</option>
        <option v-for="category in categories" :value="category.name">{{ category.name }}</option>
      </select>
    </div>
    <div v-for="item in filterBy(items, categoryFilter, 'category_name')">
      <input type="checkbox" :id="item.id" :value="item.id" v-model="itemIds">
      <label :for="item.name">{{ item.name }} {{ item.status }} </label>
      <button v-on:click="destroyItem(item)">Delete</button> 
    </div>
    <br>
    <br>
    <button v-on:click="updateStatus()">Submit</button>
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
      categoryFilter: "",
      itemIds: [],
    };
  },
  created: function () {
    axios.get("/api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
    axios.get("/api/items").then((response) => {
      console.log(response.data);
      this.items = this.filterBy(response.data, "created", "status");
    });
  },
  methods: {
    updateStatus: function () {
      var params = {
        item_ids: this.itemIds,
        status: "wash",
      };
      axios.patch("/api/items_status", params).then((response) => {
        console.log(response.data);
      });
    },
    destroyItem: function (item) {
      if (confirm("Are you sure you want to delete this item?")) {
        axios.delete(`/api/items/${item.id}`).then((response) => {
          console.log("Successfully destroyed", response.data);
          var index = this.items.indexOf(item);
          this.items.splice(index, 1);
        });
      }
    },
  },
};
</script>