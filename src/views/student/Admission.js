import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import * as html2pdf from 'html2pdf.js'
import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { getAdmission } from '../../actions/setting/admission'

const Admission = (props) => {
let adm = useParams().admit;
const [show, setshow] = useState(true)
useEffect(() => {
    props.getAdmission(adm)
}, [adm])



let {
    id,
    surname,
    firstname,
    middlename,
    abbrv,
    cclass,
    schoolid,
    schoolname,
    session,
    address,
    status,
    signed

} = props.admission || {}

let nm = abbrv+"_"+surname+"_"+firstname+"_"+middlename+".pdf"
const loadpdf = () => {
    if(parseInt(props.admission.id) > 0 ){
    var element = document.getElementById('maincont');
    var opt = {
        margin:       0.3,
        filename:     nm,
        maxnrofpages: 1,
        image:        { type: 'png' },
        html2canvas:  { scale: 3 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
    // Old monolithic-style usage:
    html2pdf(element, opt);
    }
}

loadpdf()
  return (
    <div className="m-10 p-1 container html2pdf__page-break" id="maincont" >
        <div style={{marginLeft:'auto', marginRight:'auto', marginBottom:'5px', backgroundColor:'white'}}>
                <CContainer >
                          <CRow xs={12} style={{backgroundColor:'white', height:'100%'}} >
                                <CCol xs='3' style={{marginTop:'2px', marginBottom:'2px'}}>
                                <img 
                                    onClick={loadpdf}
                                    src={process.env.PUBLIC_URL+'/avatars/logo.png'}
                                    className="m-0 p-0" 
                                    width='100%'
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
                                    src='/avatars/logo1.png'
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
                                <br/>
                                <div className='headBar pull-right' style={{fontSize:'20px',marginTop:'10px', marginBottom:'10px'}}>
                                <small><strong> REF:{abbrv}{session}/{id}</strong></small>
                                   <br/>
                                   <small>{moment(new Date()).format('MMMM DD, YYYY')}</small>
                                </div>
                                <br/>
                                <div className='headBar' style={{marginTop:'80px', marginBotTom:'10px', fontSize:'20px', textAlign:'left', lineHeight:'100%'}}> 
                                <strong>{`${surname} ${firstname} ${middlename}`}</strong><br/>
                                  {address}
                                </div>
                                <br/>
                                <div className='addressBar' style={{marginTop:'10px', marginBottom:'10px'}}>
                                    <p className='h3'><u>Admission Letter</u></p>
                                </div>
                                <div className='titleBar'>
                                    <p  style={{marginTop:'20px', fontSize:"15px", textAlign:'justify', lineHeight:'200%'}}>
  Following your performance at our <strong>{session}</strong> Academic Session entrance examination and interveiw exercise, 
  we are pleased to inform you that you have been offered <strong>{status}</strong> into <strong>{cclass}</strong> class at
  <strong> {schoolname}</strong> .
                                    </p>
                               
                                    <p  style={{marginTop:'25px', fontSize:"15px", textAlign:'justify', lineHeight:'200%'}}>
                                        Attached to this letter you will find a full admission package along with specific details on how you can accept this offer. 
                                        We ask that you respond to this offer within two (2) weeks effective from the date of issuance of this letter as indicated above. 
                                        Failure to do so will result in the immediate withdrawal of this offer.
                                    </p>
                                    <p  style={{marginTop:'25px', fontSize:"15px", textAlign:'justify', lineHeight:'200%'}}>
                                        Once again, congratulations. We hope to hear from you soon.
                                    </p>
                                </div>
                                <br/><br/>
                                <div className='footerBar' style={{marginTop:'15px', fontSize:'15px', textAlign:'justify', lineHeight:'200%'}}>
                                <CRow>
                                    <CCol>
                                        Yours Sincerely,<br/><br/><br/>
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
export default connect(mapStateToProps, {getAdmission})(Admission)
