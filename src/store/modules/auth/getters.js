export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        // authenticated je kad ima token
        return !!state.token;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }
};
