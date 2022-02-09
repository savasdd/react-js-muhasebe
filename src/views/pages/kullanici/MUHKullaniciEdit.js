import React from "react";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import {connect} from 'react-redux';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {Row} from "react-bootstrap";
import EasyInput from "../../custom/EasyInput";
import {MUHSilModal} from "../modal/MUHSilModal";
import {POST, PUT} from "../../service/Service";
import {MUH_URL} from "../../service/MuhUrl";

class MUHKullaniciEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridApi: null,
      kullaniciDto: {},
      update: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      kullaniciDto: nextProps.dto,
      update: nextProps.state.kullanici.get('update')
    });
  }


  render() {
    const {gridApi, kullaniciDto, update} = this.state;
    const {dispatch, state, dto} = this.props;

    const kaydet = () => {
      const model = {
        kullaniciId: kullaniciDto.kullaniciId ? kullaniciDto.kullaniciId : null,
        ad: kullaniciDto.ad ? kullaniciDto.ad : null,
        soyad: kullaniciDto.soyad ? kullaniciDto.soyad : null,
        tckn: kullaniciDto.tckn ? kullaniciDto.tckn : null,
        kullaniciAdi: kullaniciDto.kullaniciAdi ? kullaniciDto.kullaniciAdi : null,
        sifre: kullaniciDto.sifre ? kullaniciDto.sifre : null,
      }

      if (update) {
        const response = PUT(MUH_URL.KULLANICI.UPDATE + kullaniciDto.kullaniciId, model, dispatch);
        console.log(response);
      } else {
        const response = POST(MUH_URL.KULLANICI.CREATE, model, dispatch);
        console.log(response);
      }
    };

    return (
      <Col sm="13">
        <Card body style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover', marginBottom: '0rem'}}>
          <CardTitle tag="h5">
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Kullanıcı Kayıt</h3>
              </div>
              <div className="div-buton" id="div3">
                <div className="kaydet_kapat">
                  <i className="fa fa-save" onClick={kaydet}
                     title="Kaydet"></i>&nbsp;&nbsp;
                  {update ?
                    <MUHSilModal url={MUH_URL.KULLANICI.DELETE + kullaniciDto.kullaniciId} dispatch={dispatch}/> : ''}
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
                    value={kullaniciDto.ad}
                    label='Ad'
                    fieldName='ad'
                    fieldHolder='kullaniciDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kullaniciDto.soyad}
                    label='Soyad'
                    fieldName='soyad'
                    fieldHolder='kullaniciDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kullaniciDto.tckn}
                    label='T.C. No'
                    fieldName='tckn'
                    fieldHolder='kullaniciDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kullaniciDto.kullaniciAdi}
                    label='Kullanıcı Adı'
                    fieldName='kullaniciAdi'
                    fieldHolder='kullaniciDto'
                    component={this}/>
                </Col>
                <Col sm="11">
                  <EasyInput
                    value={kullaniciDto.sifre}
                    label='Şifre'
                    fieldName='sifre'
                    fieldHolder='kullaniciDto'
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
export default connect(mapStateToProps, mapDispatchToProps)(MUHKullaniciEdit);
