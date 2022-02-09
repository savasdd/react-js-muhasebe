import {Map} from "immutable";
import {ROL, ROL_EDIT, ROL_GET} from "../Types";

let initialState = {
  showSidebar: true,
  animasyon: false,
  rolDto: {},
  editMode: true,
};

export default function gnlRolReducer(state = Map(initialState), action) {

  switch (action.type) {
    case ROL:

      return state.merge({
        update: action.data.update,
        rolDto: action.data.rolDto,
      });

    case ROL_GET:

      return state.merge({
        gridApi: action.data.gridApi,
      });

    case ROL_EDIT:
      return state.merge({
        editMode: action.data.editMode
      });

    default:
      return state
  }
};
