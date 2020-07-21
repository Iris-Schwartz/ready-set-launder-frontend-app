<template>
  <div class="signup">
    <ul>
      <li v-for="error in errors"> {{ error }} </li>
    </ul>
    <form v-on:submit.prevent="submit()">
      <div class="form-group">
        <label>Username: </label>
        <input type="text" v-model="username">
      </div>
      <div class="form-group">
        <label>Email: </label>
        <input type="email" v-model="email">
      </div>
      <div class="form-group">
        <label>Password: </label>
        <input type="password" v-model="password">
      </div>
      <div class="form-group">
        <label>Password Confirmation: </label>
        <input type="password" v-model="passwordConfirmation">
      </div>
      <button v-on:click="submit()">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      errors: [],
      username: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          console.log("New user created!", response.data);
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>







  