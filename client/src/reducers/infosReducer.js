import { FETCH_INFOS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_INFOS:
      return action.payload;
    default:
      return state;
  }
}
