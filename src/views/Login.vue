<template>
  <v-container>
    <form>
      <v-text-field v-model="form.email" label="Email" required></v-text-field>
      <v-text-field
        v-model="form.password"
        type="password"
        label="Password"
        required
      ></v-text-field>

      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
      <router-link to="register">
        <v-btn> Register </v-btn>
      </router-link>
    </form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(["login"]),
    clear() {
      this.form.email = "";
      this.form.password = "";
    },
    submit() {
      this.login(this.form);
    },
  },
};
</script>