export const state = () => ({
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: ''
})

export const mutations = {
    snackbarClose(state) {
        state.snackbar = false
        state.snackbarColor = ''
        state.snackbarMessage = ''
    },
    snackbarError(state, message) {
        state.snackbarColor = 'error'
        state.snackbarMessage = message
        state.snackbar = true
    },
    snackbarSuccess(state, message) {
        state.snackbarColor = 'success'
        state.snackbarMessage = message
        state.snackbar = true
    }
}