<template>
  <div>
    <h2>Reset Password</h2>
    <form @submit.prevent="handleSubmit()">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" v-model="email" name="email" class="form-control" autocomplete="on"
               :class="{ 'is-invalid': submitted && !email }"/>
        <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
        <span v-if="errors" class="alert alert-danger">{{ errors }}</span>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">Reset Password</button>
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
      const {email} = this;

      if (!(email)) {
        return;
      }

      this.loading = true;

      let credentials = new FormData();
      credentials.append("email", this.email);

      let config = {
        url: '/user/recover-password/link',
        data: credentials
      };

      client()
          .post(config.url, config.data)
          .then(response => {
            console.log(response);
            response.data.success ? alert('Reset password link is send to' + this.email) : alert('Error send link reset password!');
            this.$router.push('/');
          });

      this.loading = false;
    }
  }
}
</script>
