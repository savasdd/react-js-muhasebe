import React from "react";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import {Row} from "react-bootstrap";
import EasyInput from "../../custom/EasyInput";
import {MUHSilModal} from "../modal/MUHSilModal";
import Select from "react-select";
import {connect} from "react-redux";
import {getKod, POST, PUT} from "../../service/Service";
import {MUH_URL} from "../../service/MuhUrl";

class MUHHesapEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridApi: null,
      kodList: [{}],
      hesapDto: {},
      update: false,
      kodId: null
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({
      hesapDto: nextProps.dto,
      update: nextProps.state.hesap.get('update'),
      kodList: await getKod(MUH_URL.KOD.GETUST + 'KOD_HESAP'),
    });
  }


  render() {
    const {gridApi, kodList, hesapDto, update, kodId} = this.state;
    const {dispatch, state} = this.props;

    const kaydet = () => {
      const model = {
        hesapId: hesapDto.hesapId ? hesapDto.hesapId : null,
        tanim: hesapDto.tanim ? hesapDto.tanim : null,
        hesapNo: hesapDto.hesapNo ? hesapDto.hesapNo : null,
        aktif: hesapDto.aktif ? hesapDto.aktif : null,
        kod: {kodId: kodId ? kodId.value : null},
      }

      if (update) {
        const response = PUT(MUH_URL.HESAP.UPDATE + hesapDto.hesapId, model, dispatch);
        console.log(response);
      } else {
        const response = POST(MUH_URL.HESAP.CREATE, model, dispatch);
        console.log(response);
      }
    };

    return (
      <Col sm="13">
        <Card body style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover', marginTop: '0rem'}}>
          <CardTitle tag="h5">
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Hesap Kayıt</h3>
              </div>
              <div className="div-buton" id="div3">
                <div className="kaydet_kapat">
                  <i className="fa fa-save" onClick={kaydet}
                     title="Kaydet"></i>&nbsp;&nbsp;
                  {update ? <MUHSilModal url={MUH_URL.HESAP.DELETE + hesapDto.hesapId} dispatch={dispatch}/> : ''}
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
                    value={hesapDto.tanim}
                    label='Hesap Adı'
                    fieldName='tanim'
                    fieldHolder='hesapDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={hesapDto.hesapNo}
                    label='Hesap No'
                    fieldName='hesapNo'
                    fieldHolder='hesapDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <div className="content-section implementation">
                    <div className="p-fluid p-grid">
                      <div className="p-field p-col-12 p-md-2">
                        <span className="p-float-label">
                          <Select
                            value={kodId}
                            fieldName='kodId'
                            fieldHolder='hesapDto'
                            options={kodList}
                            onChange={(e) => this.onHesap(e)}
                            optionLabel="label" filter showClear filterBy="label"
                            placeholder="Hesap Kodu"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={hesapDto.aktif}
                    label='Aktif'
                    fieldName='aktif'
                    fieldHolder='hesapDto'
                    type='boolean'
                    lefted={true}
                    component={this}/>
                </Col>
              </Row>
            </div>
          </CardText>
        </Card>
      </Col>
    );
  };

  onHesap = (e) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHHesapEdit);
