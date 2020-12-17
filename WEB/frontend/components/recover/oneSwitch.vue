<template>
    <div>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="6">
                <div class="text-center">NEW DATA</div>
                <v-row align="center" justify="center">
                    <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            :value="hostname"
                            outlined
                            readonly
                            dense
                            label="Hostname"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            :value="macAddressChild"
                            outlined
                            readonly
                            dense
                            label="New MAC-address"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            :value="description"
                            outlined
                            readonly
                            dense
                            label="New Description"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer />
            <v-col cols="12" sm="6">
                <div class="text-center">OLD DATA</div>
                <v-row align="center" justify="center">
                    <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            :value="ipamData[0].hostname || 'No Hostname'"
                            outlined
                            readonly
                            dense
                            label="Hostname"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            :value="ipamData[0].mac || 'No Mac-Address'"
                            outlined
                            readonly
                            dense
                            label="Old MAC-address"
                            required
                            @input="$emit('mac-address')"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            :value="ipamData[0].description || 'No Description'"
                            outlined
                            readonly
                            dense
                            label="Old Description"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        ipamData: {
            type: Array,
            default() {
                return []
            },
        },
        hostname: {
            type: String,
            default: '',
        },
        macAddressChild: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
    },
}
</script>
