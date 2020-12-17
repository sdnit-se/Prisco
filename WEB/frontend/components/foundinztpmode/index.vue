<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="1200">
            <template #activator="{ on, attrs }">
                <v-btn color="green" class="ma-2" dark v-bind="attrs" v-on="on">
                    {{ macAddress }}
                </v-btn>
            </template>
            <v-card>
                <div class="pa-4 text-center headline">
                    What would you like to do with <b>{{ macAddress }}</b>
                </div>
                <v-card-text>
                    <v-row align="center" justify="center">
                        <ProvisionSwitchStepper
                            button-text="Recover Switch"
                            button-color="blue"
                            card-header="Recover Switch"
                            :mac-address="macAddress"
                            :target-ip-address="targetIpAddress"
                        />
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text class="mr-4 mt-3" @click="cancel">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ProvisionSwitchStepper from '~/components/recover/stepper.vue'

export default {
    components: {
        ProvisionSwitchStepper,
    },
    props: {
        macAddress: {
            type: String,
            default: 'MAC HERE',
        },
        targetIpAddress: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            // DIALOG
            dialog: false,
        }
    },
    methods: {
        cancel() {
            this.dialog = false
        },
    },
}
</script>
