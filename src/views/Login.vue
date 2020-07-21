<template>
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <div class="form-control">
        <br>
        <label>Email: </label>
        <input type="email" v-model="email">
      </div>
      <div class="form-control">
        <label>Password: </label>
        <input type="password" v-model="password">
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
      email: "",
      password: ""
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios.post("/api/sessions", params).then(response => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        console.log();
        this.$router.push("/home");
      });
    }
  }
};
</script>