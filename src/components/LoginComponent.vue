<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit()">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" v-model="email" name="email" class="form-control" autocomplete="on"
               :class="{ 'is-invalid': submitted && !email }"/>
        <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
        <span v-if="errors.email" class="alert alert-danger">{{ errors.email }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" autocomplete="current-password" v-model="password" name="password" class="form-control"
               :class="{ 'is-invalid': submitted && !password }"/>
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
        <span v-if="errors.password" class="alert alert-danger">{{ errors.password }}</span>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">Login</button>
        <img v-show="loading"
             src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
      </div>
    </form>
  </div>
</template>

<script>
import client from '../services/axios';

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      errors: "",
      token: ""
    };
  },
  methods: {
    handleSubmit() {

      this.submitted = true;
      const {email, password} = this;

      if (!(email && password)) {
        return;
      }

      this.loading = true;

      let credentials = new FormData();
      credentials.append("email", this.email);
      credentials.append("password", this.password);

      let config = {
        url: '/user/sign-in',
        data: credentials
      };

      client()
          .post(config.url, config.data)
          .then(response => {
            localStorage.setItem("token", response.data.api_token)
            this.$router.push('/companies')
          })
          .catch(error  => {
            //ToDo need refactor errors
            this.errors = error.message
          });

      this.loading = false;
    }
  }
}
</script>
