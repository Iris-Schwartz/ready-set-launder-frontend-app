<template>
<div class="users-edit">
  <h2>Account Information</h2>
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
</div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/api/users/me").then((response) => {
      console.log(response.data);
      this.user = response.data;
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
  },
};
</script>