import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStudentfeeSummary } from './../../../actions/student/studentfee';

import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CTooltip
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { nairaformat } from '../../../actions/common';


const Dashboards= (props) => {
    let termid = props.termid;
    let sessionid = props.sessionid;
    
    useEffect(() => {
        let params = {
            data:JSON.stringify(
            {
                'sessionid':sessionid,
                'termid':termid
            }),
            cat:'studentfees',
            table:'studentfees',
            narration:'get studentfees'
            // cat:'datasummary',
            // table:'access',
            // narration:'get all schools'
            }
        props.getStudentfeeSummary(params)
    }, [termid, sessionid])

    const summer = (arr) =>{
      if(arr !== undefined && Array.isArray(arr))
      {
        let ar = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        return ar;
      }else
      {
        return 0;
      }
  
    }
   let datas = props.summary && Array.isArray(props.summary) ? props.summary.filter(rw=>rw.id !== null):[];
  
   let struc = {};
  datas.forEach((ele)=>{
    if(struc.hasOwnProperty(ele.studentid))
    {
        struc[ele.studentid][parseInt(ele.grp)].push(parseFloat(ele.amount))
    }else
    {
        struc[ele.studentid] = {}
        struc[ele.studentid][0] = []
        struc[ele.studentid][1] = []
        struc[ele.studentid][2] = ele.studentname;
        struc[ele.studentid][3] = ele.classname;
        struc[ele.studentid][4] = ele.classid;

        if(parseInt(ele.grp) === 0)
        {
          struc[ele.studentid][0].push(parseFloat(ele.amount))
        }else
        {
          struc[ele.studentid][1].push(parseFloat(ele.amount))
        }
    }
  })

  let strucs = []
  Object.keys(struc).forEach((ele)=>{
      let struc1 = {};
      struc1[0] = struc[ele][0].reduce((a, b) => a + b, 0);
      struc1[1] = struc[ele][1].reduce((a, b) => a + b, 0);
      struc1[2] = struc[ele][2];
      struc1[3] = struc[ele][3];
      struc1[4] = struc[ele][4];
      strucs.push(struc1);
  })


  let sumar = {}
  strucs.forEach(ele=>{
    if(sumar.hasOwnProperty(ele[4]))
    {
      sumar[ele[4]][0].push(ele[0])
      sumar[ele[4]][1].push(ele[1])
      let dif = parseFloat(ele[0]) - parseFloat(ele[1]);
        if(dif >= 0)
        {
          //student still owing
          if(dif !== undefined && dif !== 'undefined')
          {
            sumar[ele[4]][3].push(dif)
          } 
        }else if(parseFloat(dif) < 0 )
        {
          //student been owed
          sumar[ele[4]][4].push(dif * -1)
        }
    }else
    {
        sumar[ele[4]] = {}
        sumar[ele[4]][0] = []
        sumar[ele[4]][1] = []
        sumar[ele[4]][0].push(ele[0])
        sumar[ele[4]][1].push(ele[1])
        sumar[ele[4]][2] = ele[3];
        sumar[ele[4]][3] = []
        sumar[ele[4]][4] = []

        let dif = parseFloat(ele[0]) - parseFloat(ele[1]);
        if(parseFloat(dif) >= 0 )
        {
          if(dif !== undefined && dif !== 'undefined')
          {
            sumar[ele[4]][3].push(dif)
          } 
        }
        else if(parseFloat(dif) < 0 )
        {
          sumar[ele[4]][4].push(dif * -1)
        }
    }
  })
  
  let sumarx = []
  let sumfee = []
  let sumpay = []
  let sumowe = []
  let sumdeb = []
  Object.keys(sumar).forEach(ele=>{
      let sumar1 = {};
      sumar1[0] = sumar[ele][1].reduce((a, b) => a + b, 0);
      sumar1[1] = sumar[ele][0].reduce((a, b) => a + b, 0);
      sumar1[3] = sumar[ele][4].reduce((a, b) => a + b, 0);
      sumar1[4] = sumar[ele][3].reduce((a, b) => a + b, 0);
      sumar1[2] = sumar[ele][2];
      sumarx.push(sumar1);
      sumfee.push(sumar[ele][1].reduce((a, b) => a + b, 0))
      sumpay.push(sumar[ele][0].reduce((a, b) => a + b, 0))
      sumdeb.push(sumar[ele][4].reduce((a, b) => a + b, 0))
      sumowe.push(sumar[ele][3].reduce((a, b) => a + b, 0))
  })
   
  
   let sfee = 0;
   let spay = 0;
   let spop = 0;

   let naira = nairaformat;
  return (
    <>
     <CRow>
        <CCol>
          <CCard>
            <CCardBody>
            <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Fees</h4>
                <div className="small text-muted">{moment(new Date()).format('MMMM YYYY')}</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CTooltip content="Click to download/reload">
              <CButton color="primary" className="float-right">
                <CIcon 
                name="cil-cloud-download"/>
              </CButton>
              </CTooltip>
              <CButtonGroup className="float-right mr-3">
                {
                  ['Term', 'Session'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Term'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>

              <CRow>
              <CCol xs="12" md="12" xl="12">
              <CRow>
                    <CCol xs={12} sm={6} md={6}>
                      <CCallout color="info">
                        <small className="text-muted">Expected Fees</small>
                        <br />
            <strong className="h5">{nairaformat(summer(sumfee))}</strong>
                      </CCallout>
                    </CCol>
                    <CCol xs={12} sm={6} md={6}>
                      <CCallout color="success">
                        <small className="text-muted">Payments</small>
                        <br />
            <strong className="h5">{nairaformat(summer(sumpay))}</strong>
                      </CCallout>
                    </CCol>
                    <CCol xs={12} sm={6} md={6}>
                      <CCallout color="secondary">
                        <small className="text-muted">Excess Payments</small>
                        <br />
            <strong className="h5">{nairaformat(summer(sumowe))}</strong>
                      </CCallout>
                    </CCol>
                    <CCol xs={12} sm={6} md={6}>
                      <CCallout color="danger">
                        <small className="text-muted">Debt</small>
                        <br />
            <strong className="h5">{nairaformat(summer(sumdeb))}</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                
                {sumarx.map((prop, index)=>{
                  return <CRow key={index}>
                  <CCol>
                <div className="progress-group mb-4">
                  <div className="progress-group-bars">
                  <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-money" />
                        <span className="title">{prop[2]}</span>
                <span className="ml-auto font-weight-bold">{Math.floor(( (parseInt(prop[0])- (parseInt(prop[3]) + parseInt(prop[4])))  / parseInt(prop[0])) * 100)}%</span>
                        </div>
                    <CProgress className="progress-xs" color="warning" value={parseInt(prop[4])} />
                    </div>
                </div>
                </CCol>
                      <CCol xs={2}>
                      <div className="progress-group-prepend">
                    <span className="progress-group-text pull-right m-auto">
                      <strong><strong className="text-danger">{nairaformat(prop[3])}</strong></strong>
                    </span>
                  </div>
                   </CCol>
                </CRow>
                  })}

                  <hr className="mt-0" />
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="warning">&nbsp;</CBadge></sup>
                      Percentage paid
                     
                    </small>
                  </div>
                </CCol>
              </CRow>
              <br />
    

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
   
    </>
  )
}

const mapStateToProps = (state) =>({
    summary:state.studentfeeReducer.studentfeesummary
  })
export default connect(mapStateToProps,{getStudentfeeSummary})(Dashboards)
  
  
