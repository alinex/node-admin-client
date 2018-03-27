<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('goHome')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="info" />
    </q-breadcrumbs>

    <q-tabs inverted>
      <q-tab default slot="title"
        name="tab-about" icon="info outline" label="About" hide="label" />
      <q-tab slot="title"
        name="tab-2" icon="mdi-monitor" label="Client" hide="label" />
      <q-tab slot="title" name="tab-3" icon="mdi-apps" label="Application" hide="label" />
      <q-tab slot="title" name="tab-4" icon="mdi-server" label="Server" hide="label" />
      <q-tab slot="title" name="tab-5" icon="mdi-package-variant" label="Dependency" hide="label" />

      <!-- About -->
      <q-tab-pane name="tab-about">
        <div class="row items-center">
          <img src="~assets/alinex.png" class="float-left q-ma-md" />
          <h1 class="q-ma-none">{{ $t('title') }}</h1>
        </div>
        <div class="row q-mt-md">
          <p>The administration panel is an easy and fast way to manage IT systems for technical and non technical staff.</p>
          <p>It is a universal control interface which can become real powerful by adding modules for special tasks. This modules will interact with the real systems in a proper and safe way. The user has no direct control but the limited functionality like defined in the module.</p>
        </div>
        <hr />
        <div class="col q-mt-md" v-if="!loading">
          <p>Version: 0.1.0<br />
          Server: {{ info.app.name }} {{ info.app.version }}</p>
        </div>
        <q-inner-loading :visible="loading">
          <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
        </q-inner-loading>
      </q-tab-pane>

      <q-tab-pane name="tab-2">Tab Two</q-tab-pane>
      <q-tab-pane name="tab-3">Tab Three</q-tab-pane>
      <q-tab-pane name="tab-4">Tab Four</q-tab-pane>
      <q-tab-pane name="tab-5">Tab Five</q-tab-pane>
    </q-tabs>

    <q-table class="q-mt-xl"
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
    info: {},
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
      data.push({ group: 'client', name: 'api', value: process.env.API })
      this.tableData = data.map((e) => {
        if (Array.isArray(e.value)) {
          e.value = e.value.join('\n')
        }
        return e
      })
      for (const row of this.tableData) {
        if (!this.info[row.group]) this.info[row.group] = {}
        this.info[row.group][row.name] = row.value
      }
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
