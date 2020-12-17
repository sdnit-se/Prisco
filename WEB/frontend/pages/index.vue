<template>
    <div class="mt-12 text-center">
        <div class="mt-12 display-4 font-weight-light">PRISCO</div>
        <div class="mb-10 display-1 font-weight-light">
            Zero Touch Cisco Provisioning System
        </div>
        <div class="headline font-weight-light">What would you like to do?</div>
        <v-row align="center" justify="center">
            <ProvisionSwitchStepper
                button-text="Recover Switch"
                button-color="blue"
                card-header="Recover Switch"
            />
        </v-row>
        <v-card min-height="300" class="mt-12 font-weight-light">
            <v-card-title center> Switches found in ZTP mode </v-card-title>
            <v-card-text>
                <div class="text-center">
                    <v-progress-circular
                        v-if="loading"
                        :size="70"
                        :width="7"
                        class="ma-4"
                        color="primary"
                        indeterminate
                    />
                    <div v-else>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search for property"
                            single-line
                            filled
                            hide-details
                        ></v-text-field>
                        <v-row v-if="ztpSwitches.length > 0">
                            <v-col
                                v-for="(ztpswitch, i) in ztpSwitches"
                                :key="i"
                                cols="12"
                                md="4"
                                sm="6"
                            >
                                <WhatToDoWithSwitch
                                    :mac-address="ztpswitch.mac_address"
                                    :target-ip-address="ztpswitch.ip_address"
                                />
                            </v-col>
                        </v-row>
                        <v-row v-else align="center" justify="center">
                            <div class="mt-8 headline font-weight-light">
                                No Switches Found In ZTP-DHCP.
                            </div>
                        </v-row>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import ProvisionSwitchStepper from '~/components/recover/stepper.vue'
import WhatToDoWithSwitch from '~/components/foundinztpmode/index.vue'

export default {
    components: {
        ProvisionSwitchStepper,
        WhatToDoWithSwitch,
    },
    data() {
        return {
            // LOADING
            loading: true,
            // SEARCH FIELD
            search: '',
            // ZTP DATA
            ztpSwitches: [],
        }
    },
    mounted() {
        this.loading = true
        try {
            axios
                .get('/api/leases')
                .then((response) => {
                    // IF SUCCESSFULL ADD ZTP SWITCHES TO ztpSwitches variable.
                    if (
                        response.status === 200 &&
                        !response.data.includes('html') &&
                        response.data !== null
                    ) {
                        this.ztpSwitches = response.data
                    }
                })
                .catch((error) => {
                    this.$store.commit(
                        'snackbarError',
                        error.response.data.message
                    )
                })
        } catch (error) {
            console.log(error)
            this.$store.commit(
                'snackbarError',
                'Something went wrong, contact admin or read console output.'
            )
        }
        this.loading = false
    },
}
</script>
