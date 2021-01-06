import React from 'react'
import {connect} from 'react-redux'
import {
  MainContent,
  MainSidebar,
  TheFooter,
  MainHeader
} from './index'

const MainLayout = (props) => {

  return (
    <div className="c-app c-default-layout">
      <MainSidebar  />
      <div className="c-wrapper">
        <MainHeader  />
        <div className="c-body">
          <MainContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}
const mapStateToProps = (state)=>({
 user:state.userReducer.user
})
export default connect(mapStateToProps,{})(MainLayout)
