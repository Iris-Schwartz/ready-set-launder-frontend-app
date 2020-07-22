<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <div v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link> |
        <router-link to="/login">Login</router-link> 
      </div>
      <router-link v-if="isLoggedIn()" to="/logout"> Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>

