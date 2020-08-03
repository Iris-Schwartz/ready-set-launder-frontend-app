<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <div v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
      <div v-if="isLoggedIn()">
        <router-link to="/items/new">Ready! |</router-link>
        <router-link to="/items">Set! |</router-link>
        <router-link to="/items/launder">Launder! |</router-link>
        <router-link to="/logout">Logout |</router-link>
        <router-link to="/users/me/edit">Account</router-link>
      </div>
    </div> -->

    <!-- ======== @Region: #header ======== -->
    <div id="header">
      <div data-toggle="sticky">
        <!--Header & Branding region-->
        <div class="header">
          <!-- all direct children of the .header-inner element will be vertically aligned with each other you can override all the behaviours using the flexbox utilities (flexbox.html) All elements with .header-brand & .header-block-flex wrappers will automatically be aligned inline & vertically using flexbox, this can be overridden using the flexbox utilities (flexbox.htm) Use .header-block to stack elements within on small screen & "float" on larger screens use .order-first or/and .order-last classes to make an element show first or last within .header-inner or .headr-block elements -->
          <div class="header-inner container">
            <!--branding/logo -->
            <div class="header-brand">
              <a class="header-brand-text" href="index.html" title="Home">
                <h1 class="h2">
                  <span class="header-brand-text-alt">ReadySet</span
                  >Launder<span class="header-brand-text-alt">.</span>
                </h1>
              </a>
              <div class="header-divider d-none d-lg-block"></div>
            </div>
            <!-- other header content -->
            <div class="header-block order-12">
              <!-- mobile collapse menu button - data-toggle="collapse" = default BS menu - data-toggle="off-canvas" = Off-cavnas Menu - data-toggle="overlay" = Overlay Menu -->
              <!-- <a
                href="#top"
                class="btn btn-link btn-icon header-btn float-right d-lg-none"
                data-toggle="off-canvas"
                data-target=".navbar-main"
                data-settings='{"cloneTarget":true, "targetClassExtras": "navbar-offcanvas"}'
              >
                <i class="fa fa-bars"></i>
              </a> -->
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

    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
  },
};
</script>
