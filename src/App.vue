<template>
  <div id="app">
    <div id="header">
      <div data-toggle="sticky">
        <!--Header & Branding region-->
        <div class="header">
          <div class="header-inner container">
            <!--branding/logo -->
            <div class="header-brand">
              <router-link class="header-brand-text" to="/" title="Home">
                <h1 class="h2">
                  <span class="header-brand-text-alt"></span
                  >ReadySetLaunder<span class="header-brand-text-alt"></span>
                </h1>
              </router-link>
              <div class="header-divider d-none d-lg-block"></div>
            </div>

            <div class="navbar navbar-expand-md navbar-static-top">
              <!--everything within this div is collapsed on mobile-->
              <div class="navbar-main collapse">
                <!--main navigation-->
                <ul
                  class="nav navbar-nav navbar-nav-stretch float-lg-right dropdown-effect-fade"
                >
                  <div v-if="isLoggedIn()">
                    <li class="nav-item">
                      <router-link to="/items/new" class="nav-link"
                        >Ready</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/items" class="nav-link"
                        >Set</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/items/launder" class="nav-link"
                        >Launder</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/logout" class="nav-link"
                        >Logout</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/users/me/edit" class="nav-link"
                        >Account</router-link
                      >
                    </li>
                  </div>
                  <div v-if="!isLoggedIn()">
                    <li class="nav-item">
                      <router-link to="/signup" class="nav-link"
                        >Signup</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/login" class="nav-link"
                        >Login</router-link
                      >
                    </li>
                  </div>
                </ul>
              </div>
              <!--/.navbar-collapse -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style></style>

<script>
export default {
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
  },
};
</script>
