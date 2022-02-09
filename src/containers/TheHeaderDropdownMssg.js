import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdownMssg = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <i className="fa fa-question-circle" style={{color: '#969DA5', fontSize: '1.5rem'}}></i>
        {/*<CIcon name="cil-envelope-open"/><CBadge shape="pill" color="info"></CBadge>*/}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Yardım</strong>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="text-truncate font-weight-bold">Yardım Sayfası</div>
          </div>
        </CDropdownItem>
        {/*<CDropdownItem href="#" className="text-center border-top"><strong>View all messages</strong></CDropdownItem>*/}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg
