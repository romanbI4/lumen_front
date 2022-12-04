<template>
  <div>
    <h2>Edit company</h2>
    <form @submit.prevent="handleSubmit()">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" v-model="title" name="title" class="form-control" autocomplete="on"
               :class="{ 'is-invalid': submitted && !title }"/>
        <div v-show="submitted && !title" class="invalid-feedback">Title is required</div>
        <span v-if="errors.title" class="alert alert-danger">{{ errors.title }}</span>
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" v-model="phone" name="phone" class="form-control" autocomplete="on"
               :class="{ 'is-invalid': submitted && !phone }"/>
        <div v-show="submitted && !phone" class="invalid-feedback">Phone is required</div>
        <span v-if="errors.phone" class="alert alert-danger">{{ errors.phone }}</span>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" v-model="description" name="description" class="form-control" autocomplete="on"
               :class="{ 'is-invalid': submitted && !description }"/>
        <div v-show="submitted && !description" class="invalid-feedback">Description is required</div>
        <span v-if="errors.description" class="alert alert-danger">{{ errors.description }}</span>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">Edit</button>
        <img v-show="loading"
             src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
      </div>
    </form>
  </div>
</template>

<script>
import client from '../../services/axios';

export default {
  data() {
    return {
      title: "",
      phone: "",
      submitted: false,
      loading: false,
      description: "",
      errors: "",
      data: []
    };
  },
  mounted() {
    this.getCompanyById();
  },
  methods: {
    getCompanyById() {
      client({requiresAuth: true})
          .get(`/user/companies/${this.$route.params.id}`)
          .then(response => {
            //ToDo need refactor
            this.title = response.data.data.title;
            this.phone = response.data.data.phone;
            this.description = response.data.data.description;
          })
          .catch(error => {
            this.errors = error.message;
          });
    },
    handleSubmit() {
      this.submitted = true;
      const {title, phone, description} = this;

      if (!(title || phone || description)) {
        return;
      }

      this.loading = true;

      this.data = {
        'title': this.$data.title,
        'phone': this.$data.phone,
        'description': this.$data.description,
      };

      let config = {
        url: `/user/companies/${this.$route.params.id}`,
        data: this.data
      }

      client({requiresAuth: true})
          .put(config.url, config.data)
          .then(response => {
            alert(response.data.status);
            this.$router.push('/companies');
          })
          .catch(error => {
            this.errors = error.response.data;
          });

      this.loading = false;
    }
  }
};

</script>