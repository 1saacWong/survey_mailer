import { FETCH_UPLOADS, FETCH_UPLOAD } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_UPLOAD:
      return { ...state, [action.payload[0]._id]: action.payload[0] };
    case FETCH_UPLOADS:
      return action.payload;
    default:
      return state;
  }
}
