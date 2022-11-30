<template>
  <table class="table">
    <thead>
    <tr>
      <th v-for="column in columns" :key="column.id">
        {{column}}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="company in companies" :key="company.id">
      <td>
        {{company.id}}
      </td>
      <td>
        {{company.user_id}}
      </td>
      <td>
        {{company.title}}
      </td>
      <td>
        {{company.description}}
      </td>
      <td>
        {{company.created_at}}
      </td>
      <td>
        {{company.updated_at}}
      </td>
      <td>
        <a href="#!" @click="restore(index)" class="btn"><i class="material-icons">restore</i>
        </a>
        <a href="#!" @click="deplete(index)" class="btn"><i class="material-icons">delete</i>
        </a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import client from '../../services/axios';

export default {
  data() {
    return {
      loading: false,
      error: "",
      columns: ['ID', 'User ID', 'Title', 'Phone', 'Description', 'Created At', 'Updated At'],
      companies: []
    };
  },
  mounted() {
      this.loading = true;

      let config = {
        url: '/user/companies',
      };

      client({ requiresAuth: true })
          .get(config.url)
          .then(response => {
            this.companies = response.data.data
          })
          .catch(error => {
            //ToDo need refactor errors
            this.error = error.message;
          });

      this.loading = false;
  }
};

</script>