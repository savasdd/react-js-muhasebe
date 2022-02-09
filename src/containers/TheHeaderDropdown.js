import React from 'react'
import {CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg} from '@coreui/react'
import cookie from "react-cookies";
import CIcon from '@coreui/icons-react'

class TheHeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: ''
    };
  }

  async componentDidMount() {
    // if (cookie.load('tkn') !== undefined) {
    //   const response = await request({
    //     url: MUH_URL.GVN_KULLANICI_GET_FOTO,
    //     method: 'GET',
    //     headers: MUH_URL.HEADER
    //   });
    //
    //   this.setState({
    //     name: response.data.name !== undefined ? response.data.name : 'ADMİN',
    //     image: response.data.fotograf !== undefined ? atob(response.data.fotograf) : '../avatars/bg.jpg',
    //   });
    // }
  }

  logout = () => {
    cookie.save('tkn', undefined, {path: '/'});
    window.location = '/Login';
  };

  render() {
    const {image, name} = this.state;

    return (
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={image}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
              style={{
                height: '2.4rem',
                width: '2.4rem',
                background: 'white',
                borderRadius: '500vh',
              }}
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">

          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center">
            <strong>{name}</strong>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-user" className="mfe-2"/>Profilim
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-settings" className="mfe-2"/>
            Ayarlar
          </CDropdownItem>
          <CDropdownItem divider/>
          <CDropdownItem>
            <CIcon name="cil-lock-locked" className="mfe-2"/>
            <CButton onClick={this.logout}>Çıkış</CButton>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    )
  }
};

export default TheHeaderDropdown
