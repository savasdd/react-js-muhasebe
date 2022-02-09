import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {Card, CardHeader, Col, Form} from "reactstrap";
import Modal from "react-awesome-modal";
import MUHRolEdit from "./MUHRolEdit";
import {GET_COLUMNS, GridDef} from "../../util/Util";
import {AG_GRID_LOCALE_TR} from "../modal/GridLocal";
import {AgGridReact} from "ag-grid-react";
import request from "axios";
import {MUH_URL} from "../../service/MuhUrl";
import {connect} from "react-redux";
import {GET} from "../../service/Service";
import {ROL} from "../../actions/Types";

class MUHRolList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rolDto: {}
    }

    this.gridLoad = this.getById.bind(this);
  }

  async componentDidMount() {
    const response = await request({
      url: MUH_URL.ROL.SORGU,
      method: 'GET',
      headers: MUH_URL.HEADER,
      params: {'search': 'rolId!=null;tanim!=null'}
    });
    this.state.gridApi.applyTransaction({add: response.data.data});
  }

  render() {
    const {rolDto} = this.state;
    const {dispatch, state} = this.props;

    const results = [
      {'header': 'Tanım', 'field': 'tanim', 'width': 100, 'flex': true},
      {'header': 'Kod', 'field': 'kod', 'width': 250, 'flex': true},
      {'header': 'Açıklama', 'field': 'aciklama', 'width': 250, 'flex': true},
      {'header': 'Aktif', 'field': 'aktif', 'width': 200, 'flex': true, 'aktif': true},
    ];
    const columns = GET_COLUMNS(this.gridLoad, results);

    const onGridReady = async (param) => {
      this.setState({
        gridApi: param.api,
      });
    };


    const yeni = () => {
      const dto = {
        rolId: '',
        tanim: '',
        kod: '',
        aktif: '',
        aciklama: '',
      }
      this.setState({
        visible: true,
        rolDto: dto
      });
    };


    return (
      <Col md={12}>
        <Card className="shadow mh-80vh">
          <CardHeader className="border-0" style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Rol Listesi </h3>
              </div>
              <section>
                <div className="div-buton" id="div3">
                  <div className="kaydet_kapat">
                    <i className="fa fa-plus-circle" title="Yeni Kayit" onClick={() => yeni()}></i>
                  </div>
                </div>
                <Modal visible={this.state.visible} width="800" effect="fadeInUp"
                       onClickAway={() => this.close()}>
                  <div>
                    <MUHRolEdit dto={rolDto}/>
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
  };

  getById(param) {
    const dto = {
      rolId: param.data.rolId ? param.data.rolId : '',
      tanim: param.data.tanim ? param.data.tanim : '',
      kod: param.data.kod ? param.data.kod : '',
      aciklama: param.data.aciklama ? param.data.aciklama : '',
      aktif: param.data.aktif ? param.data.aktif : '',
    }

    this.props.dispatch({type: ROL, data: {update: true, rolDto: {}}});
    this.setState({
      visible: true,
      rolDto: dto
    });
  };


  close = () => {
    this.setState({
      visible: false
    });
    const resp = GET(MUH_URL.ROL.SORGU, this.state.gridApi, 'rolId!=null;tanim!=null', 300);
    this.props.dispatch({type: ROL, data: {update: false, rolDto: {}}});
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHRolList);
