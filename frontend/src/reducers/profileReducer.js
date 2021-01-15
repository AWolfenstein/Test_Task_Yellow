import {
  SET_DATA,
  DATA_CREATED,
  DATA_REMOVED,
  DATA_UPDATED,
  SET_WEEK_DATA,
  SET_IMGS,
} from "../actions/types";

const initialState = {
  userData: [],
  weekData: [],
  userIMG:[],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case DATA_CREATED:
      return {
        ...state,
      };
    case DATA_REMOVED:
      return {
        ...state,
      };
    case DATA_UPDATED:
      return {
        ...state,
      };
    case SET_WEEK_DATA:
      return {
        ...state,
        weekData: action.payload,
      };
      case SET_IMGS:
        return {
          ...state,
          userIMG: action.payload,
        };
    default:
      return state;
  }
}
