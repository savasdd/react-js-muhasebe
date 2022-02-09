import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {Card, CardHeader, Col, Form} from "reactstrap";
import {connect} from 'react-redux';
import {KULLANICI} from "../../actions/Types";
import MUHKullaniciEdit from "./MUHKullaniciEdit";
import Modal from 'react-awesome-modal';
import {GET_COLUMNS, GridDef} from "../../util/Util";
import {AG_GRID_LOCALE_TR} from "../modal/GridLocal";
import {AgGridReact} from "ag-grid-react";
import request from "axios";
import {MUH_URL} from "../../service/MuhUrl";
import {GET} from "../../service/Service";

class MUHKullaniciList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      kullaniciDto: {}
    }

    this.gridLoad = this.getById.bind(this);
  }

  async componentDidMount() {
    const response = await request({
      url: MUH_URL.KULLANICI.SORGU,
      method: 'GET',
      headers: MUH_URL.HEADER,
      params: {'search': 'kullaniciId!=null'}
    });
    this.state.gridApi.applyTransaction({add: response.data.data});
  }

  render() {
    const {kullaniciDto} = this.state;
    const {dispatch, state} = this.props;

    const results = [
      {'header': 'Ad', 'field': 'ad', 'width': 100, 'flex': true},
      {'header': 'Soyad', 'field': 'soyad', 'width': 250, 'flex': true},
      {'header': 'T.C. No', 'field': 'tckn', 'width': 250, 'flex': true},
      {'header': 'Kullanıcı Adı', 'field': 'kullaniciAdi', 'width': 200, 'flex': true},
    ];
    const columns = GET_COLUMNS(this.gridLoad, results);


    const onGridReady = async (param) => {
      this.setState({
        gridApi: param.api,
      });
    };


    const yeni = () => {
      const dto = {
        kullaniciId: '',
        ad: '',
        soyad: '',
        tckn: '',
        kullaniciAdi: '',
        sifre: '',
      }

      this.setState({
        visible: true,
        kullaniciDto: dto
      });
    };


    return (
      <Col md={12}>
        <Card className="shadow mh-80vh">
          <CardHeader className="border-0" style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Kullanıcı Listesi </h3>
              </div>
              <section>
                <div className="div-buton" id="div3">
                  <div className="kaydet_kapat">
                    <i className="fa fa-plus-circle" title="Yeni Kayit" onClick={() => yeni()}></i>
                  </div>
                </div>
                <Modal visible={this.state.visible} width="700" effect="fadeInUp"
                       onClickAway={() => this.close()}>
                  <div>
                    <MUHKullaniciEdit dto={kullaniciDto}/>
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
    )
  }

  getById(param) {
    const dto = {
      kullaniciId: param.data.kullaniciId ? param.data.kullaniciId : '',
      ad: param.data.ad ? param.data.ad : '',
      soyad: param.data.soyad ? param.data.soyad : '',
      tckn: param.data.tckn ? param.data.tckn : '',
      kullaniciAdi: param.data.kullaniciAdi ? param.data.kullaniciAdi : '',
      sifre: param.data.sifre ? param.data.sifre : '',
    }

    this.props.dispatch({type: KULLANICI, data: {update: true, kullaniciDto: {}}});
    this.setState({
      visible: true,
      kullaniciDto: dto
    });
  };

  close = () => {
    this.setState({
      visible: false
    });
    const resp = GET(MUH_URL.KULLANICI.SORGU, this.state.gridApi, 'kullaniciId!=null', 300);
    this.props.dispatch({type: KULLANICI, data: {update: true, kullaniciDto: {}}});
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHKullaniciList);
