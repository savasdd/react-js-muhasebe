import {Map} from "immutable";
import {KIRA, KIRA_EDIT, KIRA_GET} from "../Types";

let initialState = {
  showSidebar: true,
  animasyon: false,
  kiraDto: {},
  editMode: true,
};

export default function KiraReducer(state = Map(initialState), action) {

  switch (action.type) {
    case KIRA:

      return state.merge({
        update: action.data.update,
        bedel: action.data.bedel,
        kiraDto: action.data.kiraDto,
      });

    case KIRA_GET:
      return state.merge({
        gridApi: action.data.gridApi,
      });

    case KIRA_EDIT:
      return state.merge({
        editMode: action.data.editMode
      });

    default:
      return state
  }
};
