import React from "react";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import {Row} from "react-bootstrap";
import EasyInput from "../../custom/EasyInput";
import {MUHSilModal} from "../modal/MUHSilModal";
import {connect} from "react-redux";
import {POST, PUT} from "../../service/Service";
import {MUH_URL} from "../../service/MuhUrl";

class MUHRolEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridApi: null,
      rolDto: {},
      update: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rolDto: nextProps.dto,
      update: nextProps.state.rol.get('update')
    });
  }

  render() {
    const {gridApi, rolDto, update} = this.state;
    const {dispatch, dto} = this.props;

    const kaydet = () => {
      const model = {
        rolId: rolDto.rolId ? rolDto.rolId : null,
        tanim: rolDto.tanim ? rolDto.tanim : null,
        kod: rolDto.kod ? rolDto.kod : null,
        aciklama: rolDto.aciklama ? rolDto.aciklama : null,
        aktif: rolDto.aktif ? rolDto.aktif : null,
      }
      if (update) {
        const response = PUT(MUH_URL.ROL.UPDATE + rolDto.rolId, model, dispatch);
        console.log(response);
      } else {
        const response = POST(MUH_URL.ROL.CREATE, model, dispatch);
        console.log(response);
      }
    };

    return (
      <Col sm="13">
        <Card body style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover', marginTop: '0rem'}}>
          <CardTitle tag="h5">
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Rol Kayıt</h3>
              </div>
              <div className="div-buton" id="div3">
                <div className="kaydet_kapat">
                  <i className="fa fa-save" onClick={kaydet}
                     title="Kaydet"></i>&nbsp;&nbsp;
                  {update ? <MUHSilModal url={MUH_URL.ROL.DELETE + rolDto.rolId} dispatch={dispatch}/> : ''}
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
                    value={rolDto.tanim}
                    label='Rol Tanımı'
                    fieldName='tanim'
                    fieldHolder='rolDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={rolDto.kod}
                    label='Rol Kodu'
                    fieldName='kod'
                    fieldHolder='rolDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={rolDto.aciklama}
                    label='Açıklama'
                    fieldName='aciklama'
                    fieldHolder='rolDto'
                    type='textarea'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={rolDto.aktif}
                    label='Aktif'
                    fieldName='aktif'
                    fieldHolder='rolDto'
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHRolEdit);
