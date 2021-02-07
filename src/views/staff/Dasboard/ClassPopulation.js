import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStudentclassSummary } from './../../../actions/student/studentclass';

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
  CCallout
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

const Dashboards= (props) => {
    let termid = props.termid;
    let sessionid = props.sessionid;
    
    useEffect(() => {
        let params = {
            data:JSON.stringify(
            {
                'sessionid':sessionid,
                'termid':termid,
                'typeid':1
            }),
            cat:'datasummary',
            table:'access',
            narration:'get all schools'
            }
        props.getStudentclassSummary(params)
        return () => {
            //cleanup
        }
    }, [termid, sessionid])

    
 
    
   
   let data = props.summary && Array.isArray(props.summary) ? props.summary.filter(rw=>rw.id !== null):[];
   let genderarray = [];
   let sooTable = {};
   let dobTable = {};
   let houseTable = {};
   let placeTable = {};
   let summale = [];
   let sumfemale = [];
   let sumpop = [];
   data.forEach(element => {
       let nm = element.name;
       let pop = parseInt(element.nums);
       let gens = element.gender && element.gender.length > 0 ? element.gender.split(","):[];
      
       let mg = gens.map((rw, i)=>{return rw.toLowerCase()}).filter(rw=>rw === 'male').length;
       let fg = gens.map((rw, i)=>{return rw.toLowerCase()}).filter(rw=>rw === 'female').length;
       let mg0 = parseInt(mg) > 0  && parseInt(pop) > 0 ? parseInt(mg)/parseInt(pop) * 100 : 0;
       let fg0 = parseInt(fg) > 0  && parseInt(pop) > 0 ? parseInt(fg)/parseInt(pop) * 100: 0;
       
       let arr = {}
       summale.push(mg);
       sumfemale.push(fg)
       sumpop.push(pop)
       arr['name'] = nm;
       arr['pop'] = pop;
       arr['male'] = mg0;
       arr['female'] = fg0;

       genderarray.push(arr);

       //AGE
       let dobs = element.dob && element.dob.length > 0 ? element.dob.split(","):[];
      
       for(var i = 0; i < dobs.length; i++)
       {
            let yrs = new Date(dobs[i]).getFullYear();
            let yr = Math.round(new Date().getFullYear() - yrs)
            if(yr in dobTable)
                dobTable[yr]++;
            else
                dobTable[yr] = 1;
        }

        //STATE OF ORIGIN
        let soos = element.soo && element.soo.length > 0 ? element.soo.split(","):[];
        for(var i = 0; i < soos.length; i++)
        {
            if(soos[i] in sooTable)
                sooTable[soos[i]]++;
            else
                sooTable[soos[i]] = 1;
        }

        //HOUSE
        let houses = element.house && element.house.length > 0 ? element.house.split(","):[];
        for(var i = 0; i < houses.length; i++)
        {
            if(houses[i] in houseTable)
                houseTable[houses[i]]++;
            else
                houseTable[houses[i]] = 1;
        }

         //PLACE
         let places = element.place && element.place.length > 0 ? element.place.split(","):[];
         for(var i = 0; i < places.length; i++)
         {
             if(places[i] in placeTable)
                 placeTable[places[i]]++;
             else
                 placeTable[places[i]] = 1;
         }
   });

   

   let smale = summale.reduce((a, b)=>parseInt(a) + parseInt(b), 0);
   let sfemale = sumfemale.reduce((a, b)=>parseInt(a) + parseInt(b), 0)
   let spop = sumpop.reduce((a, b)=>parseInt(a) + parseInt(b), 0)

   let bgcol = Object.keys(houseTable);
   console.log(bgcol)
  return (
    <>
     <CRow>
        <CCol>
          <CCard>
            <CCardBody>
            <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Students</h4>
  <div className="small text-muted">{moment(new Date()).format('MMMM YYYY')}</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
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
                        <small className="text-muted">Male Population</small>
                        <br />
            <strong className="h4">{smale}</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="4">
                      <CCallout color="danger">
                        <small className="text-muted">Female Population</small>
                        <br />
            <strong className="h4">{sfemale}</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="4">
                      <CCallout color="success">
                        <small className="text-muted">Total Population</small>
                        <br />
            <strong className="h4">{spop}</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                
                {genderarray.map((prop, index)=>{
                  return <CRow key={index}>
                  <CCol>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                      {prop.name}
                    </span>
                  </div>
                  <div className="progress-group-bars">
                  <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-user" />
                        <span className="title">Male</span>
                <span className="ml-auto font-weight-bold">{parseInt(prop.male)}%</span>
                        </div>
                    <CProgress className="progress-xs" color="info" value={parseInt(prop.male)} />
                    <CProgress className="progress-xs" color="danger" value={parseInt(prop.female)} />
                    <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-user-female" />
                        <span className="title">Female</span>
                        <span className="ml-auto font-weight-bold">{parseInt(prop.female)}%</span>
                        </div>
                  </div>
                  
                 
                </div>
                </CCol>
                      <CCol xs={2}>
                      <div className="progress-group-prepend">
                    <span className="progress-group-text pull-right m-auto">
                      <strong><h4>{parseInt(prop.pop)}</h4></strong>
                    </span>
                  </div>
                   </CCol>
                </CRow>
                  })}

                  <hr className="mt-0" />
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      Males
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Females
                    </small>
                  </div>
                </CCol>
              </CRow>

              <br />
              
      <CCol xs="12" sm="12" md="12">
        <CCard>
        <CCardHeader>
          Age Distrubution
        </CCardHeader>
        <CCardBody>
          <CChartBar
            type="barchart"
            datasets={[
                {
                  data: Object.values(dobTable),
                  backgroundColor: '#E55353',
                  label: 'Years',
                }
            ]}
            labels={Object.keys(dobTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CCard>
        <CCardHeader>
          Place of Work
        </CCardHeader>
        <CCardBody>
          <CChartBar
            type="barchart"
            datasets={[
                {
                  data: Object.values(placeTable),
                  backgroundColor: 'teal',
                  label: 'No. of Guardians',
                }
            ]}
            labels={Object.keys(placeTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CCard>
        <CCardHeader>
          House
        </CCardHeader>
        <CCardBody>
          <CChartPolarArea
            type="barchart"
            datasets={[
                {
                  data: Object.values(houseTable),
                  backgroundColor: bgcol,
                  label: 'House',
                }
            ]}
            labels={Object.keys(houseTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CCard>
        <CCardHeader>
          State of Origin
        </CCardHeader>
        <CCardBody>
          <CChartBar
            type="barchart"
            datasets={[
                {
                  data: Object.values(sooTable),
                  label: 'State of Origin',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                }
            ]}
            labels={Object.keys(sooTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
      
      
    

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
   
    </>
  )
}

const mapStateToProps = (state) =>({
    summary:state.studentclassReducer.studentclasssummary
  })
export default connect(mapStateToProps,{getStudentclassSummary})(Dashboards)
  
  
