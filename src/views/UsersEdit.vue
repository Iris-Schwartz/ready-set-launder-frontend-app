<template>
  <div class="users-edit">
    <h2>User Information</h2>
    <ul>
      <li v-for="error in errors" class="text-danger">{{ error }}</li>
    </ul>

    <form v-on:submit.prevent="editUser()">
      <label>Username: </label>
      <input type="text" v-model="user.username" />
      <label>Email: </label>
      <input type="email" v-model="user.email" />
      <input type="submit" class="btn btn-primary" value="Update" />
    </form>

    <button v-on:click="destroyUser()">Delete Account</button>

    <h2>Clothing Inventory</h2>
    <select v-model="categoryFilter">
      <option value="">All Categories</option>
      <option v-for="category in categories" :value="category.name">{{
        category.name
      }}</option>
    </select>
    <div
      v-for="item in orderBy(
        filterBy(items, categoryFilter, 'category_name'),
        'name'
      )"
    >
      {{ item.name }}
      <form v-on:submit.prevent="editItem(item)">
        <div class="form-group">
          <label>Name: </label>
          <input type="text" class="form-control" v-model="item.name" />
        </div>
        <input type="submit" value="Update" />
      </form>
      <button v-on:click="destroyItem(item)">Delete</button>
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
      user: {},
      errors: [],
      items: [],
      categories: [],
      categoryFilter: "",
      currentItem: {},
    };
  },
  created: function() {
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
    editUser: function() {
      var params = {
        username: this.user.username,
        email: this.user.email,
      };
      axios
        .patch("/api/users/me", params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete("/api/users/me").then((response) => {
          console.log(response.data);
          localStorage.removeItem("jwt");
          this.$router.push("/");
        });
      }
    },
    destroyItem: function(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        axios.delete(`/api/items/${item.id}`).then((response) => {
          console.log(response.data);
          var index = this.items.indexOf(item);
          this.items.splice(index, 1);
        });
      }
    },
    editItem: function(item) {
      var params = {
        name: item.name,
      };
      axios
        .patch(`/api/items/${item.id}`, params)
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
