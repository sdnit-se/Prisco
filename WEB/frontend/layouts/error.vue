<template>
    <v-app class="mt-12" dark justify="center" align="center">
        <div v-if="error.statusCode === 404">
            <v-row justify="center" align="center">
                <p class="text-h2">
                    {{ pageNotFound }}
                    <v-img width="600" src="https://i.imgur.com/B3GXLyG.png" />
                </p>
            </v-row>
        </div>
        <div v-else>
            <v-row justify="center" align="center">
                <p class="text-h2">
                    {{ otherError }}
                </p>
            </v-row>
        </div>
        <div class="text-center">
            <v-btn max-width="500" large to="/">
                <b>Let the pug bring you back to saftey!</b>
            </v-btn>
        </div>
    </v-app>
</template>

<script>
export default {
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            pageNotFound: 'Seems like you are lost',
            otherError: 'An error occurred',
        }
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        return {
            title,
        }
    },
}
</script>

<style scoped>
h1 {
    font-size: 20px;
}
</style>
