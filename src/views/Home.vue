<template>
  <v-container>
    <form>
      <v-text-field v-model="form.name" label="Name" required></v-text-field>
      <v-text-field v-model="form.email" label="E-mail" required></v-text-field>
      <v-textarea
        v-model="form.text"
        filled
        label="Message"
        auto-grow
        required
        value=""
      ></v-textarea>

      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
      <router-link to="messages">
        <v-btn> Result </v-btn>
      </router-link>
    </form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    form: {
      name: "",
      email: "",
      text: "",
    },
  }),
  methods: {
    ...mapActions(["postMessage"]),
    submit() {
      this.postMessage(this.form);
    },
    clear() {
      this.form.name = "";
      this.form.email = "";
      this.form.text = "";
    },
  },
};
</script>