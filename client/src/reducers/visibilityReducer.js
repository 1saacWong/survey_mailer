import { SHOW_REVIEW, HIDE_REVIEW } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SHOW_REVIEW:
      return { showReview: true };
    case HIDE_REVIEW:
      return { showReview: false };
    default:
      return state;
  }
}
