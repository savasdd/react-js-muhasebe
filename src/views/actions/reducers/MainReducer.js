import {Map} from 'immutable'
import {GET_MENU, GRID_EDIT_MODE, SHOW_LOAD, SIDEBAR_SHOW, TOASTR_MESSAGE, TOASTR_REFRESH} from "../Types";

let initialState = {
  showSidebar: true,
  sidebarShow: 'responsive',
  editMode: true,
  loading: false,
};

export default function mainReducer(state = Map(initialState), action) {

  switch (action.type) {

    case SIDEBAR_SHOW:
      return state.merge({
        sidebarShow: action.data.sidebarShow
      });

    case TOASTR_MESSAGE:
      return state.merge({
        toastrType: action.data.type,
        toastrMessage: action.data.message,
        showToastr: true,
      });

    case TOASTR_REFRESH:
      return state.merge({
        showToastr: false
      });

    case GRID_EDIT_MODE:
      return state.merge({
        editMode: action.data.editMode
      });

    case SHOW_LOAD:
      return state.merge({
        loading: action.data.loading
      });

    case GET_MENU:
      return state.merge({
        menu: action.data.menu
      });

    default:
      return state
  }
}
