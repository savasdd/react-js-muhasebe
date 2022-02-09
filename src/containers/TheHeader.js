import React from 'react'
import {connect} from 'react-redux'
import {CBreadcrumbRouter, CHeader, CHeaderBrand, CHeaderNav, CImg, CSubheader, CToggler} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import {TheHeaderDropdown, TheHeaderDropdownMssg,} from './index'
import {SIDEBAR_SHOW} from "../views/actions/Types";
import {InputText} from "primereact/inputtext";

class TheHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarShow: 'responsive',
      text: '',
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({
      sidebarShow: nextProps.state.main.get('sidebarShow'),
    });

  }

  async componentDidMount() {
  }


  render() {
    const {sidebarShow, text} = this.state;
    const {dispatch} = this.props;

    const toggleSidebar = () => {
      const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
      dispatch({type: SIDEBAR_SHOW, data: {sidebarShow: val}});
    };

    const toggleSidebarMobile = () => {
      const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
      dispatch({type: SIDEBAR_SHOW, data: {sidebarShow: val}});
    };

    return (
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon name="logo" height="48" alt="Logo"/>
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none mr-auto">
          {/*<CHeaderNavItem className="px-3">*/}
          {/*  <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>*/}
          {/*</CHeaderNavItem>*/}
          <div className="c-avatar">
            <CImg
              src={'../avatars/muh_logo.jpg'}
              alt="admin@bootstrapmaster.com"
              style={{
                height: '2.4rem',
                width: '2.4rem',
                background: 'white',
                borderRadius: '500vh',
                boxShadow: '0px 6px 23px -5px rgba(0, 0, 0, 0.49)',
                backgroundPosition: 'center center !important',
                backgroundRepeat: 'no-repeat !important',
                backgroundSize: '90% !important',
                marginLeft: '2rem'
              }}
            />
          </div>
          <h1 style={{
            marginLeft: '1.5rem',
            marginTop: '0.5rem',
            backgroundPosition: 'center center !important',
            backgroundRepeat: 'no-repeat !important',
            backgroundSize: '90% !important',
            fontFamily: 'Comic Sans',
            alignItems: 'center',
            fontWeight: '600',
            color: '#85929E'
          }}>MUHASEBE YÖNETİM SİSTEMİ</h1>


        </CHeaderNav>
        <CHeaderNav className="px-3">
          {/*<TheHeaderDropdownNotif/>*/}
          {/*<TheHeaderDropdownTasks/>*/}
          <TheHeaderDropdownMssg/>
          <TheHeaderDropdown/>
        </CHeaderNav>

        <CSubheader className="px-3 justify-content-between">
          <div id="ana_div">
            <div className="div-header-alert" id="div">
              <CBreadcrumbRouter
                className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                routes={routes}
              />
            </div>
            <div className="div-alert">
              <InputText
                disabled={true}
                placeholder={text}
                style={{
                  fontSize: '1.8rem',
                  width: '55rem',
                  border: '0rem',
                }}
              />
            </div>
          </div>
        </CSubheader>
      </CHeader>
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

export default connect(mapStateToProps, mapDispatchToProps)(TheHeader);
