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
    <tr >
      <td>

      </td>
      <td>

      </td>
      <td>

      </td>
      <td>

      </td>
      <td>

      </td>
      <td>

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
      title: "",
      phone: "",
      submitted: false,
      loading: false,
      description: "",
      error: "",
      columns: ['ID', 'User ID', 'Title', 'Phone', 'Description', 'Created At', 'Updated At'],
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const {title, phone, description} = this;

      if (!(title || phone || description)) {
        return;
      }

      this.loading = true;

      let data = new FormData();
      data.append("title", this.title);
      data.append("phone", this.phone);
      data.append("description", this.description);

      let config = {
        method: 'post',
        url: '/companies',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: data
      };

      client({ requiresAuth: true })
          .post(config.url, config.data, config.headers)
          .then(response => alert(response.data))
          .catch(error => {
            //ToDo need refactor errors
            this.error = error.message;
          });

      this.loading = false;
    }
  }
};

</script>