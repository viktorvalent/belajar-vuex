<template>
  <div class="dashboard">
    <v-row class="justify-center">
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="message in useMarkedMessages"
        :key="message.id"
      >
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ message.name }} ({{ message.email }})
              </div>
              <v-list-item-subtitle>{{ message.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <router-link to="/">
      <v-btn> Home </v-btn>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapState(["messages"]),
    ...mapGetters({ markedMessages: "markedMessages" }),
    useMarkedMessages() {
      return this.markedMessages("#");
    },
  },
  methods: {
    ...mapActions(["getAllMessages"]),
    ...mapMutations({ setToken: "SET_TOKEN" }),
  },
  mounted() {
    this.getAllMessages();
  },
};
</script>