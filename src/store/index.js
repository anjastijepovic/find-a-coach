import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';


const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule
    },
    // state() {
    //     return {
    //         userId: 'c3'
    //         // used when we sign up as a coach and to verify wheter we already got a coach w that id
    //     };
    // },
    // getters: {
    //     userId(state) {
    //         return state.userId;
    //     }
    // }

    // we will add these setters and getters to the auth files
});

export default store;