<!-- :value="counters.users" -->
<!-- :sub-text="counters.users" -->
<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="danger"
          icon="mdi-calendar"
          title="Sin Datos"
          :value="counters && counters.users ? counters.users : 0"
          animated-number
          :with-formatter="false"
          :progress="finding"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters && counters.users ? counters.users : ''"
        >
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                :to="
                  localePath({
                    name: 'contractors',
                    query: {
                      doesnt_have_data: 'true',
                    },
                  })
                "
                v-on="on"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.View') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getCounters"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
          <v-menu>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-1"
                    color="primary"
                    light
                    icon
                    x-small
                    v-on="{ ...menu, ...tooltip }"
                  >
                    <v-icon>mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('buttons.Help') }}</span>
              </v-tooltip>
            </template>
            <v-card max-width="250">
              <v-card-title class="title">
                <v-icon left>mdi-help-circle-outline</v-icon>
                Sin Datos
              </v-card-title>
              <v-card-text class="caption">
                Contratistas pendientes de actualizar sus datos personales.
              </v-card-text>
            </v-card>
          </v-menu>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-file-cloud-outline"
          title="Secop"
          :value="counters.secop"
          animated-number
          :with-formatter="false"
          :progress="finding"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.secop"
        >
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getCounters"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
          <v-menu>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-1"
                    color="primary"
                    light
                    icon
                    x-small
                    v-on="{ ...menu, ...tooltip }"
                  >
                    <v-icon>mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('buttons.Help') }}</span>
              </v-tooltip>
            </template>
            <v-card max-width="250">
              <v-card-title class="title">
                <v-icon left>mdi-help-circle-outline</v-icon>
                Secop
              </v-card-title>
              <v-card-text class="caption">
                Usuarios que cuentan con pantallazo de SECOP
              </v-card-text>
            </v-card>
          </v-menu>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="warning"
          icon="mdi-printer"
          title="ARL"
          :value="counters.arl"
          animated-number
          :with-formatter="false"
          :progress="finding"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.arl"
        >
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getCounters"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
          <v-menu>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-1"
                    color="primary"
                    light
                    icon
                    x-small
                    v-on="{ ...menu, ...tooltip }"
                  >
                    <v-icon>mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('buttons.Help') }}</span>
              </v-tooltip>
            </template>
            <v-card max-width="250">
              <v-card-title class="title">
                <v-icon left>mdi-help-circle-outline</v-icon>
                ARL
              </v-card-title>
              <v-card-text class="caption">
                Usuarios que cuentan con ARL
              </v-card-text>
            </v-card>
          </v-menu>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="success"
          icon="mdi-clipboard-check"
          title="Contratistas"
          :value="counters.total"
          animated-number
          :with-formatter="false"
          :progress="finding"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.total"
        >
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getCounters"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
          <v-menu>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-1"
                    color="primary"
                    light
                    icon
                    x-small
                    v-on="{ ...menu, ...tooltip }"
                  >
                    <v-icon>mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('buttons.Help') }}</span>
              </v-tooltip>
            </template>
            <v-card max-width="250">
              <v-card-title class="title">
                <v-icon left>mdi-help-circle-outline</v-icon>
                Contratistas
              </v-card-title>
              <v-card-text class="caption">
                Contratistas Registrados en el sistema
              </v-card-text>
            </v-card>
          </v-menu>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" md="12">
        <v-list dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-file-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Contratos Activos</v-list-item-title>
              <v-list-item-title v-text="counters.active" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-file</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Contratos Inactivos</v-list-item-title>
              <v-list-item-title v-text="counters.inactive" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card hover-reveal color="success">
          <template #heading>
            <v-apexchart
              ref="types"
              type="bar"
              height="150"
              class="mb-n3 v-apexchart-card"
              :options="types.chartOptions"
              :series="types.series"
            />
          </template>
          <template #reveal-actions>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  :loading="finding"
                  :disabled="finding"
                  class="mx-1"
                  color="info"
                  light
                  icon
                  @click="getByType"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Refresh') }}</span>
            </v-tooltip>
          </template>
          <v-card-text>
            <h1 class="card-title font-weight-light">Tipos de Trámites</h1>
            <v-row dense>
              <v-col
                v-for="(type, i) in types.data.types"
                :key="i"
                cols="12"
                md="6"
              >
                <span class="caption font-weight-bold">
                  {{ `${type.name}: ${type.contracts_count}` }}
                </span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-time-ago
              :loading="finding"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light hidden-sm-and-down"
              :date-time="types.data.requested_at"
            />
            <v-spacer />
            <v-menu>
              <template #activator="{ on: menu, attrs }">
                <v-tooltip top>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="primary"
                      light
                      icon
                      x-small
                      v-on="{ ...menu, ...tooltip }"
                    >
                      <v-icon>mdi-help-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('buttons.Help') }}</span>
                </v-tooltip>
              </template>
              <v-card max-width="250">
                <v-card-title class="title">
                  <v-icon left>mdi-help-circle-outline</v-icon>
                  Tipos de trámites
                </v-card-title>
                <v-card-text class="caption">
                  Sumatoria global de los tipos de trámites, se tienen en cuenta
                  todos los contratos generados sin importar su vigencia.
                </v-card-text>
              </v-card>
            </v-menu>
          </v-card-actions>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card hover-reveal color="primary">
          <template #heading>
            <v-apexchart
              ref="certified"
              type="bar"
              height="150"
              class="mb-n3 v-apexchart-card"
              :options="certified.chartOptions"
              :series="certified.series"
            />
          </template>
          <template #reveal-actions>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  :loading="finding"
                  :disabled="finding"
                  class="mx-1"
                  color="info"
                  light
                  icon
                  @click="getByType"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Refresh') }}</span>
            </v-tooltip>
          </template>
          <v-card-text>
            <h1 class="card-title font-weight-light">Certificados ARL</h1>
            <v-row dense>
              <v-col cols="12" md="6">
                <span class="caption font-weight-bold">
                  {{ `CON ARL: ${certified.data.certified.arl}` }}
                </span>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  text
                  :to="
                    localePath({
                      name: 'contractors',
                      query: {
                        doesnt_have_arl: 'true',
                      },
                    })
                  "
                  class="caption font-weight-bold"
                >
                  {{ `SIN ARL: ${certified.data.certified.not_arl}` }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-time-ago
              :loading="finding"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light hidden-sm-and-down"
              :date-time="certified.data.requested_at"
            />
            <v-spacer />
            <v-menu>
              <template #activator="{ on: menu, attrs }">
                <v-tooltip top>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="primary"
                      light
                      icon
                      x-small
                      v-on="{ ...menu, ...tooltip }"
                    >
                      <v-icon>mdi-help-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('buttons.Help') }}</span>
                </v-tooltip>
              </template>
              <v-card max-width="250">
                <v-card-title class="title">
                  <v-icon left>mdi-help-circle-outline</v-icon>
                  Certificados ARL
                </v-card-title>
                <v-card-text class="caption">
                  Sumatoria global de los tipos de trámites, se tienen en cuenta
                  todos los contratos generados sin importar su vigencia y que
                  cuentan o no con certificado ARL.
                </v-card-text>
              </v-card>
            </v-menu>
          </v-card-actions>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Contractor } from '~/models/services/portal/Contractor'

export default {
  name: 'Dashboard',
  auth: 'auth',
  components: {
    BaseMaterialStatsCard: () => import('@/components/base/MaterialStatsCard'),
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    VTimeAgo: () => import('@/components/base/TimeAgo'),
  },
  data: (vm) => ({
    form: new Contractor(),
    finding: false,
    counters: {
      total: 0,
      secop: 0,
      arl: 0,
      users: 0,
      active: 0,
      inactive: 0,
    },
    types: {
      data: {
        data: {},
      },
      series: [
        {
          name: 'Cantidad',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          foreColor: '#fff',
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            export: {
              csv: {
                filename: 'Tipos de trámites',
                columnDelimiter: ',',
                headerCategory: 'NOMBRE',
                headerValue: 'TOTAL',
              },
            },
            autoSelected: 'zoom',
          },
          zoom: {
            autoScaleYaxis: true,
          },
        },
        fill: {
          colors: ['#fff'],
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: true,
          borderColor: '#fff',
          strokeDashArray: 0,
          position: 'back',
        },
        theme: {
          mode: 'light',
        },
        xaxis: {
          categories: [],
          tickPlacement: 'on',
          labels: {
            show: false,
          },
        },
      },
    },
    certified: {
      data: {
        certified: {},
      },
      series: [
        {
          name: 'Cantidad',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          foreColor: '#fff',
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            export: {
              csv: {
                filename: 'Certificados',
                columnDelimiter: ',',
                headerCategory: 'NOMBRE',
                headerValue: 'TOTAL',
              },
            },
            autoSelected: 'zoom',
          },
          zoom: {
            autoScaleYaxis: true,
          },
        },
        fill: {
          colors: ['#fff'],
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: true,
          borderColor: '#fff',
          strokeDashArray: 0,
          position: 'back',
        },
        theme: {
          mode: 'light',
        },
        xaxis: {
          categories: ['CON ARL', 'SIN ARL'],
          tickPlacement: 'on',
          labels: {
            show: false,
          },
        },
      },
    },
  }),
  fetch() {
    this.getCounters()
    this.getByType()
  },
  head: () => ({
    title: 'Dashboard',
  }),
  methods: {
    getCounters() {
      this.start()
      this.form
        .count()
        .then((response) => {
          this.counters = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    getByType() {
      this.start()
      this.form
        .types()
        .then((response) => {
          this.types.data = response.data
          this.types.series = [
            {
              data: response.data.types.map((s) => s.contracts_count || 0),
            },
          ]
          if (this.$refs.types) {
            this.$refs.types.updateOptions({
              xaxis: {
                ...this.types.chartOptions.xaxis,
                categories: response.data.types.map((s) => s.name),
              },
            })
          } else {
            this.types.chartOptions = {
              ...this.types.chartOptions,
              xaxis: {
                ...this.types.chartOptions.xaxis,
                categories: response.data.types.map((s) => s.name),
              },
            }
          }
          this.certified.data = response.data
          const certified = response.data.certified
          this.certified.series = [
            {
              data: [certified.arl, certified.not_arl],
            },
          ]
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    // Loading
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    },
  },
}
</script>

<style lang="scss">
#file-type {
  .ct-label.ct-vertical {
    font-size: 12px;
  }
}
#simple-bar {
  .ct-series-a .ct-bar {
    fill: #00cae3 !important;
    stroke: #00cae3 !important;
  }
}
.v-apexchart-card {
  .apexcharts-menu-item {
    color: black;
  }
  .apexcharts-toolbar {
    color: white;
  }
  .apexcharts-tooltip {
    color: black;
  }
  .apexcharts-menu-icon svg,
  .apexcharts-pan-icon svg,
  .apexcharts-zoom-icon svg,
  .apexcharts-zoomin-icon svg,
  .apexcharts-zoomout-icon svg,
  .apexcharts-reset-icon svg {
    fill: white !important;
  }
  .apexcharts-menu-icon.apexcharts-selected svg,
  .apexcharts-pan-icon.apexcharts-selected svg,
  .apexcharts-zoom-icon.apexcharts-selected svg,
  .apexcharts-zoomin-icon.apexcharts-selected svg,
  .apexcharts-zoomout-icon.apexcharts-selected svg,
  .apexcharts-reset-icon.apexcharts-selected svg {
    fill: #fff !important;
  }
  .apexcharts-tooltip-marker {
    fill: #00b0ff;
  }
}
</style>
