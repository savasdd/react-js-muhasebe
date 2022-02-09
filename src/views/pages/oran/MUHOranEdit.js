import React from "react";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import {Row} from "react-bootstrap";
import EasyInput from "../../custom/EasyInput";
import {MUHSilModal} from "../modal/MUHSilModal";
import {connect} from "react-redux";
import {POST, PUT} from "../../service/Service";
import {MUH_URL} from "../../service/MuhUrl";

class MUHOranEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridApi: null,
      oranDto: {},
      update: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      oranDto: nextProps.dto,
      update: nextProps.state.oran.get('update')
    });
  }

  render() {
    const {gridApi, oranDto, update} = this.state;
    const {dispatch, state} = this.props;

    const kaydet = () => {
      const model = {
        oranId: oranDto.oranId ? oranDto.oranId : null,
        tanim: oranDto.tanim ? oranDto.tanim : null,
        oran: oranDto.oran ? oranDto.oran : null,
        yil: oranDto.yil ? oranDto.yil : null,
        aktif: oranDto.aktif ? oranDto.aktif : null,
      }
      if (update) {
        const response = PUT(MUH_URL.ORAN.UPDATE + oranDto.oranId, model, dispatch);
        console.log(response);
      } else {
        const response = POST(MUH_URL.ORAN.CREATE, model, dispatch);
        console.log(response);
      }
    };

    return (
      <Col sm="13">
        <Card body style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover', marginTop: '0rem'}}>
          <CardTitle tag="h5">
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Oran Kayıt</h3>
              </div>
              <div className="div-buton" id="div3">
                <div className="kaydet_kapat">
                  <i className="fa fa-save" onClick={kaydet}
                     title="Kaydet"></i>&nbsp;&nbsp;
                  {update ? <MUHSilModal url={MUH_URL.ORAN.DELETE + oranDto.oranId} dispatch={dispatch}/> : ''}
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
                    value={oranDto.tanim}
                    label='Tanım'
                    fieldName='tanim'
                    fieldHolder='oranDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={oranDto.oran}
                    label='Oran'
                    fieldName='oran'
                    fieldHolder='oranDto'
                    type='number'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={oranDto.yil}
                    label='Yıl'
                    fieldName='yil'
                    fieldHolder='oranDto'
                    type='number'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={oranDto.aktif}
                    label='Aktif'
                    fieldName='aktif'
                    fieldHolder='oranDto'
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHOranEdit);
