<template>
  <div>
    <h2>Registration</h2>
    <form @submit.prevent="handleSubmit()">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" v-model="first_name" name="first_name" class="form-control" autocomplete="on"
               :class="{ 'is-invalid': submitted && !first_name }"/>
        <div v-show="submitted && !first_name" class="invalid-feedback">First Name is required</div>
        <span v-if="errors.first_name" class="alert alert-danger">{{ errors.first_name }}</span>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" v-model="last_name" name="last_name" class="form-control" autocomplete="on"
               :class="{ 'is-invalid': submitted && !last_name }"/>
        <div v-show="submitted && !last_name" class="invalid-feedback">Last Name is required</div>
        <span v-if="errors.last_name" class="alert alert-danger">{{ errors.last_name }}</span>
      </div>
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
        <label for="phone">Phone</label>
        <input type="text" v-model="phone" name="phone" class="form-control" autocomplete="on"
               :class="{ 'is-invalid': submitted && !phone }"/>
        <div v-show="submitted && !phone" class="invalid-feedback">Phone is required</div>
        <span v-if="errors.phone" class="alert alert-danger">{{ errors.phone }}</span>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">Register</button>
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
      first_name: "",
      last_name: "",
      phone: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      errors: ""
    };
  },
  methods: {
    handleSubmit() {

      this.submitted = true;
      const {email, password, last_name, first_name, phone} = this;

      if (!(email || password || last_name || first_name || phone)) {
        return;
      }

      this.loading = true;

      let data = new FormData();
      data.append("email", this.email);
      data.append("password", this.password);
      data.append("first_name", this.first_name);
      data.append("last_name", this.last_name);
      data.append("phone", this.phone);

      let config = {
        url: '/user/register',
        data: data
      };

      client()
          .post(config.url, config.data)
          .then(response => {
            alert(response.data.status)
            this.$router.push('/login')
          })
          .catch(function (error) {
            //ToDo need refactor errors
            this.errors = error.message;
          });

      this.loading = false;
    }
  }
}
</script>
