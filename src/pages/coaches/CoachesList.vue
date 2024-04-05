<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <!-- !! converts truthy error into true boolean -->
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <!-- true je set za refresh arg koji je by default false, da ga nismo stavili odje bio bi false -->
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Coach</base-button>
                    <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register as Coach</base-button>
                    <!-- odje smo dodali rijec link da bi link prop bio true i da bi ovo imalo stajl linka a ne btn -->
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
                        {{ coach.firstName }}
                    </li> -->
                    <coach-item 
                        v-for="coach in filteredCoaches" 
                        :key="coach.id" 
                        :id="coach.id"
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas"
                    ></coach-item>
                </ul>
                <h3 v-else>No coaches found.</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';


export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            error: null,
            isLoading: false,
            activeFilters: {
                frontend: true,
                backend: true, 
                career: true
            }
        };
    },
    computed: {
        filteredCoaches() {
            // the module is namespaced and the namespaced name is the key coaches in index.js in coaches. the getter name is also coaches
            // da nije namespaced bilo bi samo this.$store.coaches
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
            // prikazati listu samo ako nismo loading
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
            // we will use this getter to show/hide the Register button, cause after a coach is registered, we dont need the btn
        },
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },
    },
    // created is executed when the component is created
    created() {
        this.loadCoaches();
    },
    methods: {
        setFilters(updatedFilters) {
            // CoachFilter.vue emitted an event alongside the updatedFilters parameter
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
            // for showing the loading spinner, we are done loading once the promise is returned
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    } 
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>