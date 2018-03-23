<template>
  <q-page class="q-ma-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('goHome')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t('core.users.title')" icon="account box" />
    </q-breadcrumbs>

    <q-table
      :data="tableData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :loading="loading"
      :pagination.sync="pagination"
    >
      <template slot="top-left" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
          class="col-6"
        />
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
      </template>
      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn
          round dense size="sm" icon="undo" color="secondary" class="q-mr-sm"
          :disable="props.isFirstPage"
          @click="props.prevPage"
        />
        <div class="q-mr-sm" style="font-size: small">
          Page {{ props.pagination.page }} / {{ props.pagesNumber }}
        </div>
        <q-btn
          round dense size="sm" icon="redo" color="secondary"
          :disable="props.isLastPage"
          @click="props.nextPage"
        />
      </div>
    </q-table>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data: () => ({
    columns: [
      {
        name: 'name',
        label: 'Name',
        field: '_id',
        align: 'left'
      },
      {
        name: 'email',
        label: 'Email',
        field: 'email',
        align: 'left'
      }
    ],
    tableData: [],
    loading: true,
    pagination: {
      rowsPerPage: 7
    },
    filter: ''
  }),
  async created () {
    try {
      const response = await this.$feathers.service('users').find()
      console.log(response)
      this.tableData = response.data
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
.q-table tbody td
  white-space: pre-wrap
</style>
