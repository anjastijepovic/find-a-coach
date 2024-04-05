export default {
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter(req => req.coachId === coachId);
      // we want to return only the requests for a specific coachId
      // check if the coachId from the request is equal to the const coachId we extracted from the main index.js
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
      // samo se provjeravaju requests iz prethodnog gettera a ne svi
    }
  };