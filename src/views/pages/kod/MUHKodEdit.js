import React from 'react';
import {Card, CardText, CardTitle, Col} from "reactstrap";
import {Row} from "react-bootstrap";
import EasyInput from "../../custom/EasyInput";
import {MUHSilModal} from "../modal/MUHSilModal";
import {POST, PUT} from "../../service/Service";
import {MUH_URL} from "../../service/MuhUrl";
import {connect} from "react-redux";

class MUHKodEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridApi: null,
      kodDto: {},
      update: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      kodDto: nextProps.dto,
      update: nextProps.state.kod.get('update')
    });
  }

  render() {
    const {gridApi, kodDto, update} = this.state;
    const {dispatch, state, dto} = this.props;

    const kaydet = () => {
      const model = {
        kodId: kodDto.kodId ? kodDto.kodId : null,
        ustKod: kodDto.ustKod ? kodDto.ustKod : null,
        tanim: kodDto.tanim ? kodDto.tanim : null,
        kod: kodDto.kod ? kodDto.kod : null,
        siraNo: kodDto.siraNo ? kodDto.siraNo : null,
        aciklama: kodDto.aciklama ? kodDto.aciklama : null,
      }

      if (update) {
        const response = PUT(MUH_URL.KOD.UPDATE + kodDto.kodId, model, dispatch);
        console.log(response);
      } else {
        const response = POST(MUH_URL.KOD.CREATE, model, dispatch);
        console.log(response);
      }
    };

    return (
      <Col sm="13">
        <Card body style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover', marginTop: '0rem'}}>
          <CardTitle tag="h5">
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Kod Kayıt</h3>
              </div>
              <div className="div-buton" id="div3">
                <div className="kaydet_kapat">
                  <i className="fa fa-save" onClick={kaydet}
                     title="Kaydet"></i>&nbsp;&nbsp;
                  {update ? <MUHSilModal url={MUH_URL.KOD.DELETE + kodDto.kodId} dispatch={dispatch}/> : ''}
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
                    value={kodDto.ustKod}
                    label='Üst Kod'
                    fieldName='ustKod'
                    fieldHolder='kodDto'
                    disabled={true}
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kodDto.tanim}
                    label='Tanım'
                    fieldName='tanim'
                    fieldHolder='kodDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kodDto.kod}
                    label='Kod'
                    fieldName='kod'
                    fieldHolder='kodDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kodDto.siraNo}
                    label='Sıra No'
                    fieldName='siraNo'
                    fieldHolder='kodDto'
                    component={this}
                  />
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kodDto.aciklama}
                    label='Açıklama'
                    fieldName='aciklama'
                    fieldHolder='kodDto'
                    type='textarea'
                    component={this}/>
                </Col>
              </Row>
            </div>
          </CardText>
        </Card>
      </Col>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHKodEdit);
