<template>
    <div>
        <section>
            <base-card>
                <h2>{{ fullName }}</h2>  
                <h3>${{ rate }}/hour</h3>  
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2>Interested? Reach out now!</h2>
                    <base-button link :to="contactLink">Contact</base-button>
                </header>
                <router-view></router-view>
                <!-- where the nested child, contact, will be rendered -->
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
                <!-- areas je computed prop -->
                <p>{{ description }}</p>
            </base-card>
        </section>
    </div>
</template>

<script>
export default {
    props: ['id'],
    // when adding to the route with the path /coaches/:id props: true in the router.js, the vue router will pass the value id holds in the end as a prop to CoachDetail
    // we can later use that id to fetch the relevant coach data from our vuex store
    data() {
        return {
            selectedCoach: null
        };
    },
    computed: {
        fullName() {
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
        },
        areas() {
            return this.selectedCoach.areas;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        description() {
            return this.selectedCoach.description;
    
        },
        contactLink() {
            return this.$route.path + '/' + this.id + '/contact';
        }
    },
    created() {
        this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id);
    }
}
</script>
