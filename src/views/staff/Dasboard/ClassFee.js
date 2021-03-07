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
} from '@coreui/react'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs';
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
                'termid':termid,
                'typeid':2
            }),
            cat:'datasummary',
            table:'access',
            narration:'get all schools'
            }
        props.getStudentfeeSummary(params)
        return () => {
            //cleanup
        }
    }, [termid, sessionid])

    
 
    
   
   let data = props.summary && Array.isArray(props.summary) ? props.summary.filter(rw=>rw.id !== null):[];
   console.log(data)
   let feearray = {};
   let feesarray = [];
   let payarray = {};
   let balarray = {};
   let balsarray = {};
   let namearray = {};
   let sumpop = [];
   let sumfee = [];
   let sumpay = [];
   let sumbal = [];
   let sumbals = [];
   data.forEach(element => {
      
       let nm = element.name;
       let pop = parseInt(element.nums);
       let pay = parseFloat(element.pay) >= 0 ? parseFloat(element.pay) : 0;
       let fee = parseFloat(element.fee) >= 0 ? parseFloat(element.fee) : 0;
       let bal = parseFloat(element.bal) >= 0 ? parseFloat(element.bal) : 0;
       let bals = parseFloat(element.bals) >= 0 ? parseFloat(element.bals) : 0;

       feearray[element.id] =  fee;
       payarray[element.id] =  pay;
       balarray[element.id] =  bal;
       balsarray[element.id] = bals;

       sumfee.push(fee)
       sumpay.push(pay)
       sumbal.push(bal)
       sumbals.push(bals)
      //  if(parseInt(element.grp) > 0)
      //  {
      //    feearray[element.id] =  pay;
      //    sumfee.push(pay)
      //  }else{
      //    payarray[element.id] =  pay;
      //    sumpay.push(pay)
      //  }

       if(Object.keys(namearray).includes(element.id))
       {
            
       }else{
            namearray[element.id] = nm;
       }

   });
   
   Object.keys(namearray).forEach(element => {
       let arr = {}
       let fee = feearray[element];
       let pay = payarray[element];
       let bal = balarray[element];
       let bals = balsarray[element];
       let payz = parseFloat(payarray[element]) - parseFloat(balsarray[element]);
       let money = parseFloat(pay) > 0  && parseFloat(fee) > 0 ? (parseFloat(payz)/parseFloat(fee)) * 100 : 0;

        arr['name'] = namearray[element];
        
        arr['fee'] = fee;
        arr['pay'] = pay;
        arr['bal'] = bal;
        arr['bals'] = bals;
        arr['pop'] = fee - pay;
        console.log(bals)
        arr['money'] = money;

        feesarray.push(arr)
   });


   let sfee = sumfee.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
   let spay = sumpay.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)
   let spop = sumpop.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)

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
                    <CCol sm="4">
                      <CCallout color="info">
                        <small className="text-muted">Fee</small>
                        <br />
            <strong className="h4">{nairaformat(sfee)}</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="4">
                      <CCallout color="success">
                        <small className="text-muted">Payments</small>
                        <br />
            <strong className="h4">{nairaformat(spay)}</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="4">
                      <CCallout color="danger">
                        <small className="text-muted">Debt</small>
                        <br />
            <strong className="h4">{nairaformat(sfee - spay)}</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                
                {feesarray.map((prop, index)=>{
                  return <CRow key={index}>
                  <CCol>
                <div className="progress-group mb-4">
                  <div className="progress-group-bars">
                  <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-money" />
                        <span className="title">{prop.name}</span>
                <span className="ml-auto font-weight-bold">{parseInt(prop.money)}%</span>
                        </div>
                    <CProgress className="progress-xs" color="warning" value={parseInt(prop.money)} />
                    </div>
                </div>
                </CCol>
                      <CCol xs={2}>
                      <div className="progress-group-prepend">
                    <span className="progress-group-text pull-right m-auto">
                      <strong><strong className="text-danger">{nairaformat(prop.pop)}</strong></strong>
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
  
  
