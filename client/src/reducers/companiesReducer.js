import { FETCH_COMPANIES, FETCH_COMPANY } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMPANY:
      return { ...state, [action.payload[0]._id]: action.payload[0] };
    case FETCH_COMPANIES:
      return action.payload;
    default:
      return state;
  }
}
