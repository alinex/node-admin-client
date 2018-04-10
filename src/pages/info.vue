<template>
  <q-page class="q-pa-lg">

    <q-breadcrumbs class="q-mb-lg">
      <q-breadcrumbs-el :label="$t('home.title')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t(`${$route.meta.module}.title`)" icon="info" />
    </q-breadcrumbs>

    <q-tabs inverted>
      <q-tab default slot="title" name="tab-about" icon="info outline" label="About" hide="label" />
      <q-tab slot="title" name="tab-client" icon="mdi-monitor" label="Client" hide="label" />
      <q-tab slot="title" name="tab-server" icon="mdi-apps" label="Server" hide="label" />
      <q-tab slot="title" name="tab-host" icon="mdi-server" label="Host" hide="label" />
      <q-tab slot="title" name="tab-detail" icon="mdi-package-variant" label="Details" hide="label" />

      <ax-loader :loading="loading">
        <!-- About -->
        <q-tab-pane name="tab-about">
          <div class="row items-center">
            <img src="~assets/alinex.png" class="float-left q-ma-md" />
            <h1 class="q-ma-none">{{ $t('title') }}</h1>
          </div>
          <div class="row q-mt-md">
            <p>{{ $t('core.info.about1') }}</p>
            <p>{{ $t('core.info.about2') }}</p>
          </div>
          <hr />
          <div class="col q-mt-md" v-if="!loading">
            <table class="data">
              <tr><th>Version:</th><td>0.1.0</td></tr>
              <tr><th>Server:</th><td>{{ info.server.name }} {{ info.server.version }}</td></tr>
              <tr><th>Author:</th><td>{{ info.server.author }}</td></tr>
              <tr><th>Copyright:</th><td>{{ info.server.copyright }}</td></tr>
            </table>
          </div>
        </q-tab-pane>

        <!-- Client -->
        <q-tab-pane name="tab-client">
          <table class="data-groups">
            <tr><th colspan="2">Browser</th></tr>
            <tr><td>Name</td><td>{{ $q.platform.is.name }}</td></tr>
            <tr><td>Version</td><td>{{ $q.platform.is.version }}</td></tr>
            <tr><td>Platform</td><td>{{ $q.platform.is.platform }}</td></tr>
            <tr><td>Touch</td><td>{{ $q.platform.has.touch }}</td></tr>
            <tr><th colspan="2">Application</th></tr>
            <tr><td>Quasar Version</td><td>{{ $q.version }}</td></tr>
            <tr><td>Theme</td><td>{{ $q.theme }}</td></tr>
          </table>
        </q-tab-pane>

        <!-- Server -->
        <q-tab-pane name="tab-server">
          <table class="data-groups" v-if="!loading">
            <tr><th colspan="2">Connection</th></tr>
            <tr><td>API</td><td>{{ api }}</td></tr>
            <tr><td>Name</td><td>{{ info.server.name }}</td></tr>
            <tr><td>Version</td><td>{{ info.server.version }}</td></tr>
            <tr><th colspan="2">Process</th></tr>
            <tr><td>Process ID</td><td>{{ info.node.processid }}</td></tr>
            <tr><td>Running as</td><td>{{ info.host.user }} ({{ info.host.userid }})</td></tr>
            <tr><td>Directory</td><td>{{ info.node.workingdirectory }}</td></tr>
            <tr><td>Process ID</td><td>{{ info.node.processid }}</td></tr>
            <tr><td>Uptime</td><td>since {{ processUptime }}</td></tr>
            <tr><td>CPU Usage</td><td>{{ Math.round(info.node.cpuusage*10)/10 }}%</td></tr>
            <tr><td>Memory RSS</td><td>{{ Math.round(info.node.memoryrss/1024/1024*10)/10 }} MB</td></tr>
            <!--<tr><td>Memory VIRT</td><td>{{ Math.round(info.node.memoryvirt/1024/1024*10)/10 }} MB</td></tr>-->
            <tr><td>Event Loop Lag</td><td>{{ info.node.eventlooplag }}</td></tr>
          </table>
        </q-tab-pane>

        <!-- Host -->
        <q-tab-pane name="tab-host">
          <table class="data-groups" v-if="!loading">
            <tr><th colspan="2">Hardware</th></tr>
            <tr><td>CPU</td><td>{{ info.host.cputype }}<br />
              {{ info.host.cpucores }} cores {{ info.host.architecture }} running at {{ info.host.cpuspeed/1000 }}GHz</td></tr>
            <tr><td>Load</td><td>{{ cpuload[0] }} short<br />
              {{ cpuload[1] }} medium<br />
              {{ cpuload[2] }} long</td></tr>
            <tr><td>Memory</td><td>{{ memory[1] }} / {{ memory[0] }} GB free</td></tr>
            <tr><td>Uptime</td><td>since {{ uptime }}</td></tr>
            <tr><td>Network</td><td><span v-for="net in info.host.network.split(/\n/)" :key="net">{{net}}<br /></span></td></tr>
            <tr><th colspan="2">Setup</th></tr>
            <tr><td>Hostname</td><td>{{ info.host.hostname }}</td></tr>
            <tr><td>Platform</td><td>{{ info.host.platform }}</td></tr>
            <tr><td>Release</td><td>{{ info.host.release }}</td></tr>
            <tr><td>Node Version</td><td>{{ info.node.nodeversion }}</td></tr>
            <tr><td>V8 Version</td><td>{{ info.node.v8version }}</td></tr>
          </table>
        </q-tab-pane>

        <!-- Dependencies -->
        <q-tab-pane name="tab-detail">
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
        </q-tab-pane>
      </ax-loader>
    </q-tabs>
  </q-page>
</template>

<style lang="stylus" scoped>
table.data
  th
    text-align: left
    vertical-align: top

table.data-groups
  th
    text-align: left
    padding-top: 10px
    vertical-align: top
  td
    vertical-align: top
  tr:first-child
    th
      padding-top: 0

.q-table tbody td
  white-space: pre-wrap
</style>

<script>
import moment from 'moment'
import axLoader from '../components/axLoader'

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
  computed: {
    api () {
      return process.env.API
    },
    cpuload () {
      return this.info.host.cpuload.split(/\s/).map((e) => Math.round(e * 10) / 10)
    },
    memory () {
      return [
        Math.round(this.info.host.memorytotal / 1024 / 1024 / 1024),
        Math.round(this.info.host.memoryfree / 1024 / 1024 / 1024 * 10) / 10
      ]
    },
    uptime () {
      return moment(Date.now() - this.info.host.uptime * 1000).fromNow()
    },
    processUptime () {
      return moment(Date.now() - this.info.node.processuptime * 1000).fromNow()
    }
  },
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
        this.info[row.group][row.name.replace(/\s|\(.*?\)/g, '')] = row.value
      }
    } catch (error) {
      console.error(error.message)
      this.$q.notify('ERROR: ' + error.message + '. Check server connection.')
    } finally {
      this.loading = false
    }
  },
  components: { axLoader }
}
</script>
