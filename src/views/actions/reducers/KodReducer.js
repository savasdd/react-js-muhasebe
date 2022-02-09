import {Map} from "immutable";
import {GNL_KOD, GNL_KOD_GET} from "../Types";


let initialState = {
  showSidebar: true,
  animasyon: false,
  kodDto: {},
  editMode: true,
};

export default function gnlKodReducer(state = Map(initialState), action) {

  switch (action.type) {

    case GNL_KOD:
      return state.merge({
        update: action.data.update,
        kodDto: action.data.kodDto,
      });

    case GNL_KOD_GET:
      return state.merge({
        gridApi: action.data.gridApi,
      });

    default:
      return state
  }
};
