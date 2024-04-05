export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
    // payload should be an array of requests, it will be passed as a parameter when commiting this mutation in actions.js
  }
};