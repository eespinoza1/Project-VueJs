<template>
  <v-main id="certificates" class="main main-raised elevation-24">
    <v-row justify="center" align-content="center" class="mx-2">
      <v-col v-show="!success" cols="12" class="mx-auto">
        <v-card flat color="transparent">
          <v-card-text>
            <v-row class="mx-md-2">
              <v-col cols="12" class="py-0 my-0">
                <info-content
                  info-horizontal
                  icon="mdi-information-outline"
                  icon-color="success"
                  subtitle="Expedición de Certificado de Ingresos y Retenciones"
                  class="mb-0"
                >
                  <v-card flat color="transparent" class="mt-0 px-5">
                    <v-card-title v-if="errors.message">
                      <v-alert
                        elevation="2"
                        border="top"
                        colored-border
                        type="info"
                      >
                        <span class="body-2">{{ errors.message }}</span>
                        <v-divider
                          v-if="errorsKeys.length > 0 || !!errors.details"
                          class="my-4"
                        />
                        <template v-if="errors.details">
                          {{ errors.details }}
                          <v-divider class="my-4" />
                        </template>
                        <ul v-for="(k, i) in errorsKeys" :key="i">
                          <li
                            v-for="(val, j) in errors.errors[k]"
                            :key="`i-${j}`"
                          >
                            {{ val }}
                          </li>
                        </ul>
                        <template #close>
                          <v-btn icon @click="errors = {}">
                            <v-icon dark>mdi-close</v-icon>
                          </v-btn>
                        </template>
                      </v-alert>
                    </v-card-title>
                    <v-card-text v-if="!email">
                      <validation-observer
                        ref="peace"
                        v-slot="{ handleSubmit }"
                      >
                        <v-form @submit.prevent="handleSubmit(onValidate)">
                          <v-row dense>
                            <!-- Document -->
                            <v-col cols="12" md="6" sm="12">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="
                                  form.validations.input_document_required
                                "
                                vid="document"
                                :name="$t('inputs.Document')"
                              >
                                <v-text-field
                                  id="document"
                                  v-model.number="form.document"
                                  name="document"
                                  :loading="finding"
                                  :readonly="finding"
                                  :error-messages="errors"
                                  color="primary"
                                  label="Número de Documento"
                                  clearable
                                  counter
                                  :maxlength="12"
                                  autocomplete="off"
                                  required="required"
                                  prepend-icon="mdi-numeric"
                                />
                              </validation-provider>
                            </v-col>
                            <!-- Birthday -->
                            <v-col cols="12" md="6" sm="12">
                              <v-dialog
                                ref="birthdate_dialog"
                                v-model="birthdate_dialog"
                                :return-value.sync="form.birthdate"
                                persistent
                                width="290px"
                              >
                                <template #activator="{ on }">
                                  <validation-provider
                                    v-slot="{ errors }"
                                    :rules="form.validations.required"
                                    vid="birthdate"
                                    name="fecha de nacimiento"
                                  >
                                    <v-text-field
                                      id="birthdate"
                                      v-model="form.birthdate"
                                      name="birthdate"
                                      :loading="finding"
                                      label="Fecha de nacimiento"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      :error-messages="errors"
                                      color="primary"
                                      clearable
                                      autocomplete="off"
                                      required="required"
                                      v-on="on"
                                    ></v-text-field>
                                  </validation-provider>
                                </template>
                                <v-date-picker
                                  v-if="birthdate_dialog"
                                  ref="birthdate_picker"
                                  v-model="form.birthdate"
                                  locale="es"
                                  :max="
                                    $moment($moment().subtract(1, 'day'))
                                      .subtract(min_age, 'years')
                                      .toISOString()
                                  "
                                  :min="
                                    $moment()
                                      .subtract(max_age, 'years')
                                      .toISOString()
                                  "
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="birthdate_dialog = false"
                                  >
                                    Cancelar
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="
                                      $refs.birthdate_dialog.save(
                                        form.birthdate
                                      )
                                    "
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-col>
                            <!-- Year -->
                            <v-col cols="12" md="6" sm="12">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="form.validations.input_number_required"
                                vid="year"
                                name="año de Certificación Tributaria"
                              >
                                <v-text-field
                                  id="year"
                                  v-model.number="form.year"
                                  name="year"
                                  :loading="finding"
                                  :readonly="finding"
                                  :error-messages="errors"
                                  color="primary"
                                  label="Año de Certificación Tributaria"
                                  clearable
                                  counter
                                  :maxlength="4"
                                  :minlength="4"
                                  autocomplete="off"
                                  required="required"
                                  prepend-icon="mdi-numeric"
                                />
                              </validation-provider>
                            </v-col>
                            <!-- Create User -->
                            <v-col cols="12" class="text-right">
                              <v-btn
                                outlined
                                color="primary"
                                :loading="finding"
                                :disabled="finding"
                                :to="localePath({ name: 'certificates' })"
                              >
                                <v-icon left dark>mdi-arrow-left</v-icon>
                                Regresar
                              </v-btn>
                              <v-btn
                                color="primary"
                                :loading="finding"
                                :disabled="finding"
                                type="submit"
                              >
                                <v-icon left dark>mdi-send</v-icon>
                                Generar Certificado
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </validation-observer>
                    </v-card-text>
                  </v-card>
                </info-content>
              </v-col>
              <v-col v-if="!!email" cols="12">
                <v-card flat class="m-auto">
                  <v-card-text>
                    <v-empty-state
                      icon="mdi-email"
                      label="Código de Verificación"
                      :description="email"
                    >
                      <v-card flat color="transparent">
                        <v-card-text>
                          <v-verification-input
                            title="Digite el código de verificación"
                            :loading="finding"
                            :disabled="finding"
                            required
                            @complete="onCode"
                          />
                        </v-card-text>
                        <v-card-text>
                          <small>
                            Verifique la bandeja Principal de su correo
                            electrónico, al igual que Spam o No deseados. Si el
                            código no fue enviado, intente reenviarlo. Si no
                            conoce el correo asociado a su documento de
                            identidad, envíe una solicitud a
                            <a
                              href="mailto:soporte@idrd.gov.co?subject='Portal Contratista: Solicitud de Código de Verificación - Paz y Salvo'"
                              v-text="`soporte@idrd.gov.co`"
                            />
                            <br />Si encuentra alguna novedad con su información
                            tributaria escriba a
                            <a
                              href="mailto:contabilidad@idrd.gov.co?subject='Portal Contratista: Novedades - Certificación Tributaria'"
                              v-text="'contabilidad@idrd.gov.co'"
                            />
                          </small>
                          <v-timer ref="timer" :secs="120" @onFinish="onOk" />
                        </v-card-text>
                        <v-card-actions class="text-center">
                          <v-btn
                            color="primary"
                            :loading="finding"
                            :disabled="finding"
                            outlined
                            text
                            @click="onBack"
                          >
                            <v-icon left dark>mdi-arrow-left</v-icon>
                            Regresar
                          </v-btn>
                          <v-btn
                            class="my-1"
                            color="primary"
                            :loading="finding"
                            :disabled="finding || disableResend"
                            @click="onValidate"
                          >
                            Reenviar Código
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-empty-state>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-show="success" cols="12" class="mx-auto">
        <v-empty-state
          icon="mdi-file"
          label="Certificado Generado"
          description="Se ha generado el certificado satisfactoriamente. Por favor revise su carpeta de descargas."
        >
          <v-btn
            color="primary"
            :loading="finding"
            :disabled="finding"
            :to="localePath({ name: 'certificates' })"
          >
            <v-icon left dark>mdi-arrow-left</v-icon>
            Regresar
          </v-btn>
        </v-empty-state>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import FileSaver from 'file-saver'
import Base64ToBlob from '~/utils/Base64ToBlob'
import { Arrow } from '~/plugins/Arrow'
import { CertificadoTributario } from '~/models/services/portal/CertificadoTributario'

export default {
  name: 'CertificadoTributario',
  nuxtI18n: {
    paths: {
      en: '/tax-certificates',
      es: '/certificados-tributarios',
    },
  },
  layout: 'landing',
  middleware: ['token'],
  components: {
    InfoContent: () => import('~/components/base/InfoContent'),
    VEmptyState: () => import('~/components/base/EmptyState'),
    VVerificationInput: () => import('~/components/base/VVerificationInput'),
    VTimer: () => import('~/components/base/Timer'),
  },
  auth: false,
  data: () => ({
    min_age: 18,
    max_age: 120,
    birthdate_dialog: false,
    arrow: new Arrow(window, window.document, 'primary'),
    finding: false,
    form: new CertificadoTributario(),
    email: null,
    elements: 0,
    errors: {},
    success: false,
    code: null,
    disableResend: true,
    setTimeOut: null,
  }),
  methods: {
    onValidate() {
      this.finding = true
      this.form.resetOnlyWhenUpdate = false
      this.form
        .store()
        .then((response) => {
          this.email = response.data
        })
        .then(() => {
          const that = this
          this.setTimeOut = setTimeout(function () {
            that.$refs.timer.start()
          }, 300)
        })
        .catch((errors) => {
          this.errors = errors
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    onCode(code) {
      this.finding = true
      this.form.code = code
      this.form
        .token()
        .then((response) => {
          FileSaver.saveAs(
            new Base64ToBlob(response.data.file).blob(),
            response.data.file_name
          )
        })
        .then(() => {
          this.success = true
          this.arrow.show(6000)
        })
        .catch((errors) => {
          this.errors = errors
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    onOk() {
      this.disableResend = false
    },
    onBack() {
      this.email = null
      this.form.reset()
    },
  },
  beforeDestroy() {
    if (this.setTimeOut) {
      clearTimeout(this.setTimeOut)
    }
  },
  watch: {
    birthdate_dialog(val) {
      val &&
        setTimeout(() => (this.$refs.birthdate_picker.activePicker = 'YEAR'))
    },
  },
  computed: {
    errorsKeys() {
      return this.errors.errors ? Object.keys(this.errors.errors) : []
    },
  },
}
</script>
