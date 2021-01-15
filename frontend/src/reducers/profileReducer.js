import { SET_DATA,DATA_CREATED,DATA_REMOVED ,DATA_UPDATED} from "../actions/types";

const initialState = {
  userData: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        userData: action.payload
      };
      case DATA_CREATED:
      return {
        ...state
      };
      case DATA_REMOVED:
      return {
        ...state
      };
      case DATA_UPDATED:
      return {
        ...state
      };
    default:
      return state;
  }
}