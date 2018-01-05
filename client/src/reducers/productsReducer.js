import { FETCH_PRODUCTS, FETCH_PRODUCT } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return { ...state, [action.payload[0]._id]: action.payload[0] };
    case FETCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}
