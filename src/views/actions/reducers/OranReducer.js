import {Map} from "immutable";
import {ORAN, ORAN_EDIT, ORAN_GET} from "../Types";

let initialState = {
  oranDto: {},
  animasyon: false,
  editMode: true,
};

export default function oranReducer(state = Map(initialState), action) {
  switch (action.type) {
    case ORAN:
      return state.merge({
        update: action.data.update,
        oranDto: action.data.oranDto,
      });

    case ORAN_GET:
      return state.merge({
        gridApi: action.data.gridApi,
        param: action.data.param,
      });

    case ORAN_EDIT:
      return state.merge({
        editMode: action.data.editMode
      });

    default:
      return state
  }
};
