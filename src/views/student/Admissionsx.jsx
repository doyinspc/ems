import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { getAdmission } from '../../actions/setting/admission'
import PageHeader  from './../staff/PageHeader'

const Register = (props) => {
let adm = useParams().admit;
useEffect(() => {
    props.getAdmission(adm)
}, [adm])

let {
    id,
    abbrv,
    surname,
    firstname,
    middlename,
    cclass,
    schoolid,
    schoolname,
    session,
    address,
    status,
    signed

} = props.admission || {}
  return (
    <div className="m-0 pr-4 container-fluid" style={{margin:'0px', padding:'0px', height:'859px'}}>
        <br/>
        <br/>
        <div style={{marginLeft:'auto', marginRight:'auto', marginBottom:'5px', backgroundColor:'white', height:'859px'}}>
                <CContainer style={{height:'859px'}}>
                <CRow xs={12} style={{backgroundColor:'white', }} >
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

                         <CRow xs={12} >
                              <CCol className='m-0 p-1' xs={12} >
                                <br/>
                                <div className='headBar pull-right' style={{fontSize:'20px',marginTop:'10px', marginBotom:'10px'}}>
                                    <strong> REF:{abbrv}{session}/{id}</strong>
                                   <br/>
                                   <br/>
                                   {moment(new Date()).format('MMMM DD, YYYY')}
                                </div>
                                <br/>
                                <br/>
                                <div className='headBar' style={{marginTop:'80px', marginBotTom:'10px', fontSize:'25px', textAlign:'left', lineHeight:'100%'}}> 
                                <strong>{`${surname} ${firstname} ${middlename}`}</strong><br/>
                                  {address}
                                </div>
                                <div className='addressBar' style={{marginTop:'100px', marginBottom:'50px'}}>
                                    <p className='h1'><u>Admission Letter</u></p>
                                </div>
                                <div className='titleBar'>
                                    <p  style={{marginTop:'20px', fontSize:'25px', textAlign:'justify', lineHeight:'200%'}}>
  Following your performance at our <strong>{session}</strong> Academic Session entrance examination and interveiw exercise, 
  we are pleased to inform you that you have been offered <strong>{status}</strong> into <strong>{cclass}</strong> class at
  <strong> {schoolname}</strong> .
                                    </p>
                               
                                    <p  style={{marginTop:'25px', fontSize:'25px', textAlign:'justify', lineHeight:'200%'}}>
                                        Attached to this letter you will find a full admission package along with specific details on how you can accept this offer. 
                                        We ask that you respond to this offer within two (2) weeks effective from the date of issuance of this letter as indicated above. 
                                        Failure to do so will result in the immediate withdrawal of this offer.
                                    </p>
                                    <p  style={{marginTop:'25px', fontSize:'25px', textAlign:'justify', lineHeight:'200%'}}>
                                        Once again, congratulations. We hope to hear from you soon.
                                    </p>
                                </div>
                                <br/><br/>
                                <div className='footerBar' style={{marginTop:'25px', fontSize:'25px', textAlign:'justify', lineHeight:'200%'}}>
                                <CRow>
                                    <CCol>
                                        Yours Sincerely,<br/><br/>
                                       {/*  <img 
                                    src='avatars/sign.png'
                                    className="m-0 p-0" 
                                    width='200px'
                                    height='120px'
                                    alt='admission' 
                                    onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.png'} }
                                /> */}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol>
                            <strong>{signed}</strong><br/>
                                    for : School Management
                                    </CCol>
                                </CRow>
                                </div>
                              </CCol>
                             </CRow>
                          </CContainer>   
                         
                  </div>
              
      
    </div>
  )
}

const mapStateToProps = (state) =>({
    admission:state.admissionReducer.admission
})
export default connect(mapStateToProps, {getAdmission})(Register)