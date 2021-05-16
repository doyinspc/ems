import React from 'react';
import { connect } from 'react-redux';
import {CRow, CCol} from '@coreui/react';

const Dashboards= (props) => {
   
  return (
    <>
    <CRow xs={12} style={{backgroundColor:'white', height:'100%'}} >
        <CCol xs={2} style={{marginTop:'2px', marginBottom:'2px'}}>
        <img 
            src={process.env.REACT_APP_SERVER_URL +"/"+ props.user.links}
            className="m-0 p-0" 
            width='150px'
            height='100px'
            alt='admission' 
            onError={(e)=>{e.target.onerror=null; e.target.src= process.env.PUBLIC_URL+process.env.REACT_APP_LOGO} }
        />
        </CCol>
        <CCol xs={8} style={{marginTop:'1px', marginBottom:'4px'}}>
            <div className='my-1'>
                <h3 className='pull-left'>
                    <b>
                        {props.user.name}<br/>
                        <small>{`${props.user.phone1} ${props.user.phone2}`}</small>
                    </b>
                </h3>
            </div>
        </CCol>
        <CCol xs={2} style={{marginTop:'2px', marginBottom:'2px'}}>
        <div className="c-avata">
                <img 
                    src={process.env.REACT_APP_SERVER_URL+ props.photo} 
                    className="c-" 
                    style={{width:'120px'}}
                    alt={props.admission_no} 
                    onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/avatars/1.png'} }
                />
                       </div>
        </CCol>
  </CRow>

    </>
  )
}

const mapStateToProps = (state) =>({
    user:state.userReducer.activeschool,
})
export default connect(mapStateToProps,{})(Dashboards)