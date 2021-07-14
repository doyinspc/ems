import React from 'react'
import { connect } from 'react-redux'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Schoolbar = (props) => {
  let data = props.user.schools
  const itemsCount = 0

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-home" /><CBadge shape="pill" color="info">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Schools</strong>
        </CDropdownItem>
        <CDropdownItem href="#" className="text-center border-top"><strong>View all messages</strong></CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const mapStateToProps = (state) => ({
    user:state.userReducer
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Schoolbar)