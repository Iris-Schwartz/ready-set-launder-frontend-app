<template>
  <div class="login">
    <div id="content">
      <div class="container">
        <form class="form-login form-wrapper form-medium" v-on:submit.prevent="submit()" role="form">
          <h3 class="title-divider">
            <span>Login</span>
          </h3>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label class="sr-only" for="signup-email-page">Email</label>
            <input
              type="text"
              class="form-control"
              id="signup-email-page"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label class="sr-only" for="signup-password-page">Password</label>
            <input
              type="password"
              class="form-control"
              id="signup-password-page"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
      </div>
    </div>
  </div>
</div>

    <!-- <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Email: </label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password: </label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form> -->
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      errors: [],
      email: "",
      password: "",
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
