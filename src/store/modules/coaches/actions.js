export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    // from the root index.js file koristimo taj getter da dobijemo userid
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };
    
    const token = context.rootGetters.token;

    const response = await fetch(`https://find-a-coach-22fc1-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` + token, 
    {
      method: 'PUT',
      // data in there will be edited if it existed but a new one will be created if it didnt exist before. 
      // with post, a new entry would be created every time, but we only want one entry per user
      body: JSON.stringify(coachData)
    });
    // this will be stored in the const response only when the request is done

    // const responseData = await response.json();
    

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      // we copy coachData with ..., all the key value pairs from it
      id: userId
      // so we have the id quickly available in our data obj in vuex
    });
  },
  // dispatch this action in the CoachesList when the component loads and when the refresh btn is clicked
  async loadCoaches(context, payload) {
    // send a request to fetch all coaches from firebase

    // should we fetch coaches, based on the getter and if the payload has the forceRefresh property (ako smo kliknuli refresh btn treba svakako data to be fetched iako nije proslo vise od minut)
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
      // ako nije true onda samo return i ne nastavljaj dalje sa akcijom, and stick to the data we currently have in our store
    }

    const response = await fetch(`https://find-a-coach-22fc1-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
    const responseData = await response.json();

    if (!response.ok) {
      // error handling ...
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
      // the component that dispatches this action can then handle this error
    }
    // ako nema errora:
    // mi cemo fetchovati objekat sa keys koji sadrze coaches sa firebase, a mi zelimo listu coaches, so we want to reformat the responseData
    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id:key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    // commit the mutation
    context.commit('setFetchTimestamp');
    // to change the timestamp when coaches are loaded
  }
};