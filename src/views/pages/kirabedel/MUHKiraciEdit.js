import React from "react";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import {Row} from "react-bootstrap";
import EasyInput from "../../custom/EasyInput";
import {handleInput} from "../../custom/inputHandlers";
import {MUHSilModal} from "../modal/MUHSilModal";
import Select from "react-select";
import {connect} from "react-redux";
import {getKod, POST, PUT} from "../../service/Service";
import {MUH_URL} from "../../service/MuhUrl";

class MUHKiraciEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridApi: null,
      kodList: [{}],
      kiraDto: {},
      update: false,
      kodId: null
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({
      kiraDto: nextProps.dto,
      update: nextProps.state.kira.get('update'),
      kodList: await getKod(MUH_URL.KOD.GETUST + 'KOD_CINSIYET'),
    });
  }

  render() {
    const {gridApi, kiraDto, update, kodList, kodId} = this.state;
    const {dispatch, state} = this.props;

    const kaydet = () => {
      const model = {
        kiraciId: kiraDto.kiraciId ? kiraDto.kiraciId : null,
        ad: kiraDto.ad ? kiraDto.ad : null,
        soyad: kiraDto.soyad ? kiraDto.soyad : null,
        tckn: kiraDto.tckn ? kiraDto.tckn : null,
        sicilNo: kiraDto.sicilNo ? kiraDto.sicilNo : null,
        kurum: kiraDto.kurum ? kiraDto.kurum : null,
        dogumYeri: kiraDto.dogumYeri ? kiraDto.dogumYeri : null,
        dogumTarihi: kiraDto.dogumTarihi ? kiraDto.dogumTarihi : null,
        cinsiyet: {kodId: kodId ? kodId.value : null},
      }

      if (update) {
        const response = PUT(MUH_URL.KIRACI.UPDATE + kiraDto.kiraciId, model, dispatch);
        console.log(response);
      } else {
        const response = POST(MUH_URL.KIRACI.CREATE, model, dispatch);
        console.log(response);
      }
    };

    return (
      <Col sm="13">
        <Card body style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
          <CardTitle tag="h5">
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Kiracı Kayıt</h3>
              </div>
              <div className="div-buton" id="div3">
                <div className="kaydet_kapat">
                  <i className="fa fa-save" onClick={kaydet}
                     title="Kaydet"></i>&nbsp;&nbsp;
                  {update ? <MUHSilModal url={MUH_URL.KIRACI.DELETE + kiraDto.kiraciId} dispatch={dispatch}/> : ''}
                </div>
              </div>
            </div>
          </CardTitle>
          <CardText>
            <div className="centered block w-90">
              <div style={{marginTop: '1vh'}}></div>
              <Row>
                <Col sm="11">
                  <EasyInput
                    value={kiraDto.ad}
                    label='Ad'
                    fieldName='ad'
                    fieldHolder='kiraDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kiraDto.soyad}
                    label='Soyad'
                    fieldName='soyad'
                    fieldHolder='kiraDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kiraDto.tckn}
                    label='T.C. No'
                    fieldName='tckn'
                    fieldHolder='kiraDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kiraDto.sicilNo}
                    label='Sicil No'
                    fieldName='sicilNo'
                    fieldHolder='kiraDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kiraDto.kurum}
                    label='Kurum'
                    fieldName='kurum'
                    fieldHolder='kiraDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kiraDto.dogumYeri}
                    label='Doğum Yeri'
                    fieldName='dogumYeri'
                    fieldHolder='kiraDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <div className="content-section implementation">
                    <div className="p-fluid p-grid">
                      <div className="p-field p-col-12 p-md-2">
                        <span className="p-float-label">
                          <input style={{width: '100%'}}
                                 type="date"
                                 value={kiraDto.dogumTarihi}
                                 name='dogumTarihi'
                                 fieldHolder='kiraDto'
                                 onChange={(e) => {
                                   handleInput(e, 'dogumTarihi', this, 'kiraDto')
                                 }}/>
                          </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm="11">
                  <div className="content-section implementation">
                    <div className="p-fluid p-grid">
                      <div className="p-field p-col-12 p-md-2">
                        <span className="p-float-label">
                        <Select
                          value={kodId}
                          fieldName='kodId'
                          fieldHolder='kiraDto'
                          options={kodList}
                          onChange={(e) => this.onCinsiyet(e)}
                          optionLabel="label" filter showClear filterBy="label"
                          placeholder="Cinsiyet"/>
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </CardText>
        </Card>
      </Col>
    )
  };

  onCinsiyet = (e) => {
    this.setState({
      kodId: e,
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHKiraciEdit);
