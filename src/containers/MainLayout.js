import React from 'react'
import {
  MainContent,
  MainSidebar,
  TheFooter,
  MainHeader
} from './index'

const MainLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <MainSidebar/>
      <div className="c-wrapper">
        <MainHeader/>
        <div className="c-body">
          <MainContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default MainLayout
