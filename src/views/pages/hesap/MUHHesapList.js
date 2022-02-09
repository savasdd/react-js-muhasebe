import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {Card, CardHeader, Col, Form} from "reactstrap";
import Modal from "react-awesome-modal";
import MUHHesapEdit from "./MUHHesapEdit";
import {AgGridReact} from "ag-grid-react";
import {GET_COLUMNS, GridDef} from "../../util/Util";
import {AG_GRID_LOCALE_TR} from "../modal/GridLocal";
import request from "axios";
import {MUH_URL} from "../../service/MuhUrl";
import {connect} from "react-redux";
import {GET, RAPOR} from "../../service/Service";
import {HESAP} from "../../actions/Types";
import {download, plus} from "../../custom/EasyIcons";

class MUHHesapList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hesapDto: {}
    }

    this.gridLoad = this.getById.bind(this);
  }

  async componentDidMount() {
    const response = await request({
      url: MUH_URL.HESAP.SORGU,
      method: 'GET',
      headers: MUH_URL.HEADER,
      params: {'search': 'hesapId!=null;tanim!=null'}
    });
    this.state.gridApi.applyTransaction({add: response.data.data});
  }

  render() {
    const {hesapDto} = this.state;
    const {dispatch, state} = this.props;

    const results = [
      {'header': 'Hesap Adı', 'field': 'tanim', 'width': 100, 'flex': true},
      {'header': 'Hesap No', 'field': 'hesapNo', 'width': 250, 'flex': true},
      {'header': 'Hesap Kodu', 'field': 'kod.tanim', 'width': 250, 'flex': true},
      {'header': 'Aktif', 'field': 'aktif', 'width': 120, 'flex': true, 'aktif': true},
    ];
    const columns = GET_COLUMNS(this.gridLoad, results);


    const yeni = () => {
      const dto = {
        hesapId: '',
        tanim: '',
        hesapNo: '',
        kod: '',
        aktif: '',
      }
      this.setState({
        visible: true,
        hesapDto: dto
      });
    };

    const onGridReady = async (param) => {
      this.setState({
        gridApi: param.api,
      });
    };

    const rapor = () => {
      const params = {};
      const res = RAPOR('PDF', 'MUH_HESAP', 'HESAP', params, dispatch);
    };


    return (
      <Col md={12}>
        <Card className="shadow mh-80vh">
          <CardHeader className="border-0" style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Hesap Listesi </h3>
              </div>
              <section>
                <div className="div-buton" id="div3">
                  <div className="kaydet_kapat">
                    <i className={download} title="Yeni Kayit" onClick={() => rapor()}></i>
                    &nbsp;&nbsp;
                    <i className={plus} title="Yeni Kayit" onClick={() => yeni()}></i>
                  </div>
                </div>
                <Modal visible={this.state.visible} width="800" height="200" effect="fadeInUp"
                       onClickAway={() => this.close()}>
                  <div>
                    <MUHHesapEdit dto={hesapDto}/>
                  </div>
                </Modal>
              </section>
            </div>
          </CardHeader>
          <div className="w-96 centered block"
               style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <Form>
              <div id="grid" className="ag-theme-alpine"
                   style={{height: '65vh', width: '100%', padding: '0.5rem'}}>
                <AgGridReact
                  columnDefs={columns}
                  defaultColDef={GridDef}
                  onGridReady={onGridReady}
                  pagination={true}
                  paginationPageSize={20}
                  rowSelection="single"
                  enableCellChangeFlash={true}
                  localeText={AG_GRID_LOCALE_TR}
                  overlayLoadingTemplate={'<div class="alert alert-info" role="alert"> <strong>Veri Bulunamadı</strong></div>'}
                />
              </div>
            </Form>
          </div>
        </Card>
      </Col>
    )
  }

  getById(param) {
    const dto = {
      hesapId: param.data.hesapId ? param.data.hesapId : '',
      tanim: param.data.tanim ? param.data.tanim : '',
      hesapNo: param.data.hesapNo ? param.data.hesapNo : '',
      kodId: param.data.kodId ? param.data.kodId : '',
      aktif: param.data.aktif ? param.data.aktif : '',
    }

    this.props.dispatch({type: HESAP, data: {update: true, hesapDto: {}}});
    this.setState({
      visible: true,
      hesapDto: dto
    });
  };

  close = () => {
    this.setState({
      visible: false
    });
    const resp = GET(MUH_URL.HESAP.SORGU, this.state.gridApi, 'hesapId!=null;tanim!=null', 300);
    this.props.dispatch({type: HESAP, data: {update: false, hesapDto: {}}});
  }

};

function mapStateToProps(state) {
  return {
    state: state,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(MUHHesapList);
