import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// sidebar nav config
import navigation from './_nav1'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.page.sidebarShow)
  
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
        <img
        src={process.env.PUBLIC_URL +'/avatars/logo1.png'}
        height='60px'/>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
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
  )
}

export default React.memo(TheSidebar)
