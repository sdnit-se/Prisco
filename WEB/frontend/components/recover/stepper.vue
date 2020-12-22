<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent width="1200">
            <template #activator="{ on, attrs }">
                <v-btn
                    :color="buttonColor"
                    class="ma-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    {{ buttonText }}
                </v-btn>
            </template>
            <v-stepper v-model="step">
                <div class="text-center mt-2 headline font-weight-light">
                    {{ cardHeader }}
                </div>
                <v-stepper-header>
                    <v-stepper-step :complete="step > 1" step="1">
                        Data
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="step > 2" step="2">
                        Confirm
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3"> Provision </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="mb-12 pb-2 pt-2">
                            <v-form ref="form" v-model="valid" class="ma-4">
                                <v-row>
                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field
                                            v-model="hostname"
                                            :rules="hostnameRules"
                                            outlined
                                            label="Hostname"
                                            required
                                        />
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field
                                            v-model="ipAddress"
                                            :rules="ipAddressRules"
                                            outlined
                                            label="IP address the switch will have after"
                                            required
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-btn
                                        :disabled="!valid"
                                        color="success"
                                        class="ml-3 mr-4 mt-3"
                                        :loading="loading"
                                        @click="validate"
                                    >
                                        Continue
                                    </v-btn>
                                    <v-spacer />
                                    <v-btn
                                        text
                                        class="mr-4 mt-3"
                                        @click="cancel"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-row>
                            </v-form>
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card class="mb-12 pb-2 pt-2">
                            <v-form ref="form" v-model="valid" class="ma-4">
                                <div class="text-center">
                                    <v-progress-circular
                                        v-if="loading"
                                        :size="70"
                                        :width="7"
                                        class="ma-4"
                                        color="grey"
                                        indeterminate
                                    />
                                </div>
                                <div v-if="!loading">
                                    <OneSwitch
                                        :hostname="hostname"
                                        :ip-address="ipAddress"
                                    />
                                    <div>
                                        Are you sure you want to continue with
                                        the data above?
                                    </div>
                                </div>
                                <v-row>
                                    <v-btn
                                        :disabled="!valid"
                                        color="success"
                                        class="ml-3 mr-4 mt-3"
                                        :loading="loading"
                                        @click="startToProvisionSwitch"
                                    >
                                        Continue
                                    </v-btn>
                                    <v-btn
                                        color="grey"
                                        class="mr-4 mt-3"
                                        :loading="loading"
                                        @click="step = step - 1"
                                    >
                                        Back
                                    </v-btn>
                                    <v-spacer />
                                    <v-btn
                                        text
                                        class="mr-4 mt-3"
                                        @click="cancel"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-row>
                            </v-form>
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-card class="mb-12 pb-2 pt-2">
                            <v-form ref="form" class="ma-4">
                                <div class="text-center">
                                    <v-row
                                        class="font-weight-light"
                                        align="center"
                                        justify="center"
                                    >
                                        Provisioning Switch
                                        <v-progress-circular
                                            v-if="loadingSwitchProvisioned"
                                            :size="25"
                                            :width="3"
                                            class="ma-4"
                                            color="grey"
                                            indeterminate
                                        />
                                        <v-icon
                                            v-if="switchProvisioned === true"
                                            color="green"
                                        >
                                            mdi-check-bold
                                        </v-icon>
                                        <v-icon
                                            v-if="switchProvisioned === false"
                                            color="red"
                                        >
                                            mdi-alert
                                        </v-icon>
                                    </v-row>
                                    <v-row
                                        class="font-weight-light"
                                        align="center"
                                        justify="center"
                                    >
                                        Verifying Switch
                                        <v-progress-circular
                                            v-if="
                                                loadingSwitchProvisionedVerify
                                            "
                                            :size="25"
                                            :width="3"
                                            class="ma-4"
                                            color="grey"
                                            indeterminate
                                        />
                                        <v-icon
                                            v-if="
                                                switchProvisionedVerify === true
                                            "
                                            color="green"
                                        >
                                            mdi-check-bold
                                        </v-icon>
                                        <v-icon
                                            v-if="
                                                switchProvisionedVerify ===
                                                false
                                            "
                                            color="red"
                                        >
                                            mdi-alert
                                        </v-icon>
                                        <v-icon
                                            v-if="switchProvisioned === ''"
                                            color="grey"
                                        >
                                            mdi-history
                                        </v-icon>
                                    </v-row>
                                    <div
                                        v-if="
                                            switchProvisionedVerifyDone &&
                                            !failedToVerify
                                        "
                                        class="font-weight-light"
                                    >
                                        Success, switch is provisioned.
                                    </div>
                                    <div
                                        v-if="failed"
                                        class="mt-10 font-weight-light"
                                    >
                                        {{ failedText }}
                                    </div>
                                    <v-textarea
                                        v-if="outputFromAnsible !== ''"
                                        v-model="outputFromAnsible"
                                        label="Console"
                                        height="300"
                                        filled
                                        readonly
                                        full-width
                                    />
                                </div>
                                <v-row>
                                    <v-btn
                                        color="grey"
                                        class="ml-3 mr-4 mt-3"
                                        :loading="loading"
                                        @click="step = step - 1"
                                    >
                                        Back
                                    </v-btn>
                                    <v-spacer />
                                    <v-btn
                                        text
                                        class="mr-4 mt-3"
                                        @click="cancel"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-row>
                            </v-form>
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import OneSwitch from '~/components/recover/oneSwitch.vue'

export default {
    components: {
        OneSwitch,
    },
    props: {
        cardHeader: {
            type: String,
            default: '',
        },
        buttonText: {
            type: String,
            default: 'ADD TEXT',
        },
        buttonColor: {
            type: String,
            default: 'blue',
        },
        targetIpAddress: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            // DIALOG
            dialog: false,
            // STEPPER
            step: 1,
            // FORM
            valid: false,
            targetIpAddressChild: '',
            hostname: '',
            hostnameRules: [(v) => !!v || 'Hostname is required'],
            ipAddress: '',
            ipAddressRules: [
                (v) => !!v || 'IP-Address is required',
                (v) =>
                    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                        v
                    ) || 'Has to be formated XXX.XXX.XXX.XXX',
            ],
            description: '',
            failedToVerify: false,
            // FAILED IN startToProvisionSwitch
            failed: false,
            failedText: 'Failed to verify host, do it manually.',
            // LOADING
            loadingSwitchProvisioned: false,
            loadingSwitchProvisionedVerify: false,
            switchProvisioned: '',
            switchProvisionedVerify: '',
            switchProvisionedVerifyDone: '',
            loading: false,
            // VERIFY
            verifyTimesValue: 0,
            // CONSOLE
            outputFromAnsible: '',
        }
    },
    mounted() {
        this.targetIpAddressChild = this.targetIpAddress
    },
    methods: {
        cancel() {
            this.dialog = false
        },
        errorMessage(error) {
            console.log(error)
            this.$store.commit('snackbarError', error.response.data.message)
            this.failed = true
            this.failedText = error.response.data.message
        },
        successMessage(message) {
            this.$store.commit('snackbarSuccess', message)
        },
        errorMessageOwnText(error) {
            console.log(error)
            this.$store.commit('snackbarError', error)
            this.failed = true
            this.failedText = error.response.data.message
        },
        startToVerifySwitch(response) {
            // Update Provision done and stop loading
            this.loadingSwitchProvisioned = false
            // Start to verify
            this.outputFromAnsible = response.data.output
            if (response.data.success === true) {
                this.loadingSwitchProvisionedVerify = true
                this.switchProvisioned = true
                let i = 0
                do {
                    task(i)
                    i++
                } while (
                    i < 20 &&
                    this.switchProvisionedVerify !== true &&
                    this.switchProvisionedVerify !== false
                )
                function task(i) {
                    setTimeout(function () {
                        this.loadingSwitchProvisionedVerify = true
                        try {
                            axios
                                .get('/api/ping/' + this.ipAddress)
                                .then((response) => {
                                    if (response.data.switchIsUp === true) {
                                        this.switchProvisionedVerifyDone = true
                                        this.switchProvisionedVerify = true
                                        this.successMessage(
                                            'Switch is up and reachable!'
                                        )
                                    } else {
                                        this.verifyTimesValue++
                                        if (this.verifyTimesValue > 20) {
                                            this.errorMessageOwnText(
                                                'No response from switch... will not try again.'
                                            )
                                        } else {
                                            this.errorMessageOwnText(
                                                'No response from switch (' +
                                                    this.verifyTimesValue +
                                                    '/ 20) trying again in 60 seconds....'
                                            )
                                        }
                                    }
                                })
                                .catch((error) => {
                                    this.switchProvisionedVerify = false
                                    this.errorMessage(error)
                                })
                        } catch (error) {
                            console.log(error)
                        }
                    }, 60000 * i)
                }
                this.loadingSwitchProvisionedVerify = false
                this.switchProvisionedVerify = false
            } else {
                this.switchProvisioned = false
            }
        },
        startToProvisionSwitch() {
            // RESET ALL FIELDS
            this.loadingSwitchProvisioned = false
            this.loadingSwitchProvisionedVerify = false
            this.switchProvisioned = ''
            this.switchProvisionedVerify = ''
            this.switchProvisionedVerifyDone = ''
            this.outputFromAnsible = ''

            // START LOADING
            this.loading = true

            // JUMP TO STEP 3
            this.step = 3

            // START PROCESS (This is pretty ugly...)
            try {
                // Start Provisioning
                this.loadingSwitchProvisioned = true
                const payloadProvision = {
                    target_ip_address: this.targetIpAddressChild,
                    ip_address: this.ipAddress,
                    hostname: this.hostname,
                }
                axios
                    .post('/api/provision', payloadProvision)
                    .then((response) => {
                        this.startToVerifySwitch(response)
                    })
                    .catch((error) => {
                        this.loadingSwitchProvisioned = false
                        this.switchProvisioned = false
                        this.errorMessage(error)
                    })
            } catch (error) {
                this.loadingSwitchProvisionedVerify = false
                this.loadingSwitchProvisioned = false
                this.$store.commit(
                    'snackbarError',
                    'Something went wrong, open up console for more information.'
                )
                console.log(error)
            }

            this.loading = false
        },
        validate() {
            if (this.valid) {
                this.step = 2
            }
        },
    },
}
</script>
