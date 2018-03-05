<template>
  <q-page padding>
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
        name: 'group',
        label: 'Group',
        field: 'group',
        align: 'left'
      },
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left'
      },
      {
        name: 'value',
        label: 'Value',
        field: 'value',
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
      const data = await this.$feathers.service('info').find()
      data.push({ group: 'client', name: 'name', value: this.$q.platform.is.name })
      data.push({ group: 'client', name: 'version', value: this.$q.platform.is.version })
      data.push({ group: 'client', name: 'platform', value: this.$q.platform.is.platform })
      data.push({ group: 'client', name: 'touch', value: this.$q.platform.has.touch })
      data.push({ group: 'client', name: 'quasar', value: this.$q.version })
      data.push({ group: 'client', name: 'theme', value: this.$q.theme })
      this.tableData = data.map((e) => {
        if (Array.isArray(e.value)) {
          e.value = e.value.join('\n')
        }
        return e
      })
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style>
.q-table tbody td {
  white-space: pre-wrap;
}
</style>
