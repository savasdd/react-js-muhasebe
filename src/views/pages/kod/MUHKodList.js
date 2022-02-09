import React from 'react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {Card, CardHeader, Col, Form} from "reactstrap";
import Modal from "react-awesome-modal";
import MUHKodEdit from "./MUHKodEdit";
import {GET_COLUMNS, GridDef} from "../../util/Util";
import {AG_GRID_LOCALE_TR} from "../modal/GridLocal";
import {AgGridReact} from "ag-grid-react";
import request from "axios";
import {MUH_URL} from "../../service/MuhUrl";
import {connect} from "react-redux";
import {GET, RAPOR} from "../../service/Service";
import {GNL_KOD} from "../../actions/Types";
import {download, plus, square} from "../../custom/EasyIcons";

class MUHKodList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kodDto: {}
    }

    this.gridLoad = this.getById.bind(this);
    this.detayLoad = this.yenUst.bind(this);
  }

  async componentDidMount() {
    const response = await request({
      url: MUH_URL.KOD.SORGU,
      method: 'GET',
      headers: MUH_URL.HEADER,
      params: {'search': 'kodId!=null;tanim!=null'}
    });
    this.state.gridApi.applyTransaction({add: response.data.data});
  }

  render() {
    const {kodDto} = this.state;
    const {dispatch, state} = this.props;

    const results = [
      {'header': 'Üst Kod', 'field': 'ustKod', 'width': 100, 'flex': true},
      {'header': 'Tanım', 'field': 'tanim', 'width': 250, 'flex': true},
      {'header': 'Kod', 'field': 'kod', 'width': 250, 'flex': true},
      {'header': 'Açıklama', 'field': 'aciklama', 'width': 200, 'flex': true},
      {'header': 'Sıra No', 'field': 'siraNo', 'width': 120, 'flex': true},
    ];
    const columns = GET_COLUMNS(this.gridLoad, results, this.detayLoad, square);


    const onGridReady = async (param) => {
      this.setState({
        gridApi: param.api,
      });
    };


    const yeni = () => {
      const dto = {
        kodId: '',
        ustKod: '',
        tanim: '',
        kod: '',
        siraNo: '',
        aciklama: '',
      }
      this.setState({
        visible: true,
        kodDto: dto
      });
    };

    const rapor = () => {
      const params = {};
      const res = RAPOR('PDF', 'MUH_KOD', 'Kod', params, dispatch);
    };

    return (
      <Col md={12}>
        <Card className="shadow mh-80vh">
          <CardHeader className="border-0" style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Kod Listesi </h3>
              </div>
              <section>
                <div className="div-buton" id="div3">
                  <div className="kaydet_kapat">
                    <i className={download} title="Yeni Kayit" onClick={() => rapor()}></i>
                    &nbsp;&nbsp;
                    <i className={plus} title="Yeni Kayit" onClick={() => yeni()}></i>
                  </div>
                </div>
                <Modal visible={this.state.visible} width="800" effect="fadeInUp"
                       onClickAway={() => this.close()}>
                  <div>
                    <MUHKodEdit dto={kodDto}/>
                  </div>
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
    );
  }

  yenUst(param) {
    const dto = {
      ustKod: param.data.kod ? param.data.kod : '',
      kodId: '',
      tanim: '',
      kod: '',
      siraNo: '',
      aciklama: '',
    }

    this.props.dispatch({type: GNL_KOD, data: {update: false, kodDto: null}});
    this.setState({
      visible: true,
      kodDto: dto
    });
  };

  getById(param) {
    const dto = {
      kodId: param.data.kodId ? param.data.kodId : '',
      ustKod: param.data.ustKod ? param.data.ustKod : '',
      tanim: param.data.tanim ? param.data.tanim : '',
      kod: param.data.kod ? param.data.kod : '',
      siraNo: param.data.siraNo ? param.data.siraNo : '',
      aciklama: param.data.aciklama ? param.data.aciklama : '',
    }

    this.props.dispatch({type: GNL_KOD, data: {update: true, kodDto: null}});
    this.setState({
      visible: true,
      kodDto: dto
    });
  };

  close = () => {
    this.setState({
      visible: false
    });
    const resp = GET(MUH_URL.KOD.SORGU, this.state.gridApi, 'kodId!=null;tanim!=null', 300);
    this.props.dispatch({type: GNL_KOD, data: {update: false, kodDto: {}}});
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHKodList);
