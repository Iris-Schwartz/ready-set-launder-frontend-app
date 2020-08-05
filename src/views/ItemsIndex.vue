<template>
  <div class="items-index">
    <div class="row">
      <div class="col-lg-12">
        <div class="card product-card mb-4">
          <div class="card-body p-4 pos-relative">
            <h2 class="card-title mb-2">
              Select Items to Wash!
            </h2>
            <hr class="my-3" />
            <form v-on:submit.prevent="updateStatus()">
              <div class="card">
                <h4 class="card-header">
                  <select v-model="categoryFilter">
                    <option value="">All Categories</option>
                    <option
                      v-for="category in categories"
                      :value="category.name"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </h4>
                <ul class="list-group list-group-flush">
                  <div
                    v-for="item in orderBy(
                      filterBy(items, categoryFilter, 'category_name'),
                      'name'
                    )"
                  >
                    <li class="list-group-item">
                      <input
                        type="checkbox"
                        :id="item.id"
                        :value="item.id"
                        v-model="itemIds"
                      />
                      <label :for="item.name">{{ item.name }}</label>
                    </li>
                  </div>
                </ul>
              </div>
              <input type="submit" class="btn btn-primary" value="Done" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      items: [],
      categories: [],
      categoryFilter: "",
      itemIds: [],
    };
  },
  created: function() {
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
    updateStatus: function() {
      var params = {
        item_ids: this.itemIds,
        status: "wash",
      };
      axios.patch("/api/items_status", params).then((response) => {
        console.log(response.data);
        this.$router.push("/items/launder");
      });
    },
  },
};
</script>
