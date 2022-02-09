import {Map} from "immutable";
import {KULLANICI, KULLANICI_EDIT, KULLANICI_GET} from "../Types";

let initialState = {
  kullaniciDto: {},
  editMode: true,
  animasyon: false,
};

export default function kullaniciReducer(state = Map(initialState), action) {
  switch (action.type) {
    case KULLANICI:
      return state.merge({
        update: action.data.update,
        kullaniciDto: action.data.kullaniciDto,
      });

    case KULLANICI_GET:
      return state.merge({
        gridApi: action.data.gridApi,
        param: action.data.param,
      });


    case KULLANICI_EDIT:
      return state.merge({
        editMode: action.data.editMode
      });


    default:
      return state
  }
};
