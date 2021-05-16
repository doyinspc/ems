import React from 'react'
import { connect } from 'react-redux'
import { CRow, CCol} from '@coreui/react';

export const PageHeader = (props) => {
    return (
        <CRow xs={12} style={{backgroundColor:'white', height:'100%'}} >
        <CCol xs='3' style={{marginTop:'2px', marginBottom:'2px'}}>
        <img 
            src={process.env.PUBLIC_URL + process.env.REACT_APP_LOGO1}
            className="m-0 p-0" 
            width='150px'
            height='100px'
            alt='admission' 
            onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.png'} }
        />
        </CCol>
        <CCol xs='3' style={{marginTop:'1px', marginBottom:'4px'}}>
        <div className='my-1'>
            <small className='pull-left '>
                <b>
                  
                    MESL Staff School <br/>
                    Kainji & Jebba Hydro Power Plant<br/>
                    07035992972 (Jebba)<br/>
                    07035839707 (Kainji)<br/>
                </b>
            </small>
        </div>
        </CCol>
        <CCol xs='1' style={{marginTop:'1px', marginBottom:'1px'}}></CCol>
        <CCol xs='3' style={{textAlign:'right'}}>
        <div className='my-2'>
            <small className='pull-right '>
                <b>
                {process.env.REACT_APP_ADDR2}
                2nd Floor, ACHILLES PLACE<br/>
                11, Maye Street<br/>
                Off Commercial Avenue
                 <br/>
                 Yaba, Lagos Statet<br/>
                 +234 906 8808 021<br/>
                 info@stresertintegrated.com<br/>
                </b>
               
            </small>
        </div>
        </CCol>
        <CCol xs='2' className='pull-right' style={{ marginTop:'1px'}}>
        <img 
            src={process.env.PUBLIC_URL + process.env.REACT_APP_LOGO2}
            className="m-0 p-0" 
            width='100%'
            height='100px'
            alt='admission' 
            onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.png'} }
        />
        </CCol> 
  </CRow>
    )
}

const mapStateToProps = (state) => ({
    user:state.userReducer.activeSchool
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader)
