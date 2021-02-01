import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs'
import {
  CRow,
  CCol,
  CCardHeader,
  CCard,
  CCardBody,
  CWidgetIcon
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Studentclasss = (props) => {
    const par = useParams()
    const history = useHistory()
   
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw != null || rw != undefined) : []

  let genderFemale = data.filter(rw =>rw.gender === 'Female');
  let genderMale = data.filter(rw =>rw.gender === 'Male');

  let departmentTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].departmentid in departmentTable)
        departmentTable[data[i].departmentid]++;
    else
        departmentTable[data[i].departmentid] = 1;
  }
  let religionTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].religion in religionTable)
        religionTable[data[i].religion]++;
    else
        religionTable[data[i].religion] = 1;
  }

  let genderTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].gender in genderTable)
        genderTable[data[i].gender]++;
    else
        genderTable[data[i].gender] = 1;
  }

  let sooTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].soo in sooTable)
        sooTable[data[i].soo]++;
    else
        sooTable[data[i].soo] = 1;
  }

  let dobTable = {};
  for(var i = 0; i < data.length; i++)
  {
    let yrs = new Date(data[i].dob).getFullYear();
    let yr = Math.round(new Date().getFullYear() - yrs)
    if(yr in dobTable)
        dobTable[yr]++;
    else
        dobTable[yr] = 1;
  }
  return (
    <>
    <>
        <CRow className='mt-20 py-90'>
                    <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="Male" header={genderMale.length} color="success" iconPadding={false}>
            <CIcon width={24} name="cil-user" className="mx-5"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="Female" header={genderFemale.length} color="danger" iconPadding={false}>
            <CIcon width={24} name="cil-user-female" className="mx-5"/>
          </CWidgetIcon>
        </CCol>
          
        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="Total Studentclass" header={genderMale.length + genderFemale.length} color="info" iconPadding={false}>
          <i className='fa fa-users fa-2x mx-5'></i>
          </CWidgetIcon>
        </CCol>
          </CRow>
        <CRow>
        <CCol xs="12" sm="12" md="6">
        <CCard >
        <CCardHeader>
          Gender 
        </CCardHeader>
        <CCardBody>
          <CChartPie
            type="pie"
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: Object.values(genderTable)
              }
            ]}
            labels={Object.keys(genderTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs="12" sm="12" md="6">
        <CCard >
        <CCardHeader>
          Religion
        </CCardHeader>
        <CCardBody>
          <CChartPie
            type="pie"
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: Object.values(religionTable)
              }
            ]}
            labels={Object.keys(religionTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
    </CCol>
    </CRow>
        <CRow>
   
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
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#045800',
                  '#4AB883',
                  '#E96651',
                  '#09E0FF',
                  '#DD1116',
                  '#096651',
                  '#19E0FF',
                  '#296651',
                  '#39E0FF',
                  '#41B23',
                  '#E22651',
                  '#045800',
                  '#22B883',
                  '#226651',
                  '#55E0FF',
                  '#551116',
                  '#09aa51',
                  '#19bbFF',
                  '#29CC51',
                  '#39DDFF',
                ],
                data: Object.values(dobTable)
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
    
    </CRow>
        <CRow>
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
               backgroundColor: [
                 '#41B883',
                 '#E46651',
                 '#045800',
                 '#4AB883',
                 '#E96651',
                 '#09E0FF',
                 '#DD1116',
                 '#096651',
                 '#19E0FF',
                 '#296651',
                 '#39E0FF',
                 '#41B23',
                 '#E22651',
                 '#045800',
                 '#22B883',
                 '#226651',
                 '#55E0FF',
                 '#551116',
                 '#09aa51',
                 '#19bbFF',
                 '#29CC51',
                 '#39DDFF',
               ],
               data: Object.values(sooTable)
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
   </CRow>
    </>
    </>
  )
}

export default Studentclasss
  
