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
              <tr><th>Version</th><td>0.1.0</td></tr>
              <tr v-if="info.server"><th>Server</th><td>{{ info.server.name }} {{ info.server.version }}</td></tr>
              <tr v-if="info.server"><th>Author</th><td>{{ info.server.author }}</td></tr>
              <tr v-if="info.server"><th>Copyright</th><td>{{ info.server.copyright }}</td></tr>
            </table>
          </div>
          <hr />

          <h3>{{ $t('policy.title') }}</h3>
          <p>{{ $t('policy.privacy.intro') }}</p>

          <h4>{{ $t('policy.privacy.responsible') }}</h4>
          <blockquote>Schilling, Alexander
          <br />Mühlstraße 13
          <br />D-72805 Lichtenstein
          <br />
          <br />info@alinex.de</blockquote>

          <h4>{{ $t('policy.data.title') }}</h4>
          <p>{{ $t('policy.data.intro') }}</p>
          <ul>
            <li>{{ $t('policy.data.list.0') }}</li>
            <li>{{ $t('policy.data.list.1') }}</li>
            <li>{{ $t('policy.data.list.2') }}</li>
            <li>{{ $t('policy.data.list.3') }}</li>
            <li>{{ $t('policy.data.list.4') }}</li>
          </ul>

          <h4>{{ $t('policy.purpose.title') }}</h4>
          <ul>
            <li>{{ $t('policy.purpose.list.0') }}</li>
            <li>{{ $t('policy.purpose.list.1') }}</li>
            <li>{{ $t('policy.purpose.list.2') }}</li>
            <li>{{ $t('policy.purpose.list.3') }}</li>
          </ul>

          <h4>{{ $t('policy.persons.title') }}</h4>
          <ul>
            <li>{{ $t('policy.persons.list.0') }}</li>
          </ul>

          <h4>{{ $t('policy.terms.title') }}</h4>
          <p>{{ $t('policy.terms.list.0') }}</p>
          <p>{{ $t('policy.terms.list.1') }}</p>
          <p>{{ $t('policy.terms.list.2') }}</p>
          <p>{{ $t('policy.terms.list.3') }}</p>

          <h4>{{ $t('policy.legal.title') }}</h4>
          <p>{{ $t('policy.legal.text') }}</p>

          <h4>{{ $t('policy.update.title') }}</h4>
          <p>{{ $t('policy.update.text') }}</p>

          <h4>{{ $t('policy.thirdparty.title') }}</h4>
          <p>{{ $t('policy.thirdparty.text.0') }}</p>
          <p>{{ $t('policy.thirdparty.text.1') }}</p>

          <h4>{{ $t('policy.rights.title') }}</h4>
          <p>{{ $t('policy.rights.text.0') }}</p>
          <p>{{ $t('policy.rights.text.1') }}</p>
          <p>{{ $t('policy.rights.text.2') }}</p>
          <p>{{ $t('policy.rights.text.3') }}</p>

          <h4>{{ $t('policy.cookies.title') }}</h4>
          <p>{{ $t('policy.cookies.text.0') }}</p>
          <p>{{ $t('policy.cookies.text.1') }}</p>

          <h4>{{ $t('policy.hosting.title') }}</h4>
          <p>{{ $t('policy.hosting.text.0') }}</p>
          <p>{{ $t('policy.hosting.text.1') }}</p>
          <p>{{ $t('policy.hosting.text.2') }}</p>

          <h4>{{ $t('policy.register.title') }}</h4>
          <p>{{ $t('policy.register.text.0') }}</p>
          <p>{{ $t('policy.register.text.1') }}</p>

          <h4>{{ $t('policy.contact.title') }}</h4>
          <p>{{ $t('policy.contact.text') }}</p>

          <h4>{{ $t('policy.gravatar.title') }}</h4>
          <p>{{ $t('policy.gravatar.text.0') }}</p>
          <p>{{ $t('policy.gravatar.text.1') }}</p>
          <p>{{ $t('policy.gravatar.text.2') }}</p>
          <p>{{ $t('policy.gravatar.text.3') }}</p>
          <p>{{ $t('policy.gravatar.text.4') }}</p>
          <p>{{ $t('policy.gravatar.text.5') }}</p>

          <h4>{{ $t('policy.delete.title') }}</h4>
          <p>{{ $t('policy.delete.text') }}</p>

          <h4>{{ $t('policy.logs.title') }}</h4>
          <p>{{ $t('policy.logs.text.0') }}</p>
          <p>{{ $t('policy.logs.text.1') }}</p>
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
            <tr v-if="info.server"><td>Name</td><td>{{ info.server.name }}</td></tr>
            <tr v-if="info.server"><td>Version</td><td>{{ info.server.version }}</td></tr>
            <tr v-if="info.node"><th colspan="2">Process</th></tr>
            <tr v-if="info.node"><td>Process ID</td><td>{{ info.node.processid }}</td></tr>
            <tr v-if="info.host"><td>Running as</td><td>{{ info.host.user }} ({{ info.host.userid }})</td></tr>
            <tr v-if="info.node"><td>Directory</td><td>{{ info.node.workingdirectory }}</td></tr>
            <tr v-if="info.node"><td>Process ID</td><td>{{ info.node.processid }}</td></tr>
            <tr v-if="info.node"><td>Uptime</td><td>since {{ processUptime }}</td></tr>
            <tr v-if="info.ode"><td>CPU Usage</td><td>{{ Math.round(info.node.cpuusage*10)/10 }}%</td></tr>
            <tr v-if="info.ode"><td>Memory RSS</td><td>{{ Math.round(info.node.memoryrss/1024/1024*10)/10 }} MB</td></tr>
            <!--<tr><td>Memory VIRT</td><td>{{ Math.round(info.node.memoryvirt/1024/1024*10)/10 }} MB</td></tr>-->
            <tr v-if="info.node"><td>Event Loop Lag</td><td>{{ info.node.eventlooplag }}</td></tr>
            <tr v-if="info.mongo"><th colspan="2">Storage</th></tr>
            <tr v-if="info.mongo"><td>Mongo DB</td><td>{{ info.mongo.server }}</td></tr>
            <tr v-if="info.mongo"><td>Version</td><td>{{ info.mongo.version }}</td></tr>
          </table>
          <p v-if="!info.server">No more information without server connection!</p>
        </q-tab-pane>

        <!-- Host -->
        <q-tab-pane name="tab-host">
          <table class="data-groups" v-if="!loading && info.host">
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
          <p v-if="!info.server">No more information without server connection!</p>
        </q-tab-pane>

        <!-- Detail -->
        <q-tab-pane name="tab-detail">
          <q-table class="q-mt-xl"
            v-if="info.server"
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
          <p v-if="!info.server">No more information without server connection!</p>
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

h4
  font-size: 18px
  margin-bottom: 6px
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
