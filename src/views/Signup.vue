<template>
  <div class="signup">
    <div id="content">
      <div class="container">
        <form
          class="form-login form-wrapper form-medium"
          v-on:submit.prevent="submit()"
          role="form"
        >
          <h3 class="title-divider">
            <span>Sign Up</span>
          </h3>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label class="sr-only" for="signup-username-page">Username</label>
            <input
              type="text"
              class="form-control"
              id="signup-username-page"
              placeholder="Username"
              v-model="username"
            />
          </div>
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
          <div class="form-group">
            <label class="sr-only" for="signup-password-confirmation-page"
              >Password Confirmation</label
            >
            <input
              type="password"
              class="form-control"
              id="signup-password-confirmation-page"
              placeholder="Password Confirmation"
              v-model="passwordConfirmation"
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Submit" />
        </form>
      </div>
    </div>
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
      passwordConfirmation: "",
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log("New user created!", response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
