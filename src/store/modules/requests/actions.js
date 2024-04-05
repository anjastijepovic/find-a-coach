export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(`https://find-a-coach-22fc1-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
      method:'POST',
      body: JSON.stringify(newRequest)
    });
    
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request!');
      throw error;
    }

    newRequest.id = responseData.name;
    // dodajemo id u newRequest, a objekat u responseData u firebase ima taj name field koji je id
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  // for fetching requests for the currently logged in user on the All requests page
  async fetchRequests(context) {
    // we need the userId from our global getters, because when the user logs in, we wanna fetch only the requests for that id
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(`https://find-a-coach-22fc1-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` + token);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests!');
      throw error;
    }

    // transform the object we're getting from firebase to a list of requests
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
    // pass requests as a payload
  }
  // dispatch this action inide the RequestsReceived.vue method
};