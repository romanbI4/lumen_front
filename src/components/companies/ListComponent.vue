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
        {{company.phone}}
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
        <a :href="`/companies/${company.id}`" class="btn"><i class="material-icons">edit</i>
        </a>
        <a href="#" @click="deleteCompany(`${company.id}`);" class="btn"><i class="material-icons">delete</i>
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
      errors: "",
      columns: ['ID', 'User ID', 'Title', 'Phone', 'Description', 'Created At', 'Updated At'],
      companies: []
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
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
            this.errors = error.response.data;
          });

      this.loading = false;
    },
    deleteCompany(id) {
      client({requiresAuth: true})
          .delete(`/user/companies/${id}`)
          .then(response => {
            alert(response.data.status);
            location.reload();
          })
          .catch(error => {
            this.errors = error.response.data;
          });
    }
  }
};

</script>