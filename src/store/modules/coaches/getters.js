export default {
    coaches(state) {
        return state.coaches;
    },
    // because later, we wanna render a list of coaches only if there are coaches, if there are no coaches, we wanna just show a message and not an empty list
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
        // returns true if there are coaches, false otherwise
    }, 
    isCoach(_, getters, _2, rootGetters) {
        // true if the person is a coach, false otherwise
        // rootstate (_2) and rootGetters su iz intex.js, state (_) i getters su iz ovog getters.js fajla
        const coaches = getters.coaches;
        // getters.coaches je iz ovog fajla

        const userId = rootGetters.userId;
        // iz index.js

        return coaches.some(coach => coach.id === userId)
        // some returns true if some (at least one) coach fullfills a criteria
    },
    // check if the lastFetch happened more than a minute ago
    // ovaj getter cemo koristiti u loadCoaches action, da load them ako ovaj getter vraca true, dont load them ako je false
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
            // ako je lastFetch null onda treba da se update
        }
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
        // vraca true ili false
    }
};
