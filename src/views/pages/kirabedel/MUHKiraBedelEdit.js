import React from "react";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import {Row} from "react-bootstrap";
import EasyInput from "../../custom/EasyInput";
import {handleInput} from "../../custom/inputHandlers";
import Select from "react-select";
import {connect} from "react-redux";
import {AgGridReact} from "ag-grid-react";
import {GET_COLUMNS, GridDef} from "../../util/Util";
import {AG_GRID_LOCALE_TR} from "../modal/GridLocal";
import request from "axios";
import {MUH_URL} from "../../service/MuhUrl";
import {getOran, POST, PUT, RAPOR} from "../../service/Service";
import {MUHSilModal} from "../modal/MUHSilModal";
import {download} from "../../custom/EasyIcons";

class MUHKiraBedelEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridApi: null,
      oranList: [{}],
      bedelDto: {},
      kiraciId: null,
      oranId: null,
      update: false
    }

    this.gridLoad = this.getById.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    const kiraciId = nextProps.dto.kiraciId;

    if (nextProps.state.kira.get('bedel')) {
      const response = await request({
        url: MUH_URL.BEDEL.SORGU,
        method: 'GET',
        headers: MUH_URL.HEADER,
        params: {'search': 'kiraci.kiraciId==' + kiraciId}
      });
      this.state.gridApi.setRowData([]);
      this.state.gridApi.applyTransaction({add: response.data.data});

      this.setState({
        kiraciId: kiraciId,
        oranList: await getOran(MUH_URL.ORAN.SORGU),
      });
    }
  }

  render() {
    const {gridApi, bedelDto, kiraciId, update, oranList, oranId} = this.state;
    const {dispatch, state} = this.props;

    const results = [
      {'header': 'Kiracı', 'field': 'kiraci.ad', 'width': 100, 'flex': true},
      {'header': 'Kira Süresi', 'field': 'kiraSuresi', 'width': 250, 'flex': true},
      {'header': 'Faiz Oranı', 'field': 'faizOrani.tanim', 'width': 250, 'flex': true},
      {'header': 'Tarih', 'field': 'kiralamaTarihi', 'width': 200, 'flex': true, 'date': true},
      {'header': 'Bedel', 'field': 'bedel', 'width': 200, 'flex': true},
      {'header': 'Toplam Bedel', 'field': 'toplamBedel', 'width': 200, 'flex': true},
    ];
    const columns = GET_COLUMNS(this.gridLoad, results);

    const onGridReady = async (param) => {
      this.setState({
        gridApi: param.api,
      });
    };

    const kaydet = () => {
      const model = {
        kiraId: bedelDto.kiraId ? bedelDto.kiraId : null,
        kiraci: {kiraciId: kiraciId ? kiraciId : null},
        faizOrani: {oranId: oranId ? oranId.value : null},
        kiraSuresi: bedelDto.kiraSuresi ? bedelDto.kiraSuresi : null,
        kiralamaTarihi: bedelDto.kiralamaTarihi ? bedelDto.kiralamaTarihi : null,
        bedel: bedelDto.bedel ? bedelDto.bedel : null,
        toplamBedel: bedelDto.toplamBedel ? bedelDto.toplamBedel : null,
      }

      if (update) {
        const response = PUT(MUH_URL.KIRACI.GETID + kiraciId + MUH_URL.BEDEL.UPDATE + bedelDto.kiraId, model, dispatch);
        console.log(response);
      } else {
        const response = POST(MUH_URL.KIRACI.GETID + kiraciId + MUH_URL.BEDEL.CREATE, model, dispatch);
        console.log(response);
      }
      yeni();
    };

    const yeni = () => {
      const dto = {
        kiraId: '',
        kiraSuresi: '',
        kiralamaTarihi: '',
        bedel: '',
        toplamBedel: '',
        oranId: '',
      }
      this.setState({
        update: false,
        bedelDto: dto
      });
    };

    const rapor = () => {
      const params = {
        'kiraciId': kiraciId
      };
      const res = RAPOR('PDF', 'MUH_BEDEL', 'BEDEL', params, dispatch);
    };


    return (
      <Col sm="13">
        <Card body style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
          <CardTitle tag="h5">
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Kira Bedeli</h3>
              </div>
              <div className="div-buton" id="div3">
                <div className="kaydet_kapat">
                  <i className="fa fa-save" onClick={kaydet}
                     title="Kaydet"></i>&nbsp;&nbsp;
                  <MUHSilModal url={MUH_URL.KIRACI.GETID + kiraciId + MUH_URL.BEDEL.DELETE + bedelDto.kiraId}
                               dispatch={dispatch}/>&nbsp;&nbsp;
                  <i className={download} title="Yeni Kayit" onClick={() => rapor()}></i>
                </div>
              </div>
            </div>
          </CardTitle>
          <CardText>
            <div className="centered block w-90">
              <div style={{marginTop: '1vh'}}></div>
              <Row>
                <Col sm="6">
                  <EasyInput
                    value={bedelDto.bedel}
                    label='Kira Bedeli'
                    fieldName='bedel'
                    fieldHolder='bedelDto'
                    type='number'
                    component={this}/>
                </Col>
                <Col sm="6">
                  <EasyInput
                    value={bedelDto.kiraSuresi}
                    label='Kira Süresi'
                    fieldName='kiraSuresi'
                    fieldHolder='bedelDto'
                    component={this}/>
                </Col>
                <Col sm="6">
                  <EasyInput
                    value={bedelDto.toplamBedel}
                    label='Toplam Kira Bedeli'
                    fieldName='toplamBedel'
                    fieldHolder='bedelDto'
                    component={this}/>
                </Col>
                <Col sm="6">
                  <div className="content-section implementation">
                    <div className="p-fluid p-grid">
                      <div className="p-field p-col-12 p-md-2">
                        <span className="p-float-label">
                        <Select
                          value={oranId}
                          fieldName='oranId'
                          fieldHolder='bedelDto'
                          options={oranList}
                          onChange={(e) => this.onOran(e)}
                          optionLabel="label" filter showClear filterBy="label"
                          placeholder="Faiz Oranı"/>
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="content-section implementation">
                    <div className="p-fluid p-grid">
                      <div className="p-field p-col-12 p-md-3">
                        <span className="p-float-label">
                          <input style={{width: '100%'}}
                                 type="date"
                                 value={bedelDto.kiralamaTarihi}
                                 name='kiralamaTarihi'
                                 fieldHolder='bedelDto'
                                 onChange={(e) => {
                                   handleInput(e, 'kiralamaTarihi', this, 'bedelDto')
                                 }}/>
                          </span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <div id="grid" className="ag-theme-alpine"
                     style={{height: '31vh', width: '100%', padding: '0.5rem'}}>
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
              </Row>
            </div>
          </CardText>
        </Card>
      </Col>
    )
  };

  getById(param) {
    const dto = {
      kiraId: param.data.kiraId ? param.data.kiraId : '',
      kiraSuresi: param.data.kiraSuresi ? param.data.kiraSuresi : '',
      oranId: param.data.faizOrani ? param.data.faizOrani.oranId : '',
      kiralamaTarihi: param.data.kiralamaTarihi ? param.data.kiralamaTarihi : '',
      bedel: param.data.bedel ? param.data.bedel : '',
      toplamBedel: param.data.toplamBedel ? param.data.toplamBedel : '',
    }

    this.setState({
      update: true,
      bedelDto: dto
    });
  };

  onOran = (e) => {
    this.setState({
      oranId: e,
    });
  };

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
export default connect(mapStateToProps, mapDispatchToProps)(MUHKiraBedelEdit);
