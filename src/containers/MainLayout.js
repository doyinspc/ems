import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  MainContent,
  MainSidebar,
  TheFooter,
  MainHeader
} from './index'

const MainLayout = (props) => {
  if(props.user.isAuthenticated !== true)
  {
    return <Redirect to='/login' />
  }
  
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
 user:state.userReducer
})
export default connect(mapStateToProps,{})(MainLayout)
