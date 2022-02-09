import {Map} from "immutable";
import {HESAP, HESAP_EDIT, HESAP_GET} from "../Types";

let initialState = {
  showSidebar: true,
  animasyon: false,
  hesapDto: {},
  editMode: true,
};

export default function HesapReducer(state = Map(initialState), action) {

  switch (action.type) {

    case HESAP:
      return state.merge({
        update: action.data.update,
        hesapDto: action.data.hesapDto,
      });

    case HESAP_GET:
      return state.merge({
        gridApi: action.data.gridApi,
      });

    case HESAP_EDIT:
      return state.merge({
        editMode: action.data.editMode
      });


    default:
      return state
  }
};
