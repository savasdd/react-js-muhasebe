import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {Card, CardHeader, Col, Form} from "reactstrap";
import Modal from "react-awesome-modal";
import MUHKiraBedelEdit from "./MUHKiraBedelEdit";
import MUHKiraciEdit from "./MUHKiraciEdit";
import {GET_COLUMNS, GridDef} from "../../util/Util";
import {AG_GRID_LOCALE_TR} from "../modal/GridLocal";
import {AgGridReact} from "ag-grid-react";
import request from "axios";
import {MUH_URL} from "../../service/MuhUrl";
import {connect} from "react-redux";
import {GET} from "../../service/Service";
import {KIRA} from "../../actions/Types";
import {calculator} from "../../custom/EasyIcons";

class MUHKiraciList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kiraDto: {}
    }

    this.gridLoad = this.getById.bind(this);
    this.bedelLoad = this.yeniBedel.bind(this);
  }

  async componentDidMount() {
    const response = await request({
      url: MUH_URL.KIRACI.SORGU,
      method: 'GET',
      headers: MUH_URL.HEADER,
      params: {'search': 'kiraciId!=null'}
    });
    this.state.gridApi.applyTransaction({add: response.data.data});
  }

  render() {
    const {kiraDto} = this.state;
    const {dispatch, state} = this.props;

    const results = [
      {'header': 'Ad', 'field': 'ad', 'width': 100, 'flex': true},
      {'header': 'Soyad', 'field': 'soyad', 'width': 250, 'flex': true},
      {'header': 'T.C. No', 'field': 'tckn', 'width': 250, 'flex': true},
      {'header': 'Sicil No', 'field': 'sicilNo', 'width': 200, 'flex': true},
      {'header': 'Cinsiyet', 'field': 'cinsiyet.tanim', 'width': 200, 'flex': true},
      {'header': 'Kurum', 'field': 'kurum', 'width': 200, 'flex': true},
      {'header': 'Doğum Yeri', 'field': 'dogumYeri', 'width': 200, 'flex': true},
      {'header': 'Doğum Tarihi', 'field': 'dogumTarihi', 'width': 200, 'flex': true, 'date': true},
    ];
    const columns = GET_COLUMNS(this.gridLoad, results, this.bedelLoad, calculator);


    const onGridReady = async (param) => {
      this.setState({
        gridApi: param.api,
      });
    };


    const yeni = () => {
      const dto = {
        kiraciId: '',
        ad: '',
        soyad: '',
        tckn: '',
        sicilNo: '',
        kurum: '',
        dogumYeri: '',
        dogumTarihi: '',
        kodId: '',
      }
      this.setState({
        visible: true,
        kiraDto: dto
      });
    };


    return (
      <Col md={12}>
        <Card className="shadow mh-80vh">
          <CardHeader className="border-0" style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Kiracı Listesi </h3>
              </div>
              <section>
                <div className="div-buton" id="div3">
                  <div className="kaydet_kapat">
                    <i className="fa fa-plus-circle" title="Yeni Kayit" onClick={() => yeni()}></i>
                  </div>
                </div>
                <Modal visible={this.state.visible} width="800" effect="fadeInUp"
                       onClickAway={() => this.close()}>
                  <MUHKiraciEdit dto={kiraDto}/>
                </Modal>
              </section>
              <section>
                <Modal visible={this.state.bedel} width="1000" effect="fadeInUp"
                       onClickAway={() => this.closeBedel()}>
                  <MUHKiraBedelEdit dto={kiraDto}/>
                </Modal>
              </section>
            </div>
          </CardHeader>
          <div className="w-96 centered block"
               style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <Form>
              <div id="grid" className="ag-theme-alpine"
                   style={{height: '61vh', width: '100%', padding: '0.5rem'}}>
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
  };

  getById(param) {
    const dto = {
      kiraciId: param.data.kiraciId ? param.data.kiraciId : '',
      ad: param.data.ad ? param.data.ad : '',
      soyad: param.data.soyad ? param.data.soyad : '',
      tckn: param.data.tckn ? param.data.tckn : '',
      sicilNo: param.data.sicilNo ? param.data.sicilNo : '',
      kurum: param.data.kurum ? param.data.kurum : '',
      dogumYeri: param.data.dogumYeri ? param.data.dogumYeri : '',
      dogumTarihi: param.data.dogumTarihi ? param.data.dogumTarihi : '',
      kodId: param.data.kodId ? param.data.kodId : '',
    }

    this.props.dispatch({type: KIRA, data: {update: true, bedel: false, kiraDto: {}}});
    this.setState({
      visible: true,
      kiraDto: dto
    });
  };

  yeniBedel(param) {
    this.props.dispatch({type: KIRA, data: {update: true, bedel: true, kiraDto: {}}});
    const dto = {kiraciId: param.data.kiraciId ? param.data.kiraciId : null}
    this.setState({
      bedel: true,
      kiraDto: dto
    });
  };

  close = () => {
    this.setState({
      visible: false
    });
    const resp = GET(MUH_URL.KIRACI.SORGU, this.state.gridApi, 'kiraciId!=null', 300);
    this.props.dispatch({type: KIRA, data: {update: false, bedel: false, kiraDto: {}}});
  }

  closeBedel = () => {
    this.setState({
      bedel: false
    });
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHKiraciList);
