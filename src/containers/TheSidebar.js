import React from 'react'
import {connect} from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarMinimizer,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle,
} from '@coreui/react'

import cookie from "react-cookies";
import {SIDEBAR_SHOW} from "../views/actions/Types";
import muh_nav from "../views/util/muh_nav";

class TheSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'responsive',
      menu: []
    }
  }

  async componentDidMount() {
    if (cookie.load('tkn') !== undefined) {
      await this.getMenu();
    }
    await this.getMenu();
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.state.main.get('sidebarShow'),
    });
  }

  getMenu = async () => {
    this.setState({
      menu: muh_nav,
    });
  };

  render() {
    const {show, menu} = this.state;
    const {dispatch} = this.props;

    return (
      <CSidebar
        show={show}
        onShowChange={(val) => dispatch({type: SIDEBAR_SHOW, data: {sidebarShow: val}})}
      >
        {/*<CSidebarBrand className="d-md-down-none" to="/">*/}
        {/*  <CIcon*/}
        {/*    className="c-sidebar-brand-full"*/}
        {/*    name="logo-negative"*/}
        {/*    height={35}*/}
        {/*  />*/}
        {/*  <CIcon*/}
        {/*    className="c-sidebar-brand-minimized"*/}
        {/*    name="sygnet"*/}
        {/*    height={35}*/}
        {/*  />*/}
        {/*</CSidebarBrand>*/}
        <CSidebarNav>

          <CCreateElement
            items={menu}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none"/>
      </CSidebar>
    );
  }
};

function mapStateToProps(state) {
  return {
    state: state,
    menu: state.main.get('menu'),
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TheSidebar));
