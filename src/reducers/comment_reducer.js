import * as actions from '../actions/comment_action';

const comment_reducer = (state, action) => {
  if (action.type === actions.FETCH_BEGIN) {
    return {
      ...state,
      commentsLoading: true
    };
  }

  if (action.type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      commentsLoading: false,
      comments: action.payload
    };
  }

  if (action.type === actions.ADD_COMMENT) {
    return {
      ...state,
      comments: [action.payload, ...state.comments]
    };
  }

  throw new Error('Unknown action');
}

export default comment_reducer;