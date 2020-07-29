<template>
  <div class="items-launder">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2>Wash List</h2>
          {{ itemIdsForDry }}
          {{ itemsWash }}
          <form v-on:submit.prevent="updateStatusToDry()">
            <div v-for="washSetting in washSettings">
              <h3>{{ washSetting.name }}</h3>
              <div v-for="item in filterBy(itemsWash, washSetting.name, 'wash_setting_name')">
                <input type="checkbox" :id="item.id" :value="item.id" v-model="itemIdsForDry">
                <label :for="item.name">{{ item.name }} {{ item.status }} </label>
              </div>
            </div>
            <input type="submit" class="bt btn-primary" value="Submit">
          </form>
        </div>
        <div class="col">
          <h2>Dry List</h2>
          {{ itemIdsDone }}
           <form v-on:submit.prevent="updateStatusToCreated()">
            <div v-for="drySetting in drySettings">
              <h3>{{ drySetting.name }}</h3>
              <div v-for="item in filterBy(itemsDry, drySetting.name, 'dry_setting_name')">
                <input type="checkbox" :id="item.id" :value="item.id" v-model="itemIdsDone" >
                <label :for="item.name">{{ item.name }} {{ item.status }}</label>
              </div>
            </div>
            <input type="submit" class="bt btn-primary" value="Submit">
          </form>
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
      items: [],
      washSettings: [],
      drySettings: [],
      itemsWash: [],
      itemsDry: [],
      itemIdsForDry: [],
      itemIdsDone: [],
    };
  },
  created: function () {
    axios.get("/api/items").then((response) => {
      this.itemsWash = this.filterBy(response.data, "wash", "status");
      this.itemsDry = this.filterBy(response.data, "dry", "status");
    });
    axios.get("/api/wash_settings").then((response) => {
      this.washSettings = response.data;
    });
    axios.get("/api/dry_settings").then((response) => {
      this.drySettings = response.data;
    });
  },
  methods: {
    updateStatusToDry: function () {
      var params = {
        item_ids: this.itemIdsForDry,
        status: "dry",
      };
      axios.patch("/api/items_status", params).then((response) => {
        this.itemIdsForDry.forEach((itemId) => {
          var item = this.itemsWash.find((item) => item.id == itemId);
          item.status = "dry";
          var index = this.itemsWash.indexOf(item);
          this.itemsWash.splice(index, 1);
          this.itemsDry.push(item);
        });
      });
    },
    updateStatusToCreated: function () {
      var params = {
        item_ids: this.itemIdsDone,
        status: "created",
      };
      axios.patch("/api/items_status", params).then((response) => {
        this.itemIdsDone.forEach((itemId) => {
          var item = this.itemsDry.find((item) => item.id === itemId);
          var index = this.itemsDry.indexOf(item);
          this.itemsDry.splice(index, 1);
          this.$router.push("/items");
        });
      });
    },
  },
};
</script>