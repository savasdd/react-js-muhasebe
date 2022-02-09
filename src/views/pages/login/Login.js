import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {connect} from "react-redux";
import request from "axios";
import {MUH_URL} from "../../service/MuhUrl";
import cookie from "react-cookies";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    }
  }

  render() {
    const {username, password} = this.state;
    const {dispatch, state} = this.props;

    const onKullanici = (e) => {
      this.setState({
        username: e,
      });
    };

    const onSifre = (e) => {
      this.setState({
        password: e,
      });
    };

    const LoginFunct = () => {
      const dto = {
        username: username,
        password: btoa(password)
      };

      // if (username === '1' && password === '1')
      //   window.location = '/dashboard';

      return request({
        url: MUH_URL.MUH_TOKEN,
        method: 'POST',
        data: dto,
      }).then(async function (response) {
        response = response.data;
        if (response.token) {
          cookie.save('tkn', response.token, {path: '/'});
          window.location = '/dashboard';
        } else {
          console.log("hata1");
          toast.error('Kullanıcı bulunamadı!');
        }
      }).catch(function (error) {
        toast.error('Kullanıcı bulunamadı!');
        console.log("hata2 " + error);
      });

    };

    return (
      <div className="p-md-5 mb-2 bg-gradient-info">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="2">
              <CCardGroup className="p-4">
                <div className="text-center">
                  <CImg
                    src={'avatars/muh_logo.jpg'}
                    alt="admin@bootstrapmaster.com"
                    style={{
                      height: '11rem',
                      width: '11rem',
                      marginBottom: '2vh',
                      background: 'white',
                      borderRadius: '500vh',
                      boxShadow: '0px 6px 23px -5px rgba(0, 0, 0, 0.49)',
                      backgroundPosition: 'center center !important',
                      backgroundRepeat: 'no-repeat !important',
                      backgroundSize: '90% !important'
                    }}
                  />
                </div>
              </CCardGroup>
            </CCol>
          </CRow>

          <CRow className="justify-content-center">
            <CCol md="5">
              <CCardGroup>
                <CCard className="p-4" style={{
                  borderRadius: '2vh',
                  boxShadow: '0px 6px 23px -5px rgba(0, 0, 0, 0.49)',
                  backgroundPosition: 'center center !important',
                  backgroundRepeat: 'no-repeat !important',
                  backgroundSize: '90% !important'
                }}>
                  <CCardBody>
                    <CForm>
                      <h3 className="text-center"
                          style={{marginBottom: '4vh'}}>MUHASEBE YÖNETİM SİSTEMİ</h3>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user"/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Kullanıcı Adı" value={username}
                                onChange={(e) => onKullanici(e.target.value)} autoComplete="username"/>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked"/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Şifre" value={password}
                                onChange={(e) => onSifre(e.target.value)} autoComplete="current-password"/>
                      </CInputGroup>
                      <CRow>
                        <CCol xs="11" className="text-center">
                          <CButton color="primary" className="px-4" onClick={LoginFunct}>Giriş</CButton>
                        </CCol>
                        {/*<CCol xs="6" className="text-right">*/}
                        {/*  <CButton color="link" className="px-0">Forgot password?</CButton>*/}
                        {/*</CCol>*/}
                      </CRow>

                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        <ToastContainer/>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    state: state
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

