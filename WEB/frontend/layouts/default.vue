<template>
    <v-app alt="PRISCO">
        <v-snackbar
            v-model="$store.state.snackbar"
            :color="$store.state.snackbarColor"
            right
            top
            vertical
        >
            <b>{{ $store.state.snackbarMessage }}</b>
            <template #action="{ attrs }">
                <v-btn
                    color
                    v-bind="attrs"
                    @click="$store.commit('snackbarClose')"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <v-app-bar
            fixed
            app
            :style="{ 'background-color': 'transparent', 'box-shadow': 'none' }"
        >
            <v-btn text to="/">
                <v-toolbar-title v-text="title" />
            </v-btn>
            <v-spacer />
            <v-btn icon class="mr-3" @click="toggleTheme()">
                <v-icon>mdi-lamp</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <nuxt />
            </v-container>
        </v-main>
        <v-footer>
            <span>Prisco - Provisioning Cisco</span>
            <v-spacer />
            <span>by Kevin Kuusela & Adrian Lyxell</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            title: 'PRISCO',
        }
    },
    beforeMount() {
        document.querySelector('body').style.backgroundColor = '#121212'
        if (localStorage.getItem('dark') === 'true') {
            this.$vuetify.theme.dark = true
        }
    },
    methods: {
        toggleTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            localStorage.setItem('dark', this.$vuetify.theme.dark)
        },
    },
}
</script>
