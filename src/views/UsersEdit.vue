<template>
  <div class="users-edit">
    <h2>User Information</h2>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <form v-on:submit.prevent="editUser()">
      <label>Username: </label>
      <input type="text" v-model="user.username">
      <label>Email: </label>
      <input type="email" v-model="user.email">
      <input type="submit" class="btn btn-primary" value="Update">  
    </form>

    <button v-on:click="destroyUser()">Delete Account</button>
    
    <h2>Clothing Inventory</h2>
    <select v-model="categoryFilter">
      <option value="">All Categories</option>
      <option v-for="category in categories" :value="category.name">{{ category.name }}</option>
    </select>
    <div v-for="(item, itemIndex) in orderBy(filterBy(items, categoryFilter, 'category_name'), 'name')">
      {{ item.name }}
      <button type="button" data-toggle="modal" data-target="#editItemModal" v-on:click="setCurrentItem(itemIndex)">
        Edit
      </button>
      <button v-on:click="destroyItem(item)">Delete</button>
      <div class="modal fade" id="editItemModal" tabindex="-1" role="dialog" aria-labelledby="editItemModalLabel"aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editItemModalLabel">Edit Item</h5>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="editItem(item)">
                <div class="form-group">
                  <label>Name: </label>
                  <input type="text" class="form-control" v-model="currentItem.name">
                </div>
                <input type="submit" class="btn btn-primary close" value="Update" data-dismiss="modal" aria-label="Close">
              </form>
            </div>
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
  data: function () {
    return {
      user: {},
      errors: [],
      items: [],
      categories: [],
      categoryFilter: "",
      currentItem: {},
    };
  },
  created: function () {
    axios.get("/api/users/me").then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
    axios.get("/api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
    axios.get("/api/items").then((response) => {
      console.log(response.data);
      this.items = response.data;
    });
  },
  methods: {
    editUser: function () {
      var params = {
        username: this.user.username,
        email: this.user.email,
      };
      axios.patch("/api/users/me", params).then((response) => {
        console.log(response.data);
        this.$router.push("/");
      });
    },
    destroyUser: function () {
      axios.delete("/api/users/me").then((response) => {
        console.log("User destroyed!");
        this.$router.push("/");
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
    editItem: function (item) {
      var params = {
        name: this.item.name,
      };
      axios.patch(`/api/items/${this.item.id}`, params).then((response) => {
        console.log(response.data);
      });
    },
    setCurrentItem: function (index) {
      this.currentItem = this.items[index];
      console.log(this.currentItem);
    },
  },
};
</script>