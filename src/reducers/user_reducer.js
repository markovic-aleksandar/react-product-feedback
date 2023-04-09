import * as actions from '../actions/user_action';

const user_reducer = (state, action) => {
  if (action.type === actions.TOGGLE_VOTES) {
    const id = action.payload;
    const {votedFeedbacks} = state;

    const tempVotedFeedbacks = votedFeedbacks.includes(id) ?
    votedFeedbacks.filter(feedbackId => feedbackId !== id) : [...votedFeedbacks, id];

    return {...state, votedFeedbacks: tempVotedFeedbacks};
  }

  throw new Error('Unknown action');
}

export default user_reducer;