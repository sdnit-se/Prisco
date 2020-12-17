<template>
    <div>
        <v-row align="center" justify="center">
            <v-col cols="12" md="6" sm="6">
                <v-text-field
                    :value="hostname"
                    outlined
                    readonly
                    label="Hostname"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
                <v-text-field
                    :value="ipAddress"
                    outlined
                    readonly
                    label="New MAC-address"
                    required
                ></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        hostname: {
            type: String,
            default: '',
        },
        ipAddress: {
            type: String,
            default: '',
        },
    },
}
</script>
